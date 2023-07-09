import { unprocessableEntityException } from "../../exception/error";

export class Theme {
  public readonly id: string;
  public readonly theme: string;
  public readonly category: string;
  public readonly priority: string;
  public readonly platform: string;
  public readonly createdAt: Date;
  public readonly userId: string;
  constructor(theme: {
    id: string;
    theme: string;
    category: string;
    priority: string;
    platform: string;
    createdAt: Date;
    userId: string;
  }) {
    checkTheme(theme.theme, theme.category, theme.priority, theme.platform);
    this.id = theme.id;
    this.theme = theme.theme;
    this.category = theme.category;
    this.priority = theme.priority;
    this.platform = theme.platform;
    this.createdAt = theme.createdAt;
    this.userId = theme.userId;
  }
}

const checkTheme = (theme: string, category: string, priority: string, platform: string): void => {
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

  if (priority.length !== 1) {
    throw unprocessableEntityException("優先度は1文字で入力してください");
  }

  if (!platform) {
    throw unprocessableEntityException("プラットフォームは必須です。");
  }

  if (platform.length > 255) {
    throw unprocessableEntityException("プラットフォームは255文字未満で入力してください");
  }
};
