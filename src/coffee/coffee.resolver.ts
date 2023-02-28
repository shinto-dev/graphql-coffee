import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import * as GraphQLTypes from '../graphql-types/graphql';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { CreateCoffeeInput } from './dto/create-coffee.input';

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
    @Args('input') createCoffeeInput: CreateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('input') updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.update(id, updateCoffeeInput);
  }

  @Mutation('deleteCoffee')
  async remove(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.remove(id);
  }
}
