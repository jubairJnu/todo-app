import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo, TodoStatus } from '../entities/todo.entity';
import { TodoRepository } from './todo.repository';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...createTodoDto,
      status: createTodoDto.status ?? TodoStatus.PENDING,
    });
    return this.todoRepository.save(todo);
  }

  async findAll(status?: TodoStatus): Promise<Todo[]> {
    if (status) {
      return this.todoRepository.find({
        where: { status },
        order: { createdAt: 'DESC' },
      });
    }
    return this.todoRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    const updatedTodo = this.todoRepository.merge(todo, updateTodoDto);
    return this.todoRepository.save(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
