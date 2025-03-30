import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { ProfessorRepository } from '../domain/repositories/professor.repository';
import { CreateProfessorDTO } from '../infrastructure/dtos/create-professor.dto';
import { Professor } from '../domain/entities/professor.entity';

@Injectable()
export class CreateProfessorUseCase implements UseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(id: string | null, body: CreateProfessorDTO): Promise<any> {
    const professor = new Professor();

    Object.assign(professor, body as unknown as Professor);

    return await this.professorRepository.create(professor);
  }
}
