import { UserId } from "../../user/UserId";
import { unprocessableEntityException } from "../../../exception/error";

export interface IFetchAllThemes {
  userId: string;
}

export class FetchAllThemesService {
  public readonly userId: UserId;
  constructor(userId: string) {
    checkID(userId);
    this.userId = UserId.reConstruct(userId);
  }
}

const checkID = (userId: string) => {
  const regexExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  if (!userId) throw unprocessableEntityException("ユーザIDは必須です。");
  if (!regexExp.test(userId)) throw unprocessableEntityException("ユーザIDの形式が不正です。");
};
