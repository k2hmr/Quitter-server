import { AggregateRoot } from "../shared/aggregateRoot";
import { unprocessableEntityException } from "../../exception/error";
import { UserId } from "./UserId";

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
export class User extends AggregateRoot<IUser, UserId> {
  public readonly name: IUser["name"];
  public readonly email: IUser["email"];
  public readonly password: IUser["password"];
  public readonly createdAt: IUser["createdAt"];
  constructor(props: IUser, id: UserId) {
    super(props, id);
    checkUser(props.name, props.email, props.password);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }

  public static construct(props: IUser): User {
    return new User(props, UserId.construct());
  }

  public static reConstruct(props: IUser, id: string): User {
    return new User(props, UserId.reConstruct(id));
  }
}

const checkUser = (name: string, email: string, password: string): void => {
  if (!name) {
    throw unprocessableEntityException("名前は必須です。");
  }

  if (name.length > 255) {
    throw unprocessableEntityException("名前は255文字未満で入力してください");
  }

  if (!email) {
    throw unprocessableEntityException("メールアドレスは必須です。");
  }

  if (email.length > 255) {
    throw unprocessableEntityException("メールアドレスは255文字未満で入力してください");
  }

  const emailRegex = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw unprocessableEntityException("無効なメールアドレスです。");
  }

  if (password.length < 8) {
    throw unprocessableEntityException("パスワードは8字以上で入力してください");
  }

  if (password.length > 255) {
    throw unprocessableEntityException("パスワードは255文字未満で入力してください");
  }
};
