import { internalErrorException, unprocessableEntityException } from "../../../exception/error";
import { UserId } from "../../user/UserId";
import { IThemeRepository } from "../IThemeRepository";
import { CategoryId } from "../../category/CategoryId";

export interface ICreateTheme {
  themeRepository: IThemeRepository;
  userId: string;
  categoryId: string;
}

export class CreateThemeService {
  public readonly themeRepository: IThemeRepository;
  public readonly userId: UserId;
  public readonly categoryId: CategoryId;
  constructor(props: ICreateTheme) {
    this.checkLimit(props);
    this.themeRepository = props.themeRepository;
    this.userId = UserId.reConstruct(props.userId);
    this.categoryId = CategoryId.reConstruct(props.categoryId);
  }

  async checkLimit(props: ICreateTheme): Promise<void> {
    const userId = UserId.reConstruct(props.userId);
    const existingThemes = await props.themeRepository.findAll(userId);
    if (existingThemes.length >= 10) throw internalErrorException("取り組み中のテーマは10個までしか登録できません。");
  }
}
