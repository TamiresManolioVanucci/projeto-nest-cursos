/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateCursoDTO } from '../dtos/create-curso.dto';
import { CreateCursoUseCase } from '../../application/create-curso.use-case';

@Controller('cursos')
export class CursoController {
  constructor(private readonly createCursoUseCase: CreateCursoUseCase) {}

  @Post()
  async create(@Body() createCursoDTO: CreateCursoDTO) {
    const cursoCriado = await this.createCursoUseCase.execute(
      null,
      createCursoDTO,
    );

    return {
      message: 'Curso criado com sucesso.',
      curso: {
        id: cursoCriado.id,
        curso: cursoCriado.curso,
      },
    };
  }
}
