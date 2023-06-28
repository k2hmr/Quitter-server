import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/UserEntity";

export class UserRepositoryMock implements IUserRepository {
  private readonly users: Array<User>;
  constructor() {
    this.users = [];
  }
  public async create(user: { name: string; email: string; password: string }): Promise<void> {
    this.users.push(
      new User({
        id: "1b413a81-f82a-4073-b094-e519ddea2fc8",
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: new Date(),
      })
    );
  }
  public async find(user: { email: string; password: string }): Promise<User> {
    return this.users.find((u) => u.email === user.email && u.password === user.password);
  }
  public async findAll(): Promise<Array<User>> {
    return this.users;
  }
}
