/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCursoDTO } from '../dtos/create-curso.dto';
import { CreateCursoUseCase } from '../../application/create-curso.use-case';
import { ListCursoUseCase } from '../../application/list-curso.use-case';
import { ListCursoDTO } from '../dtos/list-curso.dto';
import { Curso } from '../../domain/entities/curso.entity';
import { FindCursoUseCase } from '../../application/find-curso.use-case';
import { UpdateCursoDTO } from '../dtos/update-curso.dto';
import { UpdateCursoUseCase } from '../../application/update-curso.use-case';
import { DeleteCursoUseCase } from '../../application/delete-curso.use-case';

@Controller('cursos')
export class CursoController {
  constructor(
    private readonly createCursoUseCase: CreateCursoUseCase,
    private readonly listCursoUseCase: ListCursoUseCase,
    private readonly findCursolUseCase: FindCursoUseCase,
    private readonly updateImobiliariaUseCase: UpdateCursoUseCase,
    private readonly deleteCursoUseCase: DeleteCursoUseCase,
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
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCursoDTO) {
    const cursoUpdated = await this.updateImobiliariaUseCase.execute(id, body);

    return {
      message: 'Curso atualizada',
      curso: new ListCursoDTO(cursoUpdated.id, cursoUpdated.curso),
    };
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const cursoDeleted = await this.deleteCursoUseCase.execute(id);

    return {
      message: 'Curso deletado',
      curso: new ListCursoDTO(
        cursoDeleted.id,
        cursoDeleted.curso,
      ),
    };
  }
}
