import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDTO } from './create-professor.dto';

export class UpdateProfessorDTO extends PartialType(CreateProfessorDTO) {}
