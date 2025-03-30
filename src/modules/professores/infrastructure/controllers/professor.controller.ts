/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfessorUseCase } from '../../application/create-professor.use-case';
import { CreateProfessorDTO } from '../dtos/create-professor.dto';
import { ListProfessorDTO } from '../dtos/list-professor.dto';
import { HashPasswordPipe } from 'src/shared/pipes/hash-password.pipe';

@Controller('professores')
export class ProfessorController {
  constructor(
    private readonly createProfessorUseCase: CreateProfessorUseCase,
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
}
