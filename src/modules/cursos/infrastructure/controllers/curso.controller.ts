/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCursoDTO } from '../dtos/create-curso.dto';
import { CreateCursoUseCase } from '../../application/create-curso.use-case';
import { ListCursoUseCase } from '../../application/list-curso.use-case';
import { ListCursoDTO } from '../dtos/list-curso.dto';
import { Curso } from '../../domain/entities/curso.entity';

@Controller('cursos')
export class CursoController {
  constructor(
    private readonly createCursoUseCase: CreateCursoUseCase,
    private readonly listCursoUseCase: ListCursoUseCase,
  ) {}

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
  @Get()
  async list(): Promise<{ message: string; cursos: ListCursoDTO[] }> {
    const cursoList: Curso[] = await this.listCursoUseCase.execute();

    return {
      message: 'Curso listado com sucesso.',
      cursos: cursoList.map((curso) => new ListCursoDTO(curso.id, curso.curso)),
    };
  }
}
