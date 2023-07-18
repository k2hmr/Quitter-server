import { UserId } from "domain/user/UserId";
import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";

export class FetchAllThemesUseCase {
  constructor(private readonly themeRepository: IThemeRepository) {
    this.themeRepository = themeRepository;
  }
  public async execute(userId: UserId): Promise<Theme[]> {
    return await this.themeRepository.findAll(userId);
  }
}
