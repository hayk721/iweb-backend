import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly _logger = new Logger(TasksService.name);

  constructor() {}

}
