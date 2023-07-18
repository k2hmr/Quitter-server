import { Request, Response } from "express";
import { ThemeRepository } from "../../infra/repository/ThemeRepository";
import { FetchAllThemesUseCase } from "../../usecase/themeUseCase/FetchAllThemesUseCase";

export class ThemeController {
  async fetchAllThemes(req: Request, res: Response) {
    const { userId } = req.body;
    const themeRepository = new ThemeRepository();
    const fetchAllUsersUseCase = new FetchAllThemesUseCase(themeRepository);
    await fetchAllUsersUseCase.execute(userId);
    res.status(200).json({ message: "Fetch successfully" });
  }
}
