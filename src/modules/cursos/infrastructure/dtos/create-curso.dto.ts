/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { CreateOrUpdateDTO } from 'src/shared/util/create-or-update.dto';

export class CreateCursoDTO extends CreateOrUpdateDTO {
  @IsNotEmpty({ message: 'O campo curso não pode ser vazio' })
  curso: string;

  @IsNotEmpty({ message: 'O campo area não pode ser vazio' })
  area: string;

  @IsNotEmpty({ message: 'O campo tipo não pode ser vazio' })
  tipo: string;
  }