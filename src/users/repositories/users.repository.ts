import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthSignInDto } from 'src/auth/dto/auth.dto';
import { getHashedPassword } from 'src/common/utils/get-hashed-password';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  findByCredentials({ email, password }: AuthSignInDto) {
    return this.findOne({ email, password: getHashedPassword(password) });
  }
}
