import { UserId } from "../../user/UserId";
import { unprocessableEntityException } from "../../../exception/error";

export interface IFetchAllThemes {
  userId: string;
}

export class FetchAllThemesService {
  public readonly userId: UserId;
  constructor(userId: string) {
    this.userId = UserId.reConstruct(userId);
  }
}
