import { UniqueEntityId } from "../shared/uniqueEntityId";
import { randomUUID } from "crypto";

export class UserId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, "UserId");
  }

  public toString(): string {
    return this.value;
  }

  public static construct(): UserId {
    return new UserId(randomUUID());
  }

  public static reConstruct(value: string): UserId {
    return new UserId(value);
  }
}
