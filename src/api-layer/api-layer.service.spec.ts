import { Test, TestingModule } from '@nestjs/testing';
import { ApiLayerService } from './api-layer.service';

describe('ApiLayerService', () => {
  let service: ApiLayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiLayerService],
    }).compile();

    service = module.get<ApiLayerService>(ApiLayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
