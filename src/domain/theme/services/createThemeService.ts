import { internalErrorException } from "../../../exception/error";
import { UserId } from "../../user/UserId";
import { IThemeRepository } from "../IThemeRepository";
import { CreateService } from "../../shared/createService";

export interface ICreateTheme {
  themeRepository: IThemeRepository;
  userId: UserId;
}

export class CreateThemeService extends CreateService<ICreateTheme> {
  public readonly themeRepository: ICreateTheme["themeRepository"];
  public readonly userId: ICreateTheme["userId"];

  constructor(props: ICreateTheme) {
    super(props);
    this.checkLimit(props);
    this.themeRepository = props.themeRepository;
    this.userId = props.userId;
  }

  async checkLimit(props: ICreateTheme): Promise<void> {
    const existingThemes = await props.themeRepository.findAll(props.userId);
    if (existingThemes.length >= 10) throw internalErrorException("取り組み中のテーマは10個までしか登録できません。");
  }
}
