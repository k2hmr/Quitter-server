import { Theme } from "./ThemeEntity";
import { PlatformType } from "./platform";
import { PriorityType } from "./priority";

export interface IThemeRepository {
  create(
    theme: string,
    categoryId: string,
    priority: PriorityType,
    platform: PlatformType,
    userId: string
  ): Promise<Theme>;
  find(id: string, userId: string): Promise<Theme>;
  findAll(userId: string): Promise<Array<Theme>>;
}
