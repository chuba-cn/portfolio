/* eslint-disable @typescript-eslint/no-unused-vars */

// The effectStack is used to track which effect is currently executing.
// When a signal’s value is read, it can record the current effect as a dependency.
const effectStack: Effect[] = [];

/**
 * Scheduler:
 * -----------
 * A simple microtask-based scheduler that batches effect executions.
 * Effects are stored in a Set to ensure that each effect is only scheduled once,
 * even if multiple signals notify it during the same microtask.
 */

class Scheduler {
  private static queue: Set<Effect> = new Set();
  private static scheduled: boolean = false;

  /**
   * Schedule an effect for execution.
   * If the effect is already scheduled (or has been disposed), do nothing
   */
  static schedule(effect: Effect): void {
    if (effect.isDisosed) return;

    Scheduler.queue.add(effect);

    if (!Scheduler.scheduled) {
      Scheduler.scheduled = true;

      // Use a microtask (Promise.resolve) to flush the queue asynchronously.
      Promise.resolve().then(() => Scheduler.flush());
    }
  }

  /**
   * Flush the scheduler queue, running all scheduled effects.
   * Errors in individual effects are caught and logged.
   */
  private static flush(): void {
    Scheduler.scheduled = false;
    const effects = Array.from(Scheduler.queue);
    Scheduler.queue.clear();
    for (const effect of effects) {
      try {
        effect.run();
      } catch (error) {
        console.error("Error running effect in scheduler:", error);
      }
    }
  }
}

/**
 * Effect:
 * -------
 * Wraps a reactive function so that its dependencies (signals read during execution)
 * are automatically tracked. It cleans up its old dependencies before re-running.
 * Circular dependency detection is implemented to prevent infinite loops.
 */

class Effect {
  private fn: () => void;

  //The set of signals the effect depends on
  public dependencies: Set<Signal<unknown>> = new Set();

  //Used to detect circular (re-entrant calls).
  private running: boolean = false;

  //Mark if the effect is disposed so it will no longer run.
  private disposed: boolean = false;

  constructor(fn: () => void) {
    this.fn = fn;
  }

  /**
   * Executes the effect function:
   * - Cleans up previous subscriptions.
   * - Pushes itself onto the global effectStack so that signals know to record it.
   * - Runs the function, catching errors.
   * - Pops itself
   */

  run(): void {
    if (this.disposed) return;

    // Circular dependency detection:
    // If this effect is already running, we have a circular dependency.
    if (this.running) {
      throw new Error("Circular Dependency detected in effect");
    }

    //Clean up previous dependencies so that stale subscriptions are removed
    this.cleanup();

    this.running = true;
    effectStack.push(this);

    try {
      this.fn();
    } catch (error) {
      console.error("Error in effct execution: ", error);
    } finally {
      effectStack.pop();
      this.running = false;
    }
  }

  /**
   * Unsubscribe this effect from all signals it depended on.
   */
  cleanup(): void {
    for (const dep of this.dependencies) {
      dep.unsubscribe(this);
    }
    this.dependencies.clear();
  }

  /**
   * Dispose the effect. This cleans up subscriptions and prevents further runs.
   */
  dipose(): void {
    this.disposed = true;
    this.cleanup();
  }

  /**
   * Getter to determine if this effect has been disposed.
   */
  get isDisosed(): boolean {
    return this.disposed;
  }
}

/**
 * Signal:
 * -------
 * Represents a piece of reactive state.
 * When its value is read, it registers the current effect (if any) as a dependency.
 * When its value changes, it notifies all dependent effects.
 */

class Signal<T> {
  private value: T;

  // Effects that are subscribed to changes in this signal.
  private subscribers: Set<Effect> = new Set();

  // Used to stage an update when within a  transaction
  private dirty: boolean = false;
  private nextValue: T;

  constructor(initialValue: T) {
    this.value = initialValue;
    this.nextValue = initialValue;
  }

  /**
   * Read the value of the signal.
   * If an effect is currently running, register it as a subscriber.
   * During a transaction, if an update is pending (dirty), return the staged value.
   */
  getValue(): T {
    const currentEffect = effectStack[effectStack.length - 1];
    if (currentEffect) {
      //Register the current effect as a subscriber
      this.subscribers.add(currentEffect);

      //Record the dependency in the effect so it can later unsubscribe if needed
      currentEffect.dependencies.add(this);
    }

    // If a transaction is active and this signal has been updated, return the staged value.
    if (Transaction.isActive && this.dirty) {
      return this.nextValue;
    }

    return this.value;
  }

  /**
   * Update the signal’s value.
   * - Outside a transaction: update immediately and notify subscribers.
   * - Within a transaction: stage the value and mark as dirty.
   *
   * A simple equality check is done to avoid unnecessary updates.
   */
  setValue(newValue: T): void {
    //If not in a transaction and the value is the same, do nothing
    if (!Transaction.isActive && this.value === this.nextValue) return;

    if (Transaction.isActive) {
      this.nextValue = newValue;
      this.dirty = true;
      Transaction.schedule(this);
    } else {
      this.value = newValue;
      this.notifySubscribers();
    }
  }

  /**
   * Notify all subscriber effects that this signal has changed.
   * Effects are scheduled via the Scheduler to batch and deduplicate work.
   */
  notifySubscribers(): void {
    for (const subscriber of Array.from(this.subscribers)) {
      Scheduler.schedule(subscriber);
    }
  }

  /**
   * During a transaction, commit the staged value.
   * If the value actually changes, notify subscribers.
   */
  commit(): void {
    if (this.dirty) {
      if (this.value !== this.nextValue) {
        this.value = this.nextValue;
        this.notifySubscribers();
      }
      this.dirty = false;
    }
  }

  /**
   * Remove an effect from this signal’s subscriber list.
   * Called when an effect cleans up its dependencies.
   */
  unsubscribe(effect: Effect): void {
    this.subscribers.delete(effect);
  }
}



/**
 * Transaction:
 * ------------
 * Provides a mechanism for batching multiple signal updates.
 * All signals updated within a transaction are “staged” and then committed at once.
 */
class Transaction {
  private static current: Transaction | null = null;
  private dirtySignals: Set<Signal<unknown>> = new Set();

  /**
   * Indicates whether a transaction is currently active.
   */
  static get isActive(): boolean {
    return Transaction.current !== null;
  }

  /**
   * Schedule a signal to be committed at the end of the transaction.
   */
  static schedule(signal: Signal<unknown>): void {
    if (Transaction.current) {
      Transaction.current.dirtySignals.add(signal);
    }
  }

  /**
   * Run a function within a transaction. All signal updates inside the function
   * will be batched and committed once the function completes.
   */
  static run<T>(fn: () => T): T {
    const previousTransaction = Transaction.current;
    const transaction = new Transaction();
    Transaction.current = transaction;

    try {
      const result = fn();
      transaction.commit();
      return result;
    } catch (error) {
      console.error("Error during transaction execution:", error);
      throw error;
    } finally {
      Transaction.current = previousTransaction;
    }
  }

  /**
   * Commit all staged updates to their signals.
   * Each signal is committed individually; errors are caught so that one failing
   * signal does not prevent others from committing.
   */
  private commit(): void {
    const signals = Array.from(this.dirtySignals);
    this.dirtySignals.clear();
    for (const signal of signals) {
      try {
        signal.commit();
      } catch (error) {
        console.error("Error committing signal during transaction:", error);
      }
    }
  }
}

/**
 * createSignal:
 * -------------
 * A helper function to create a reactive signal.
 * Returns a tuple: a getter to read the signal’s value and a setter to update it.
 */

export function createSignal<T>(initialValue: T) {
  const signal = new Signal<T>(initialValue);

  return [
    () => signal.getValue(),
    (newValue: T) => signal.setValue(newValue),
  ] as const;
}

/**
 * createEffect:
 * -------------
 * A helper function to create a reactive effect.
 * The passed function will be executed immediately, and any signals read during
 * its execution will be tracked as dependencies.
 *
 * The returned Effect instance can be disposed of later to clean up resources.
 */
export function createEffect(fn: () => void): Effect {
  const effect = new Effect(fn);
  effect.run();
  return effect;
}
