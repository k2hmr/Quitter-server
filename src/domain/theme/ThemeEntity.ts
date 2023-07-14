import { IPriority, Priority } from "../types/priority";
import { unprocessableEntityException } from "../../exception/error";
import { IPlatform, Platform } from "../types/platform";

export class Theme {
  public readonly id: string;
  public readonly theme: string;
  public readonly category: string;
  public readonly priority: number;
  public readonly platform: number;
  public readonly createdAt: Date;
  public readonly userId: string;
  constructor(theme: {
    id: string;
    theme: string;
    category: string;
    priority: number;
    platform: number;
    createdAt: Date;
    userId: string;
  }) {
    checkTheme(theme.theme, theme.category, theme.priority, theme.platform);
    const valObj = createValObj(theme.priority, theme.platform);

    this.id = theme.id;
    this.theme = theme.theme;
    this.category = theme.category;
    this.priority = valObj.priority;
    this.platform = valObj.platform;
    this.createdAt = theme.createdAt;
    this.userId = theme.userId;
  }
}

const checkTheme = (theme: string, category: string, priority: number, platform: number): void => {
  if (!theme) {
    throw unprocessableEntityException("テーマは必須です。");
  }

  if (theme.length > 255) {
    throw unprocessableEntityException("テーマは255文字未満で入力してください");
  }

  if (!category) {
    throw unprocessableEntityException("カテゴリは必須です。");
  }

  if (category.length > 255) {
    throw unprocessableEntityException("カテゴリは255文字未満で入力してください");
  }

  if (!priority) {
    throw unprocessableEntityException("優先度は必須です。");
  }

  if (!platform) {
    throw unprocessableEntityException("プラットフォームは必須です。");
  }
};

const createValObj = (_priority: number, _platform: number) => {
  const priorityInputVal: IPriority = { priority: _priority };
  const priority = Priority.create(priorityInputVal).priority;
  const platformInputVal: IPlatform = { platform: _platform };
  const platform = Platform.create(platformInputVal).platform;

  return { priority, platform };
};
