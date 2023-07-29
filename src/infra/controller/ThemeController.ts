import { Request, Response } from "express";
import { ThemeRepository } from "../../infra/repository/ThemeRepository";
import { FetchAllThemesUseCase } from "../../usecase/themeUseCase/FetchAllThemesUseCase";
import { UserId } from "../../domain/user/UserId";
import { CreateThemeUseCase } from "../../usecase/themeUseCase/CreateThemeUseCase";
import { Theme } from "../../domain/theme/ThemeEntity";
import { CategoryId } from "../../domain/category/CategoryId";
export class ThemeController {
  async createTheme(req: Request, res: Response) {
    const { theme, categoryId, priority, platform, createdAt, userId } = req.body;
    const themeRepository = new ThemeRepository();
    const createThemeUseCase = new CreateThemeUseCase(themeRepository);
    const _categoryId = CategoryId.reConstruct(categoryId);
    const _userId = UserId.reConstruct(userId);
    const newTheme = Theme.construct({
      theme,
      categoryId: _categoryId,
      priority,
      platform,
      createdAt,
      userId: _userId,
    });
    const createdTheme = await createThemeUseCase.execute(newTheme);
    res.status(200).json({ message: "Create successfully", theme: createdTheme });
  }

  async fetchAllThemes(req: Request, res: Response) {
    const userId = UserId.reConstruct(req.query.userId as string);
    const themeRepository = new ThemeRepository();
    const fetchAllUsersUseCase = new FetchAllThemesUseCase(themeRepository);
    const themes = await fetchAllUsersUseCase.execute(userId);

    res.status(200).json({ message: "Fetch successfully", themes });
  }
}
