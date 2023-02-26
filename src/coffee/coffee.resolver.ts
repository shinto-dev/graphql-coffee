import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../graphql';

@Resolver()
export class CoffeeResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }
}
