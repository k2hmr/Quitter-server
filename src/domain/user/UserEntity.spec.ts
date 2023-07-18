import { unprocessableEntityException } from "../../exception/error";
import { User } from "./UserEntity";

describe("User", () => {
  it("should create a user object with valid input", () => {
    const user = {
      name: "test",
      email: "test@example.com",
      password: "password123",
      createdAt: new Date(),
    };

    const userInstance = User.construct({ ...user });
    expect(userInstance.name).toBe(user.name);
    expect(userInstance.email).toBe(user.email);
    expect(userInstance.password).toBe(user.password);
    expect(userInstance.createdAt).toBe(user.createdAt);
  });

  it("should throw an error if name is missing", () => {
    const user = {
      id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
      name: "",
      email: "test@example.com",
      password: "password123",
      createdAt: new Date(),
    };

    expect(() =>
      User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      )
    ).toThrowError(unprocessableEntityException("名前は必須です。"));
  });

  it("should throw an error if name exceeds 255 characters", () => {
    const user = {
      id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
      name: "a".repeat(256),
      email: "test@example.com",
      password: "password123",
      createdAt: new Date(),
    };

    expect(() =>
      User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      )
    ).toThrowError(unprocessableEntityException("名前は255文字未満で入力してください"));
  });

  it("should throw an error if email is missing", () => {
    const user = {
      id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
      name: "test",
      email: "",
      password: "password123",
      createdAt: new Date(),
    };

    expect(() =>
      User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      )
    ).toThrowError(unprocessableEntityException("メールアドレスは必須です。"));
  });

  it("should throw an error if email exceeds 255 characters", () => {
    const user = {
      id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
      name: "test",
      email: "a".repeat(256),
      password: "password123",
      createdAt: new Date(),
    };

    expect(() =>
      User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      )
    ).toThrowError(unprocessableEntityException("メールアドレスは255文字未満で入力してください"));
  });

  it("should throw an error if email is invalid", () => {
    const user = {
      id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
      name: "test",
      email: "invalid_email",
      password: "password123",
      createdAt: new Date(),
    };

    expect(() =>
      User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      )
    ).toThrowError(unprocessableEntityException("無効なメールアドレスです。"));
  });

  it("should throw an error if password is less than 8 characters", () => {
    const user = {
      id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
      name: "test",
      email: "test@example.com",
      password: "pass",
      createdAt: new Date(),
    };

    expect(() =>
      User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      )
    ).toThrowError(unprocessableEntityException("パスワードは8字以上で入力してください"));
  });

  it("should throw an error if password exceeds 255 characters", () => {
    const user = {
      id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
      name: "test",
      email: "test@example.com",
      password: "a".repeat(256),
      createdAt: new Date(),
    };

    expect(() =>
      User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      )
    ).toThrowError(unprocessableEntityException("パスワードは255文字未満で入力してください"));
  });
});
