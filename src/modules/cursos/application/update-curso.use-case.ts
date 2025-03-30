import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { CursoRepository } from '../domain/repositories/curso.repository';
import { UpdateCursoDTO } from '../infrastructure/dtos/update-curso.dto';

@Injectable()
export class UpdateCursoUseCase implements UseCase {
  constructor(private readonly cursoRepository: CursoRepository) {}

  async execute(id: string, body: UpdateCursoDTO): Promise<any> {
    if (!id) {
      throw new Error('ID do Curso é obrigatório.');
    }

    const existingCurso = await this.cursoRepository.findById(id);
    if (!existingCurso) {
      throw new Error('Curso não encontrada.');
    }

    Object.assign(existingCurso, body);

    return await this.cursoRepository.update(existingCurso);
  }
}
