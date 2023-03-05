import { Test, TestingModule } from '@nestjs/testing';
import { DrinkResolver } from './drink.resolver';

describe('DrinkResolver', () => {
  let resolver: DrinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrinkResolver],
    }).compile();

    resolver = module.get<DrinkResolver>(DrinkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
