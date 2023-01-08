import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    let userToAdm = this.usersRepository.findById(user_id);
    if (!userToAdm) {
      throw new Error(`User ${user_id} not found`);
    }

    userToAdm = this.usersRepository.turnAdmin(userToAdm);
    return userToAdm;
  }
}

export { TurnUserAdminUseCase };
