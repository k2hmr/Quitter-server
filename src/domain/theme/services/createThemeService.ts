import { internalErrorException, unprocessableEntityException } from "../../../exception/error";
import { UserId } from "../../user/UserId";
import { IThemeRepository } from "../IThemeRepository";
import { CreateService } from "../../shared/createService";
import { CategoryId } from "../../category/CategoryId";

export interface ICreateTheme {
  themeRepository: IThemeRepository;
  userId: string;
  categoryId: string;
}

export class CreateThemeService extends CreateService<ICreateTheme> {
  public readonly themeRepository: IThemeRepository;
  public readonly userId: UserId;
  public readonly categoryId: CategoryId;
  constructor(props: ICreateTheme) {
    super(props);
    this.checkID(props);
    this.checkLimit(props);
    this.themeRepository = props.themeRepository;
    this.userId = UserId.reConstruct(props.userId);
    this.categoryId = CategoryId.reConstruct(props.categoryId);
  }

  protected checkID(props: ICreateTheme): void {
    const regexExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if (!props.userId) throw unprocessableEntityException("ユーザIDは必須です。");
    if (!regexExp.test(props.userId)) throw unprocessableEntityException("ユーザIDの形式が不正です。");
    if (!props.categoryId) throw unprocessableEntityException("カテゴリIDは必須です。");
    if (!regexExp.test(props.categoryId)) throw unprocessableEntityException("カテゴリIDの形式が不正です。");
  }

  async checkLimit(props: ICreateTheme): Promise<void> {
    const userId = UserId.reConstruct(props.userId);
    const existingThemes = await props.themeRepository.findAll(userId);
    if (existingThemes.length >= 10) throw internalErrorException("取り組み中のテーマは10個までしか登録できません。");
  }
}
