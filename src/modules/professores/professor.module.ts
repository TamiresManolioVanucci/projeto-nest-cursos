import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './domain/entities/professor.entity';
import { ProfessorRepository } from './domain/repositories/professor.repository';
import { ProfessorTypeOrmRepository } from './infrastructure/persistence/professor.typeorm.repository';
import { CreateProfessorUseCase } from './application/create-professor.use-case';
import { EmailIsUniqueValidator } from 'src/shared/validation/email-is-unique.validator';
import { ProfessorController } from './infrastructure/controllers/professor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessorController],
  providers: [
    {
      provide: ProfessorRepository,
      useClass: ProfessorTypeOrmRepository,
    },
    EmailIsUniqueValidator,
    CreateProfessorUseCase,
  ],
  exports: [ProfessorRepository, EmailIsUniqueValidator],
})
export class ProfessoresModule {}
