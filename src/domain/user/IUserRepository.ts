import { User } from "./UserEntity";

export interface IUserRepository {
  create(userInfo: { name: string; email: string; password: string }): Promise<void>;
  find(userInfo: { email: string; password: string }): Promise<User>;
  findAll(): Promise<Array<User>>;
}
