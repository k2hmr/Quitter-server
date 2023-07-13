import { Theme } from "./ThemeEntity";

export interface IThemeRepository {
  create(theme: {
    theme: string;
    category: string;
    priority: number;
    platform: number;
    userId: string;
  }): Promise<Theme>;
  find(theme: { id: string; userId: string }): Promise<Theme>;
  findAll(userId: string): Promise<Array<Theme>>;
}
