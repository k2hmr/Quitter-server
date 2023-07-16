import { unprocessableEntityException } from "../../exception/error";

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: Date;
  constructor(id: string, name: string, email: string, password: string, createdAt: Date) {
    checkUser(name, email, password);
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
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
