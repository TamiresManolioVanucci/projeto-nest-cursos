/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { ProfessorRepository } from '../domain/repositories/professor.repository';
import { LoginProfessorDTO } from '../infrastructure/dtos/login-professor.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginProfessorUseCase implements UseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}
  async execute(id?: string | null, body?: LoginProfessorDTO): Promise<any> {
    body = body as LoginProfessorDTO;
    const professor = await this.professorRepository.findByEmail(body.email);

    if (!professor) throw new UnauthorizedException('Credenciais inválidas');

    const isPasswordValid = await bcrypt.compare(
      body.password,
      professor.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciais inválidas');

    const payload = { email: professor.email, sub: professor.id };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
  }
}
