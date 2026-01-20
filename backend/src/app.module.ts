import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import config from './config';
import { Todo } from './todos/entities/todo.entity';
import { JwtAuthMiddleware } from './common/middleware/auth';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: config.database.host,
        port: parseInt(config.database.port?.toString() ?? '3306'),
        username: config.database.user,
        password: config.database.password,
        database: config.database.name,
        entities: [Todo],
        synchronize: true,
        timezone: 'Z',
      }),
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes({ path: 'todos', method: RequestMethod.ALL });
  }
}
//  export class AppModule {}
