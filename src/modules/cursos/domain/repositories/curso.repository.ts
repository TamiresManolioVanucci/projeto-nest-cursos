/* eslint-disable prettier/prettier */
import { Curso } from "../entities/curso.entity";

export abstract class CursoRepository {
  abstract create(curso: Curso): Promise<Curso>;
  abstract list(): Promise<Curso[]>;
  abstract findById(id: string): Promise<Curso | null>;
  abstract update(curso: Curso): Promise<Curso>;
  abstract delete(id: string): Promise<void>;
}