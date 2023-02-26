import { Module } from '@nestjs/common';
import { CoffeeResolver } from './coffee.resolver';
import { CoffeeService } from './coffee.service';

@Module({
  imports: [],
  providers: [CoffeeResolver, CoffeeService],
})
export class CoffeeModule {}
