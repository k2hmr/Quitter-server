import { User } from "../domain/user/UserEntity";

export interface IUserRepository {
  create(name: string, email: string, password: string): Promise<void>;
  find(email: string, password: string): Promise<User>;
  findAll(): Promise<Array<User>>;
}
