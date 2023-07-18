import { randomUUID } from "crypto";
import { UniqueEntityId } from "../shared/uniqueEntityId";

export class ThemeId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, "ThemeId");
  }

  public static construct(): ThemeId {
    return new ThemeId(randomUUID());
  }

  public static reConstruct(value: string): ThemeId {
    return new ThemeId(value);
  }
}
