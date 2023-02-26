import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../graphql';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class CoffeeResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }
  @Query('coffee')
  async findOneById(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return null;
  }

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput') createCoffeeInput: Coffee,
  ): Promise<Coffee> {
    return null;
  }
}
