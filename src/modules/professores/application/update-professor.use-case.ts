/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { ProfessorRepository } from '../domain/repositories/professor.repository';
import { UpdateProfessorDTO } from '../infrastructure/dtos/update-professor.dto';
import { HashPasswordPipe } from 'src/shared/pipes/hash-password.pipe';

@Injectable()
export class UpdateProfessorUseCase implements UseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(id: string, body: UpdateProfessorDTO): Promise<any> {
    if (!id) {
      throw new Error('ID do professor é obrigatório.');
    }

    const existingProfessor = await this.professorRepository.findById(id);
    if (!existingProfessor) {
      throw new Error('Professor não encontrado.');
    }

    if (body.password) {
      const hashedPassword = await new HashPasswordPipe().transform(
        body.password,
      );
      body.password = hashedPassword;
    }

    Object.assign(existingProfessor, body);

    return await this.professorRepository.update(existingProfessor);
  }
}
