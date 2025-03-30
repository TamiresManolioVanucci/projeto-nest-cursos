/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Curso } from "./domain/entities/curso.entity";
import { CursoController } from "./infrastructure/controllers/curso.controller";
import { CursoRepository } from "./domain/repositories/curso.repository";
import { CursoTypeOrmRepository } from "./infrastructure/persistence/cursos.typeorm.repository";
import { CreateCursoUseCase } from "./application/create-curso.use-case";
import { ListCursoUseCase } from "./application/list-curso.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([Curso])],
  controllers: [CursoController],
  providers: [
    {
      provide: CursoRepository,
      useClass: CursoTypeOrmRepository,
    },
    CreateCursoUseCase,
    ListCursoUseCase,
  ],
  exports: [CursoRepository],
})
export class CursosModule {}