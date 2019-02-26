export type MutableContextValue<T> = [T, (newValue: T) => void];

export default class MutableContext<T> {
  public value: T;

  private callbacks: Set<Function>;

  public constructor(initialValue: T) {
    this.value = initialValue;
    this.callbacks = new Set();
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  public getValue(): T {
    return this.value;
  }

  public setValue(newValue: T): void {
    this.value = newValue;
    this.callbacks.forEach((callback) => callback());
  }

  public getValueAndSetter(): MutableContextValue<T> {
    return [this.getValue(), this.setValue];
  }

  public subscribe(callback: Function): void {
    this.callbacks.add(callback);
  }

  public unsubscribe(callback: Function): void {
    this.callbacks.delete(callback);
  }
}
