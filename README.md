## Installation

### Create project

```bash
$ nest new nestjs-graphql
```

### Install dependencies
To install graphQL dependencies, run the following command:
```bash
$ npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```
## Include GraphQL Module
To include GraphQL module, open `app.module.ts` and add the following code:
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 👈 Using the ApolloDriver
      typePaths: ['./**/*.graphql'], // 👈 where our (.)graphql files are located
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
Let's add generate-types script to src/generated-types.ts

```typescript
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
typePaths: ['./**/*.graphql'],
path: join(process.cwd(), 'src/graphql.ts'), // 👈 where to save the generated file
outputAs: 'class',
watch: true, // 👈 watch for changes
skipResolverArgs: true,
});
```

## Define first resolver
We are using schema first approach, so we need to define our schema first. To do that, create a new file `coffees.graphql` and add the following code:

src/coffees/coffees.graphql
```graphql
# ❗️ (exclamation point) means non-nullable AKA: REQUIRED
# - Don't worry we'll dive into everything here in more detail - in the next lesson
type Coffee {
id: ID! # ID (unique identifier) - non-nullable (required)
name: String! # String - non-nullable (required)
brand: String! 
flavors: [String!]! 
}

type Query {
coffees: [Coffee!]!
}
```
◾️ Terminal - let's install a dependency
To generate the resolver once we have the schema, we will use `ts-morph` package. To install it, run the following command:
```shell
npm i ts-morph
```

◾️ Terminal - let's run our generate-types Script
```shell
npx ts-node src/generate-types
```
This will generate a new file `src/graphql.ts` which will contain all the types we defined in our schema.

Now let's create the resolver for coffees. 
```shell
$ nest g resolver coffees
```
For now, let's just return an array of coffees from our resolver. Open `coffees.resolver.ts` and add the following code:
```typescript
import { Resolver, Query } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';

@Resolver(of => Coffee)
export class CoffeesResolver {
  @Query(returns => [Coffee])
  async coffees(): Promise<Coffee[]> {
    return [];
  }
}
```

Let's start the application and test our resolver:
```shell
$ npm run start:dev
```

Open the GraphQL playground and run the following query:
```graphql
query {
  coffees {
    id
    name
    brand
    flavors
  }
}
```

