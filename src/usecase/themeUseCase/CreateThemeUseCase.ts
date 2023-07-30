import { PriorityType } from "../../domain/theme/priority";
import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";
import { PlatformType } from "../../domain/theme/platform";
import { CategoryId } from "../../domain/category/CategoryId";
import { UserId } from "../../domain/user/UserId";
import { internalErrorException } from "exception/error";

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
    const exsistingThemes = await this.themeRepository.findAll(UserId.reConstruct(theme.userId));
    if (exsistingThemes.length >= 10) throw internalErrorException("取り組み中のテーマは10個までしか登録できません。");
    const categoryId = CategoryId.reConstruct(theme.categoryId);
    const userId = UserId.reConstruct(theme.userId);
    const newTheme = Theme.construct({ ...theme, categoryId, userId });
    return await this.themeRepository.create(newTheme);
  }
}
