import { unprocessableEntityException } from "exception/error";

export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly createdAt: Date
  ) {
    this.id = id;
    this.setName(name);
    this.setEmail(email);
    this.setPassword(password);
    this.createdAt = createdAt;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  setName(name: string): string {
    if (!name) {
      throw unprocessableEntityException("名前は必須です。");
    }

    if (name.length > 255) {
      throw unprocessableEntityException("名前は255文字未満で入力してください");
    }

    return name;
  }

  public getEmail(): string {
    return this.email;
  }

  setEmail(email: string): string {
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

    return email;
  }

  public getPassword(): string {
    return this.password;
  }

  setPassword(password: string): string {
    if (password.length < 8) {
      throw unprocessableEntityException("パスワードは8字以上で入力してください");
    }

    if (password.length > 255) {
      throw unprocessableEntityException("パスワードは255文字未満で入力してください");
    }

    return password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
