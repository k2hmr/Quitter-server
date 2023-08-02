import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";
import { FetchAllThemesService } from "../../domain/theme/services/fetchAllThemesService";

export class FetchAllThemesUseCase {
  constructor(private readonly themeRepository: IThemeRepository) {
    this.themeRepository = themeRepository;
  }
  public async execute(userId: string): Promise<Theme[]> {
    const props = new FetchAllThemesService(userId);
    return await this.themeRepository.findAll(props.userId);
  }
}
