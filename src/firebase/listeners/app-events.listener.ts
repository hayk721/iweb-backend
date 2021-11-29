import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppEventsListener {
  constructor(private readonly _schedulerRegistry: SchedulerRegistry) {}

  @OnEvent('event-name')
  async handleEventNameEvent(event) {}
}
