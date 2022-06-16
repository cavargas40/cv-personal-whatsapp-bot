import { Module } from '@nestjs/common';
import { ApiLayerService } from './api-layer.service';

@Module({
  providers: [ApiLayerService]
})
export class ApiLayerModule {}
