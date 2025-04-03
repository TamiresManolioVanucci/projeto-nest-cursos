/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProfessorUseCase } from '../../application/create-professor.use-case';
import { CreateProfessorDTO } from '../dtos/create-professor.dto';
import { ListProfessorDTO } from '../dtos/list-professor.dto';
import { HashPasswordPipe } from 'src/shared/pipes/hash-password.pipe';
import { ListProfessorUseCase } from '../../application/list-professor.use-case';
import { FindProfessorUseCase } from '../../application/find-professor.use-case';
import { UpdateProfessorDTO } from '../dtos/update-professor.dto';
import { UpdateProfessorUseCase } from '../../application/update-professor.use-case';
import { DeleteProfessorUseCase } from '../../application/delete-professor.use-case';
import { LoginProfessorUseCase } from '../../application/login-professor.use-case';
import { LoginProfessorDTO } from '../dtos/login-professor.dto';

@Controller('professores')
export class ProfessorController {
  constructor(
    private readonly createProfessorUseCase: CreateProfessorUseCase,
    private readonly listProfessorUseCase: ListProfessorUseCase,
    private readonly findProfessorUseCase: FindProfessorUseCase,
    private readonly updateProfessorUseCase: UpdateProfessorUseCase,
    private readonly deleteProfessorUseCase: DeleteProfessorUseCase,
    private readonly loginProfessorUseCase: LoginProfessorUseCase,
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
  @Post('login')
  async login(@Body() body: LoginProfessorDTO) {
    const accessKey = await this.loginProfessorUseCase.execute(null, body);

    return {
      message: 'Login efetuado com sucesso',
      access_key: accessKey,
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
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const professorDeleted = await this.deleteProfessorUseCase.execute(id);

    return {
      message: 'Usuario do professor deletado',
      professor: new ListProfessorDTO(
        professorDeleted.id,
        professorDeleted.nome,
      ),
    };
  }
}
