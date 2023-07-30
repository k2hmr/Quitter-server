export abstract class CreateService<T> {
  private readonly _props: T;

  protected constructor(props: T) {
    this.checkLimit(props);
    this._props = Object.freeze(props);
  }

  protected abstract checkLimit(props: T): Promise<void>;
}
