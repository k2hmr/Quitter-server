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
    checkTheme(theme, categoryId, priority, platform);
    const valObj = createValObj(priority, platform);

    this.id = id;
    this.theme = theme;
    this.categoryId = categoryId;
    this.priority = valObj.priority;
    this.platform = valObj.platform;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}

const checkTheme = (theme: string, categoryId: string, priority: PriorityType, platform: PlatformType): void => {
  if (!theme) {
    throw unprocessableEntityException("テーマは必須です。");
  }

  if (theme.length > 255) {
    throw unprocessableEntityException("テーマは255文字未満で入力してください");
  }

  if (!categoryId) {
    throw unprocessableEntityException("カテゴリは必須です。");
  }

  if (!priority) {
    throw unprocessableEntityException("優先度は必須です。");
  }

  if (!platform) {
    throw unprocessableEntityException("プラットフォームは必須です。");
  }
};

const createValObj = (_priority: PriorityType, _platform: PlatformType) => {
  const priorityInputVal: IPriority = { priority: _priority };
  const priority = Priority.create(priorityInputVal).priority;
  const platformInputVal: IPlatform = { platform: _platform };
  const platform = Platform.create(platformInputVal).platform;

  return { priority, platform };
};
