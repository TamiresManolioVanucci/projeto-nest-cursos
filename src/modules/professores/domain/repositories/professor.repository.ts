import { Professor } from '../entities/professor.entity';

export abstract class ProfessorRepository {
  abstract create(professor: Professor): Promise<Professor>;
  abstract list(): Promise<Professor[]>;
  abstract findById(id: string): Promise<Professor | null>;
  abstract findByEmail(email: string): Promise<Professor | null>;
  abstract update(professor: Professor): Promise<Professor>;
  abstract delete(id: string): Promise<void>;
}
