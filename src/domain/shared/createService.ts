export abstract class CreateService<T> {
  private readonly _props: T;

  protected constructor(props: T) {
    this.checkLimit(props);
    this.checkID(props);
    this._props = Object.freeze(props);
  }

  protected get props(): T {
    return this._props;
  }

  protected abstract checkID(props: T): void;
  public abstract checkLimit(props: T): Promise<void>;
}
