import { Todo, TodoStatus } from '../entities/todo.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';

export interface TodoRepository {
  create(todo: CreateTodoDto): Promise<Todo>;
  findAll(status?: TodoStatus): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  update(id: string, data: UpdateTodoDto): Promise<Todo>;
  delete(id: string): Promise<void>;
}
