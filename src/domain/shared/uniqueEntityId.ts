import { unprocessableEntityException } from "../../exception/error";

export abstract class UniqueEntityId {
  protected constructor(protected readonly value: string, private readonly idName: string) {
    if (!value) {
      throw unprocessableEntityException("IDは必須です。");
    }
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UniqueEntityId): boolean {
    return this.value === other.value;
  }
}
