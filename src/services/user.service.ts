import { inject, injectable } from 'tsyringe';
import { UserRepresentation } from '../domain/models/users/representations/user.representation';
import { UserRequest } from '../domain/models/users/requests/user.request';
import { IUser } from '../domain/models/users/user.interface';
import { IUserRepository } from '../domain/repositories/user.repository.interface';
import { IUserService } from '../domain/services/user.service.interface';

@injectable()
class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(@inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async create(userRequest: UserRequest): Promise<UserRepresentation | null> {
        const user: IUser = await this.userRepository.save(userRequest);
        return Promise.resolve(user);
    }
}

export default UserService;
