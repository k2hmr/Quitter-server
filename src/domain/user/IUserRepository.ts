import { User } from "./UserEntity";
import { UserId } from "./UserId";

export interface IUserRepository {
  create(user: { name: string; email: string; password: string }): Promise<User>;
  find(user: { email: string; password: string }): Promise<User>;
  findAll(): Promise<Array<User>>;
  exists(id: UserId): Promise<boolean>;
}
