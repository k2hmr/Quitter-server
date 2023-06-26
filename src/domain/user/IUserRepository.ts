import { User } from "./UserEntity";

export interface IUserRepository {
  create(user: { name: string; email: string; password: string }): Promise<void>;
  find(user: { email: string; password: string }): Promise<User>;
  findAll(): Promise<Array<User>>;
}
