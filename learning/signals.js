/* eslint-disable @typescript-eslint/no-unused-vars */
/**SIGNALS PATTERN */

class Signal {
  
  constructor (value) {
    this.value = value;
    this.subscribers = []
  }

  getValue() {
    return this.value
  }

  setValue(newValue) {
    this.value = newValue;
    this.emit()
  }

  emit() {
    for (const subscriber of this.subscribers) {
      subscriber(this.value)
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback)
  }
}

//Potential use case
const signal = new Signal(0);

// Subscriber callback is re-run by the class when value changes
signal.subscribe((value) => console.log(value))

// Updates the value within the class
// Emits the value to all subscribers
signal.setValue(1);

let effectCallback = null;

//Implenting the createSignal method
export const createSignal = (value) => {
  const signal = new Signal(value);

  return [
    function value() {
      //Subscribes the effectCallback
      if (effectCallback) {
        signal.subscribe(effectCallback);
      }
      return signal.getValue()
    },
    function setValue(newValue) {
      return signal.setValue(newValue)
    }
  ]
}

export const createEffect = (callback) => {
  effectCallback = callback;
  callback();
  effectCallback = null;
};

const [value, setValue] = createSignal(0);

createEffect(() => {
  console.log("Value: ", value());
})

// Logs 0
console.log(value());

setValue(1);

// Logs 1
console.log(value());

