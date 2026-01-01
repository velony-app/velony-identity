export declare const VO_BRAND: unique symbol;

export abstract class ValueObject<T> {
  private readonly [VO_BRAND]: ValueObject<T>;

  protected constructor(value: T) {
    this._value = value;
  }

  private readonly _value: T;

  public get value(): T {
    return this._value;
  }

  public abstract equals(other: ValueObject<T>): boolean;
}
