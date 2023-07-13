import { platform } from "../../infra/type/platform";
import { priority } from "../../infra/type/priority";
import { Theme } from "./ThemeEntity";

export interface IThemeRepository {
  create(theme: {
    theme: string;
    category: string;
    priority: priority;
    platform: platform;
    userId: string;
  }): Promise<Theme>;
  find(theme: { id: string; userId: string }): Promise<Theme>;
  findAll(userId: string): Promise<Array<Theme>>;
}
