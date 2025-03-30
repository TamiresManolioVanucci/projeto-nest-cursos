/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CursoRepository } from '../../domain/repositories/curso.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from '../../domain/entities/curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CursoTypeOrmRepository implements CursoRepository {
  constructor(
    @InjectRepository(Curso)
    private readonly repository: Repository<Curso>,
  ) {}

  async create(curso: Curso): Promise<Curso> {
    return await this.repository.save(curso);
  }
  async list(): Promise<Curso[]> {
    return await this.repository.find();
  }
  async findById(id: string): Promise<Curso | null> {
    return await this.repository.findOne({ where: { id } });
  }
  update(curso: Curso): Promise<Curso> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
