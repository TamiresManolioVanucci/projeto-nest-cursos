import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateOrUpdateDTO } from 'src/shared/util/create-or-update.dto';

export class LoginProfessorDTO extends CreateOrUpdateDTO {
  @IsEmail(undefined, { message: 'O email informado é invalido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  password: string;
}
