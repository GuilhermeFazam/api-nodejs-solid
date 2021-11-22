import User from '../../entities/User';
import { IMailProvider } from '../../providers/IMailProviders';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export default class CreateUserUseCase {
  constructor(private userRepository:IUsersRepository, private MailProvider:IMailProvider) {}

  async execute(data:ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }
    const user = new User(data);
    await this.userRepository.save(user);

    await this.MailProvider.sendMail({
      to: {
        name: data.name,
        address: data.email,
      },
      from: {
        name: 'Equipe APP',
        address: 'equipe@app.com',
      },
      subject: `${data.name} Seja bem-vindo ao nosso APP"`,
      body: `<h1>${data.name} o seu cadastro foi criado com sucesso...</h1>`,
    });
  }
}
