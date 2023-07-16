import { User } from "./UserEntity";

export interface IUserRepository {
  create(name: string, email: string, password: string): Promise<User>;
  find(email: string, password: string): Promise<User>;
  findAll(): Promise<Array<User>>;
}
