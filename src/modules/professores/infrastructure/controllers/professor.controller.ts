/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProfessorUseCase } from '../../application/create-professor.use-case';
import { CreateProfessorDTO } from '../dtos/create-professor.dto';
import { ListProfessorDTO } from '../dtos/list-professor.dto';
import { HashPasswordPipe } from 'src/shared/pipes/hash-password.pipe';
import { ListProfessorUseCase } from '../../application/list-professor.use-case';
import { FindProfessorUseCase } from '../../application/find-professor.use-case';
import { UpdateProfessorDTO } from '../dtos/update-professor.dto';
import { UpdateProfessorUseCase } from '../../application/update-professor.use-case';

@Controller('professores')
export class ProfessorController {
  constructor(
    private readonly createProfessorUseCase: CreateProfessorUseCase,
    private readonly listProfessorUseCase: ListProfessorUseCase,
    private readonly findProfessorUseCase: FindProfessorUseCase,
    private readonly updateProfessorUseCase: UpdateProfessorUseCase,
  ) {}

  @Post()
  async create(
    @Body() { password, ...Body }: CreateProfessorDTO,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    const professorCreated = await this.createProfessorUseCase.execute(null, {
      ...Body,
      password: hashedPassword,
    });

    return {
      message: 'Usuario do professor criado com sucesso.',
      user: new ListProfessorDTO(professorCreated.id, professorCreated.nome),
    };
  }
  @Get()
  async list() {
    const professorList = await this.listProfessorUseCase.execute();

    return {
      message: 'Professor listado.',
      professor: professorList.map(
        (professor) => new ListProfessorDTO(professor.id, professor.nome),
      ),
    };
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    const professorFound = await this.findProfessorUseCase.execute(id);

    return {
      message: 'Professor encontrado.',
      professor: new ListProfessorDTO(professorFound.id, professorFound.nome),
    };
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProfessorDTO) {
    const professorUpdated = await this.updateProfessorUseCase.execute(
      id,
      body,
    );

    return {
      message: 'Professor atualizado',
      professor: new ListProfessorDTO(
        professorUpdated.id,
        professorUpdated.nome,
      ),
    };
  }
}
