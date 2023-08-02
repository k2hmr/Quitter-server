import { UserId } from "../../domain/user/UserId";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/UserEntity";

export class UserRepositoryMock implements IUserRepository {
  private readonly users: Array<User>;
  constructor() {
    this.users = [];
  }
  public async create(user: { name: string; email: string; password: string }): Promise<User> {
    const createdUser = User.construct({
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date(),
    });
    this.users.push(createdUser);
    return createdUser;
  }
  public async find(user: { email: string; password: string }): Promise<User> {
    return this.users.find((u) => u.email === user.email && u.password === user.password);
  }
  public async findAll(): Promise<Array<User>> {
    return this.users;
  }

  public async exists(id: UserId): Promise<boolean> {
    return this.users.some((user) => user.id === id);
  }
}
