import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from '../graphql';

@Injectable()
export class CoffeeService {
  findAll() {
    return [];
  }

  findOne(id: number) {
    return null;
  }

  create(createCoffeeInput: CreateCoffeeInput) {
    return null;
  }
}
