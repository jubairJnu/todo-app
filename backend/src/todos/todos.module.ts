import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmTodoRepository } from './repository/typeorm-todo.repository';
import { TODO_REPOSITORY } from './repository/todo.repository.token';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    TodosService,
    {
      provide: TODO_REPOSITORY,
      useClass: TypeOrmTodoRepository,
    },
  ],
})
export class TodosModule {}
