import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { ProfessorRepository } from '../domain/repositories/professor.repository';

@Injectable()
export class FindProfessorUseCase implements UseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(id: string): Promise<any> {
    return await this.professorRepository.findById(id);
  }
}
