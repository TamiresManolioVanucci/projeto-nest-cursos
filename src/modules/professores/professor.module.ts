import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './domain/entities/professor.entity';
import { ProfessorRepository } from './domain/repositories/professor.repository';
import { ProfessorTypeOrmRepository } from './infrastructure/persistence/professor.typeorm.repository';
import { CreateProfessorUseCase } from './application/create-professor.use-case';
import { EmailIsUniqueValidator } from 'src/shared/validation/email-is-unique.validator';
import { ProfessorController } from './infrastructure/controllers/professor.controller';
import { ListProfessorUseCase } from './application/list-professor.use-case';
import { FindProfessorUseCase } from './application/find-professor.use-case';
import { UpdateProfessorUseCase } from './application/update-professor.use-case';
import { DeleteProfessorUseCase } from './application/delete-professor.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginProfessorUseCase } from './application/login-professor.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Professor]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minhaChaveSecreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProfessorController],
  providers: [
    {
      provide: ProfessorRepository,
      useClass: ProfessorTypeOrmRepository,
    },
    EmailIsUniqueValidator,
    CreateProfessorUseCase,
    ListProfessorUseCase,
    FindProfessorUseCase,
    UpdateProfessorUseCase,
    DeleteProfessorUseCase,
    LoginProfessorUseCase,
  ],
  exports: [ProfessorRepository, EmailIsUniqueValidator],
})
export class ProfessoresModule {}
