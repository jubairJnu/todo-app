import { Test } from '@nestjs/testing';
import { TodoStatus } from 'src/todos/entities/todo.entity';

import { TODO_REPOSITORY } from 'src/todos/repository/todo.repository.token';
import { TodosService } from 'src/todos/todos.service';

describe('TodoService', () => {
  it('creates todo with PENDING status', async () => {
    const repoMock = {
      create: jest.fn(async (t: any) => ({ id: '1', ...t })),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: TODO_REPOSITORY, useValue: repoMock },
      ],
    }).compile();

    const service = moduleRef.get(TodosService);

    const created = await service.create({ title: 'Test', description: 'D' });
    expect(repoMock.create).toHaveBeenCalled();
    expect(created.status).toBe(TodoStatus.PENDING);
  });
});
