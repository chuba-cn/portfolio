/* eslint-disable @typescript-eslint/no-unused-vars */
type EventMap = Record<string, Array<(data: unknown) => void>>;

const pubSub = {
  events: {} as EventMap,

  subscribe<T = unknown>(event: string, callback: (data: T) => void) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback as (data: unknown) => void);
  },

  publish<T = unknown>(event: string, data: T) {
    if (this.events[event]) {
      const handlers = this.events[event];
      handlers.forEach((handler) => handler(data));
    }
  },
};

pubSub.subscribe<number>("update", (price) => {
  console.log("subscribed to update", price.toFixed());
});

pubSub.publish("update", "New message");

/** More Robust Implementation of the Pub Sub Pattern*/
type EventMapper = Record<string, unknown>;
type UnsubscribeFn = () => void;

class PubSub<TEvents extends EventMapper> {
  private subscriptions: {
    [K in keyof TEvents]?: Array<{
      callback: (data: TEvents[K]) => void;
      once?: boolean;
    }>;
  } = {};

  subscribe<K extends keyof TEvents>(
    event: K,
    callback: (data: TEvents[K]) => void,
    options?: { once?: boolean }
  ): UnsubscribeFn {
    const handlers = this.subscriptions[event] ?? [];
    const entry = { callback, once: options?.once };

    handlers.push(entry);
    this.subscriptions[event] = handlers;

    return () => {
      this.subscriptions[event] = handlers.filter((h) => h !== entry);
    };
  }

  publish<K extends keyof TEvents>(event: K, data: TEvents[K]): void {
    const handlers = this.subscriptions[event];

    if (!handlers) return;

    const handlersCopy = [...handlers];

    handlersCopy.forEach((handler) => {
      try {
        handler.callback(data);
      } catch (error) {
        console.error(`Error in ${String(event)} handler: `, error);
        throw error;
      }

      if (handler.once) {
        this.subscriptions[event] = this.subscriptions[event]?.filter(
          (h) => h != handler
        );
      }
    });

    if (this.subscriptions[event]?.length === 0) {
      delete this.subscriptions[event];
    }
  }

  once<K extends keyof TEvents>(
    event: K,
    callback: (data: TEvents[K]) => void
  ): UnsubscribeFn {
    return this.subscribe(event, callback, { once: true });
  }

  clear(): void {
    this.subscriptions = {};
  }
}

type AppEvents = {
  message: string;
  error: Error;
  "user-login": { userId: string };
};

const pubInstance = new PubSub<AppEvents>();

const unsub = pubInstance.subscribe("message", (err: string) => {});

/** OBSERVER PATTERN IMPLEMENTATION */

interface Observer<T = unknown> {
  update(data: T): void;
}

interface Subject<T = unknown> {
  registerObserver(observer: Observer<T>): void;
  removeObserver(observer: Observer<T>): void;
  notifyObservers(data: T): void;
}

class WeatherStation implements Subject<number> {
  private observers: Observer<number>[] = [];
  private temperature: number = 0;

  registerObserver(observer: Observer<number>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  removeObserver(observer: Observer<number>): void {
    const index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(temp: number): void {
    for (const observer of this.observers) {
      observer.update(temp);
    }
  }

  setTemperature(temp: number) {
    this.temperature = temp;
    this.notifyObservers(this.temperature);
  }

  getTemperature() {
    return this.temperature;
  }
}

class PhoneDisplay implements Observer<number> {
  update(temperature: number): void {
    console.log(`Phone Display: Current temperature is ${temperature}°C`);
  }
}

class TVDisplay implements Observer<number> {
  update(temperature: number): void {
    console.log(`TV Display: Temperature updated to ${temperature}°C`);
  }
}

//Usage examples of observer pattern

const weatherStation = new WeatherStation();
const phoneDisplay = new PhoneDisplay();
const tvDisplay = new TVDisplay();

//Register Observers
weatherStation.registerObserver(phoneDisplay);
weatherStation.registerObserver(tvDisplay);

//Update temperature (Triggers notifications to all observers)
weatherStation.setTemperature(25);
// Output:
// Phone Display: Current temperature is 25°C
// TV Display: Temperature updated to 25°C

