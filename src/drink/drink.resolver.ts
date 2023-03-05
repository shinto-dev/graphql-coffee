import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types/graphql';

@Resolver('Drink')
export class DrinkResolver {
  @Query('drinks')
  async findAll(): Promise<GraphQLTypes.Drink[]> {
    // we're mocking everything just for demonstration purposes
    const coffee = new GraphQLTypes.Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    const tea = new GraphQLTypes.Tea();
    tea.name = 'Lipton';
    return [tea, coffee];
  }

  @ResolveField()
  __resolveType(value: GraphQLTypes.Drink) {
    // 🔔 Another option
    /*
    return Object.getPrototypeOf(value).constructor.name; // "Tea" or "Coffee"
    */
    if (value instanceof GraphQLTypes.Coffee) {
      return 'Coffee';
    }
    if (value instanceof GraphQLTypes.Tea) {
      return 'Tea';
    }
    return null;
  }
}
