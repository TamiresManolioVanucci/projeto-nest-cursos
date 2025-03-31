import { Curso } from 'src/modules/cursos/domain/entities/curso.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('professores')
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  telefone: string;

  @Column()
  departamento: string;

  @Column()
  periodo: string;

  @Column('int')
  carga_horaria: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Curso, (curso) => curso.professor)
  cursos: Curso[];
}
