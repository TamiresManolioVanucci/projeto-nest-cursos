import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { CursoRepository } from '../domain/repositories/curso.repository';

@Injectable()
export class DeleteCursoUseCase implements UseCase {
  constructor(private readonly cursoRepository: CursoRepository) {}

  async execute(id: string): Promise<any> {
    const curso = await this.cursoRepository.findById(id);

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    await this.cursoRepository.delete(id);

    return curso;
  }
}
