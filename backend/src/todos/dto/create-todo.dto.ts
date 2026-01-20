import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus | null;
}
