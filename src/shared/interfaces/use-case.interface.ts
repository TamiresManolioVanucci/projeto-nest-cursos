/* eslint-disable prettier/prettier */
import { CreateOrUpdateDTO } from '../util/create-or-update.dto';

export interface UseCase {
  execute(id?: string | null, body?: CreateOrUpdateDTO): Promise<any>;
}