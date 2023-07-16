import { IPriority, Priority, PriorityType } from "./priority";
import { unprocessableEntityException } from "../../exception/error";
import { IPlatform, Platform, PlatformType } from "./platform";

export class Theme {
  public readonly id: string;
  public readonly theme: string;
  public readonly categoryId: string;
  public readonly priority: PriorityType;
  public readonly platform: PlatformType;
  public readonly createdAt: Date;
  public readonly userId: string;
  constructor(
    id: string,
    theme: string,
    categoryId: string,
    priority: PriorityType,
    platform: PlatformType,
    createdAt: Date,
    userId: string
  ) {
    checkTheme(theme, categoryId);
    const priorityInputVal: IPriority = { priority: priority };
    const _priority = Priority.create(priorityInputVal).priority;
    const platformInputVal: IPlatform = { platform: platform };
    const _platform = Platform.create(platformInputVal).platform;

    this.id = id;
    this.theme = theme;
    this.categoryId = categoryId;
    this.priority = _priority;
    this.platform = _platform;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}

const checkTheme = (theme: string, categoryId: string): void => {
  if (!theme) {
    throw unprocessableEntityException("テーマは必須です。");
  }

  if (theme.length > 255) {
    throw unprocessableEntityException("テーマは255文字未満で入力してください");
  }

  if (!categoryId) {
    throw unprocessableEntityException("カテゴリは必須です。");
  }
};
