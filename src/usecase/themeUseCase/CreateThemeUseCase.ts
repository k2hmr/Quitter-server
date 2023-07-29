import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";

export class CreateThemeUseCase {
  constructor(private readonly themeRepository: IThemeRepository) {
    this.themeRepository = themeRepository;
  }
  public async execute(theme: Theme): Promise<Theme> {
    return await this.themeRepository.create(theme);
  }
}
