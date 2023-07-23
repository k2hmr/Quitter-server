import { Request, Response } from "express";
import { ThemeRepository } from "../../infra/repository/ThemeRepository";
import { FetchAllThemesUseCase } from "../../usecase/themeUseCase/FetchAllThemesUseCase";
import { UserId } from "../../domain/user/UserId";

export class ThemeController {
  async fetchAllThemes(req: Request, res: Response) {
    const userId = UserId.reConstruct(req.query.userId as string);
    const themeRepository = new ThemeRepository();
    const fetchAllUsersUseCase = new FetchAllThemesUseCase(themeRepository);
    const themes = await fetchAllUsersUseCase.execute(userId);

    res.status(200).json({ message: "Fetch successfully", themes });
  }
}
