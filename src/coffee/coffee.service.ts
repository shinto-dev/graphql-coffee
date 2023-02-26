import { Injectable } from '@nestjs/common';
import * as GraphQLTypes from '../graphql-types/graphql';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  create(createCoffeeInput: GraphQLTypes.CreateCoffeeInput) {
    const coffee = this.coffeeRepository.create(createCoffeeInput);
    return this.coffeeRepository.save(coffee);
  }
}
