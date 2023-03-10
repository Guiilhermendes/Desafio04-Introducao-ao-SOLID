import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();
    Object.assign(newUser, {
      name,
      email,
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const userById = this.users.find((user) => user.id === id);
    return userById;
  }

  findByEmail(email: string): User | undefined {
    const userByEmail = this.users.find((user) => user.email === email);
    return userByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const user = this.users.find((user) => user.id === receivedUser.id);

    user.admin = true;
    user.updated_at = new Date();

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
