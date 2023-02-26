import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import * as GraphQLTypes from '../graphql-types/graphql';

@Resolver()
export class CoffeeResolver {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Query('coffees')
  async findAll(): Promise<GraphQLTypes.Coffee[]> {
    return this.coffeeService.findAll();
  }
  @Query('coffee')
  async findOneById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.findOne(id);
  }

  @Mutation('createCoffee')
  async create(
    @Args('input') createCoffeeInput: GraphQLTypes.Coffee,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.create(createCoffeeInput);
  }
}
