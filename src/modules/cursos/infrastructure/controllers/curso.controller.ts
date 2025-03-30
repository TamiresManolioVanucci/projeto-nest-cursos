/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCursoDTO } from '../dtos/create-curso.dto';
import { CreateCursoUseCase } from '../../application/create-curso.use-case';
import { ListCursoUseCase } from '../../application/list-curso.use-case';
import { ListCursoDTO } from '../dtos/list-curso.dto';
import { Curso } from '../../domain/entities/curso.entity';
import { FindCursoUseCase } from '../../application/find-curso.use-case';

@Controller('cursos')
export class CursoController {
  constructor(
    private readonly createCursoUseCase: CreateCursoUseCase,
    private readonly listCursoUseCase: ListCursoUseCase,
    private readonly findCursolUseCase: FindCursoUseCase,
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
  @Get(':id')
  async findById(@Param('id') id: string) {
    const cursoFound = await this.findCursolUseCase.execute(id);

    return {
      message: 'Curso encontrado.',
      curso: new ListCursoDTO(cursoFound.id, cursoFound.curso),
    };
  }
}
