import { UniqueEntityId } from "../shared/uniqueEntityId";
import { randomUUID } from "crypto";

export class CategoryId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, "CategoryId");
  }

  public static construct(): CategoryId {
    return new CategoryId(randomUUID());
  }

  public static reConstruct(value: string): CategoryId {
    return new CategoryId(value);
  }
}
