import { Module } from '@nestjs/common';
import { TasksService } from './task.service';

@Module({
  imports: [],
  providers: [TasksService],
})
export class TasksModule {}
