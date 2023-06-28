import { UserRepositoryMock } from "../../usecase/shared/TestHelper";
import { RegisterByEmailAndPasswordUseCase } from "./RegisterByEmailAndPasswordUseCase";

describe("RegisterByEmailAndPasswordUseCase", () => {
  let userRepository: UserRepositoryMock;
  let registerByEmailAndPasswordUseCase: RegisterByEmailAndPasswordUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    registerByEmailAndPasswordUseCase = new RegisterByEmailAndPasswordUseCase(userRepository);
  });

  it("should register a user by email and password", async () => {
    const user = {
      name: "test",
      email: "test@email.com",
      password: "password123",
    };

    await registerByEmailAndPasswordUseCase.execute(user);

    const registeredUser = await userRepository.find({ email: user.email, password: user.password });

    expect(registeredUser).toBeDefined();
    expect(registeredUser.name).toBe(user.name);
    expect(registeredUser.email).toBe(user.email);
    expect(registeredUser.password).toBe(user.password);
  });
});
