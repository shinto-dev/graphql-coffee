import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeeService } from './coffee.service';

@Resolver()
export class CoffeeResolver {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return this.coffeeService.findAll();
  }
  @Query('coffee')
  async findOneById(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeeService.findOne(id);
  }

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput') createCoffeeInput: Coffee,
  ): Promise<Coffee> {
    return this.coffeeService.create(createCoffeeInput);
  }
}
