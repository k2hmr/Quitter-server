import { FetchAllUsersUseCase } from "./FetchAllUsersUseCase";
import { UserRepositoryMock } from "../mock/TestHelper";

describe("FetchAllUsersUseCase", () => {
  let userRepository: UserRepositoryMock;
  let fetchAllUsersUseCase: FetchAllUsersUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    fetchAllUsersUseCase = new FetchAllUsersUseCase(userRepository);
  });

  it("should fetch all users", async () => {
    const user1 = {
      name: "test",
      email: "test@email.com",
      password: "password123",
    };

    const user2 = {
      name: "test2",
      email: "test2@email.com",
      password: "password456",
    };

    await userRepository.create({ ...user1 });
    await userRepository.create({ ...user2 });

    const users = await fetchAllUsersUseCase.execute();

    expect(users).toHaveLength(2);
    expect(users[0].name).toBe(user1.name);
    expect(users[0].email).toBe(user1.email);
    expect(users[0].password).toBe(user1.password);

    expect(users[1].name).toBe(user2.name);
    expect(users[1].email).toBe(user2.email);
    expect(users[1].password).toBe(user2.password);
  });
});
