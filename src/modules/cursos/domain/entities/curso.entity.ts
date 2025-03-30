/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
