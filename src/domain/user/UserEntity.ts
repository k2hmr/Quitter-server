import { UserSchema, UserType } from "../zod";

export class User {
  constructor(private readonly user: UserType) {
    UserSchema.parse(user);
    this.user = user;
  }

  get id(): string {
    return this.user.id;
  }

  get name(): string {
    return this.user.name;
  }

  get email(): string {
    return this.user.email;
  }

  get password(): string {
    return this.user.password;
  }
}
