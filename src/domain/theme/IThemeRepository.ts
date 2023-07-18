import { UserId } from "../user/UserId";
import { Theme } from "./ThemeEntity";
import { ThemeId } from "./ThemeId";

export interface IThemeRepository {
  create(theme: Theme): Promise<Theme>;
  find(id: ThemeId, userId: UserId): Promise<Theme>;
  findAll(userId: UserId): Promise<Array<Theme>>;
}
