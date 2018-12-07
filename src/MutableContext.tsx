export type MutableContextValue<T> = [T, (newValue: T) => void];

export default class MutableContext<T> {
  public value: T;

  private callbacks: Set<Function>;

  constructor(initialValue: T) {
    this.value = initialValue;
    this.callbacks = new Set();
    this.setValue = this.setValue.bind(this);
  }

  public getValue(): MutableContextValue<T> {
    return [this.value, this.setValue];
  }

  public setValue(newValue: T): void {
    this.value = newValue;
    this.callbacks.forEach((callback) => callback());
  }

  public subscribe(callback: Function): void {
    this.callbacks.add(callback);
  }

  public unsubscribe(callback: Function): void {
    this.callbacks.delete(callback);
  }
}
