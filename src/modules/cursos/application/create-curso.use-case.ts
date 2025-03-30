/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/interfaces/use-case.interface';
import { CreateOrUpdateDTO } from 'src/shared/util/create-or-update.dto';
import { CursoRepository } from '../domain/repositories/curso.repository';
import { Curso } from '../domain/entities/curso.entity';

@Injectable()
export class CreateCursoUseCase implements UseCase {
  constructor(private readonly cursoRepository: CursoRepository) {}

  async execute(id?: string | null, body?: CreateOrUpdateDTO): Promise<Curso> {
    if (!body) {
      throw new Error('O corpo da requisição é obrigatório.');
    }

    const curso = new Curso();
    Object.assign(curso, body);

    return await this.cursoRepository.create(curso);
  }
}
