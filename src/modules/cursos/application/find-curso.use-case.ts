import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { CursoRepository } from '../domain/repositories/curso.repository';

@Injectable()
export class FindCursoUseCase implements UseCase {
  constructor(private readonly cursoRepository: CursoRepository) {}

  async execute(id: string): Promise<any> {
    return await this.cursoRepository.findById(id);
  }
}
