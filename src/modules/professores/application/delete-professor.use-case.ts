import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { ProfessorRepository } from '../domain/repositories/professor.repository';

@Injectable()
export class DeleteProfessorUseCase implements UseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(id: string): Promise<any> {
    const professor = await this.professorRepository.findById(id);

    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }

    await this.professorRepository.delete(id);

    return professor;
  }
}
