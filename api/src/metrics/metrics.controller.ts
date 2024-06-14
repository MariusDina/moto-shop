import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { register } from 'prom-client';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  @Get()
  getMetrics() {
    return register.metrics();
  }
}
