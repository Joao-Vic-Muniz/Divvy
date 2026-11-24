import bcrypt from "bcryptjs";
import { AppError } from "../../shared/errors/AppError.js";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface SafeUserOutput {
  id: string;
  name: string;
  email: string;
}

const SALT_ROUNDS = 10;

export class UserService {
  async createUser(data: CreateUserInput): Promise<SafeUserOutput> {
    const emailNormalized = data.email.trim().toLowerCase();

    const existing = await this.findByEmailMock(emailNormalized);
    if (existing) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    const createdUser = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: emailNormalized,
      passwordHash,
    };

    // Aqui entraria o salvamento no banco (ex.: userRepository.create(createdUser))

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  private async findByEmailMock(_email: string) {
    return null;
  }
}