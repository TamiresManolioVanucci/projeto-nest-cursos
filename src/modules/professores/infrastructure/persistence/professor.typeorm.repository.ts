/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../domain/repositories/professor.repository';
import { Professor } from '../../domain/entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessorTypeOrmRepository implements ProfessorRepository {
  constructor(
    @InjectRepository(Professor)
    private readonly repository: Repository<Professor>,
  ) {}

  findByEmail(email: string): Promise<Professor | null> {
    throw new Error('Method not implemented.');
  }
  async create(professor: Professor): Promise<Professor> {
    return await this.repository.save(professor);
  }
  list(): Promise<Professor[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Professor | null> {
    throw new Error('Method not implemented.');
  }
  update(professor: Professor): Promise<Professor> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
