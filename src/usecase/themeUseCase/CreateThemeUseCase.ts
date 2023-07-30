import { PriorityType } from "../../domain/theme/priority";
import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";
import { PlatformType } from "../../domain/theme/platform";
import { CreateThemeService } from "../../domain/theme/services/createThemeService";

export class CreateThemeUseCase {
  constructor(private readonly themeRepository: IThemeRepository) {
    this.themeRepository = themeRepository;
  }
  public async execute(theme: {
    theme: string;
    categoryId: string;
    priority: PriorityType;
    platform: PlatformType;
    createdAt: Date;
    userId: string;
  }): Promise<Theme> {
    const props = new CreateThemeService({
      themeRepository: this.themeRepository,
      userId: theme.userId,
      categoryId: theme.categoryId,
    });
    const newTheme = Theme.construct({ ...theme, categoryId: props.categoryId, userId: props.userId });
    return await this.themeRepository.create(newTheme);
  }
}
