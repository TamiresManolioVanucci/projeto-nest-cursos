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

  async findByEmail(email: string): Promise<Professor | null> {
    return await this.repository.findOne({
      where: { email },
    });
  }
  async create(professor: Professor): Promise<Professor> {
    return await this.repository.save(professor);
  }
  async list(): Promise<Professor[]> {
    return await this.repository.find();
  }
  async findById(id: string): Promise<Professor | null> {
    return await this.repository.findOne({ where: { id } });
  }
  async update(professor: Professor): Promise<Professor> {
    return await this.repository.save(professor);
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
