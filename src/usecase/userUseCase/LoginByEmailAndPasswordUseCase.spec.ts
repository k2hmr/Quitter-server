import { UserRepositoryMock } from "../../usecase/shared/TestHelper";
import { LoginByEmailAndPasswordUseCase } from "./LoginByEmailAndPasswordUseCase";

describe("LoginByEmailAndPasswordUseCase", () => {
  let userRepository: UserRepositoryMock;
  let loginByEmailAndPasswordUseCase: LoginByEmailAndPasswordUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    loginByEmailAndPasswordUseCase = new LoginByEmailAndPasswordUseCase(userRepository);
  });

  it("should login a user by email and password", async () => {
    const user = {
      name: "test",
      email: "test@email.com",
      password: "password123",
    };

    await userRepository.create(user);

    const loggedInUser = await loginByEmailAndPasswordUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(loggedInUser).toBeDefined();
    expect(loggedInUser.name).toBe(user.name);
    expect(loggedInUser.email).toBe(user.email);
    expect(loggedInUser.password).toBe(user.password);
  });

  it("should throw an error if user is not found", async () => {
    const nonExistentUser = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    const user = await loginByEmailAndPasswordUseCase.execute(nonExistentUser);
    expect(user).toBeUndefined();
  });
});
