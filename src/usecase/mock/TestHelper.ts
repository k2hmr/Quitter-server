import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/UserEntity";

export class UserRepositoryMock implements IUserRepository {
  private readonly users: Array<User>;
  constructor() {
    this.users = [];
  }
  public async create(name: string, email: string, password: string): Promise<User> {
    const createdUser = User.construct({ name, email, password, createdAt: new Date() });
    this.users.push(createdUser);
    return createdUser;
  }
  public async find(email: string, password: string): Promise<User> {
    return this.users.find((u) => u.email === email && u.password === password);
  }
  public async findAll(): Promise<Array<User>> {
    return this.users;
  }
}
