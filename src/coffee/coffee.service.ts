import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

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

  create(createCoffeeInput: CreateCoffeeInput) {
    const coffee = this.coffeeRepository.create(createCoffeeInput);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    return this.coffeeRepository.save({
      ...coffee,
      ...updateCoffeeInput,
    });
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return await this.coffeeRepository.remove(coffee);
  }
}
