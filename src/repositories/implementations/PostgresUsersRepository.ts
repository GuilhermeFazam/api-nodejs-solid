import User from '../../entities/User';
import { IUsersRepository } from '../IUserRepository';

export default class PostgresUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const userByEmail = this.users.find((user) => user.email === email);

    return userByEmail;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
