import { Request, Response } from "express";
import { ThemeRepository } from "../../infra/repository/ThemeRepository";
import { FetchAllThemesUseCase } from "../../usecase/themeUseCase/FetchAllThemesUseCase";
import { CreateThemeUseCase } from "../../usecase/themeUseCase/CreateThemeUseCase";

export class ThemeController {
  async createTheme(req: Request, res: Response) {
    const { theme, categoryId, priority, platform, createdAt, userId } = req.body;
    const themeRepository = new ThemeRepository();
    const createThemeUseCase = new CreateThemeUseCase(themeRepository);
    const createdTheme = await createThemeUseCase.execute({
      theme: theme,
      categoryId,
      priority,
      platform,
      createdAt,
      userId,
    });
    res.status(201).json({ message: "Create successfully", theme: createdTheme });
  }

  async fetchAllThemes(req: Request, res: Response) {
    const userId = req.query.userId as string;
    const themeRepository = new ThemeRepository();
    const fetchAllUsersUseCase = new FetchAllThemesUseCase(themeRepository);
    const themes = await fetchAllUsersUseCase.execute(userId);

    res.status(200).json({ message: "Fetch successfully", themes });
  }
}
