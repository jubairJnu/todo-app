import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { NotFoundException } from '@nestjs/common';

import { Todo, TodoStatus } from './entities/todo.entity';
import { TodoRepository } from './repository/todo.repository';
import { TODO_REPOSITORY } from './repository/todo.repository.token';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly todoRepository: TodoRepository,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    
    return this.todoRepository.create(createTodoDto);
  }

  async findAll(status?: TodoStatus) {
    return this.todoRepository.findAll(status);
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todoRepository.update(id, updateTodoDto);
    } catch (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.todoRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
