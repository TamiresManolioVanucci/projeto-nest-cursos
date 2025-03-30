import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { CursoRepository } from '../domain/repositories/curso.repository';

@Injectable()
export class ListCursoUseCase implements UseCase {
  constructor(private readonly cursoRepository: CursoRepository) {}

  async execute(): Promise<any> {
    return await this.cursoRepository.list();
  }
}
