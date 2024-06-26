import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Comment } from './comments/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { File } from './file/entities/file.entity';
import { ModerationModule } from './moderation/moderation.module';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [
		UsersModule,
		TasksModule,
		CommentsModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'MySQL-8.0',
			port: 3306,
			username: 'root',
			password: '',
			database: 'NEST',
			entities: [User, Task, Comment, File],
			synchronize: false,
		}),
		BullModule.forRoot({
			redis: {
			  host: 'localhost',
			  port: 6379,
			},
		  }),
		AuthModule,
		FileModule,
		ModerationModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
