/* eslint-disable prettier/prettier */
import { Professor } from 'src/modules/professores/domain/entities/professor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  curso: string;

  @Column()
  area: string;

  @Column()
  tipo: string;

  @Column()
  periodo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Professor, (professor) => professor.cursos)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;
}
