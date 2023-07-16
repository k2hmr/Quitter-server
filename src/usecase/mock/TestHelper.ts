import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/UserEntity";

export class UserRepositoryMock implements IUserRepository {
  private readonly users: Array<User>;
  constructor() {
    this.users = [];
  }
  public async create(name: string, email: string, password: string): Promise<User> {
    const createdUser = new User("1b413a81-f82a-4073-b094-e519ddea2fc8", name, email, password, new Date());
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
