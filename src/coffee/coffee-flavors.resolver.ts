import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  @ResolveField('flavors')
  async getFlavoursOfCoffee(
    @Parent() coffee: GraphQLTypes.Coffee,
  ): Promise<GraphQLTypes.Flavor[]> {
    return this.flavorRepository.find({
      where: { coffees: { id: coffee.id } },
    });
  }
}
