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
## Default Scalar types
GraphQL comes with a set of default scalar types. These are the built-in types that you can use in your schema. 

| Scalar Type | Description |
| ----------- | ----------- |
| Int | A signed 32‐bit integer. |
| Float | A signed double-precision floating-point value. |
| String | A UTF‐8 character sequence. |
| Boolean | true or false. |
| ID | The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable. |


## GraphQL variables

It wouldn't be a good idea to pass these dynamic arguments directly in the query string, because then our client-side code would need to dynamically manipulate the query string at runtime, and serialize it into a GraphQL-specific format. Instead, GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called variables.

    ```graphql
    query GetCoffee($id: ID!) {
      coffee(id: $id) {
        id
        name
        brand
        flavors
      }
    }
    ```
    ```json
    {
      "id": "1"
    }
    ```

## Connecting database
Install the following dependencies:
```shell
npm install @nestjs/typeorm typeorm pg
```

Add the following code to `app.module.ts`:
```typescript
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 👈 Using the ApolloDriver
      typePaths: ['./**/*.graphql'], // 👈 where our (.)graphql files are located
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeModule,
  ],
  providers: [],
})
export class AppModule {}
```
## Auto validate input 
To auto validate input, we will use `class-validator` package. To install it, run the following command:
```shell
npm i class-validator class-transformer
```

```typescript
// 📝 create-coffee.input
import { MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class CreateCoffeeInput extends GraphQLTypes.CreateCoffeeInput {
  @MinLength(3)
  name: string;
}

// 📝 update-coffee.input
import { MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class UpdateCoffeeInput extends GraphQLTypes.UpdateCoffeeInput {
  @IsOptional()
  @MinLength(3)
  name: string;
}
```

🔔🔔 Make sure to update references of `GraphQLTypes.CreateCoffeeInput` (and Update) to
CreateCoffeeInput & UpdateCoffeeInput respectively - in both resolver and service files.

## Adding relations
Let's add a relation between `Coffee` and `Flavor` entities. To do that, open `coffee.entity.ts` and add the following code:
```typescript
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from '../../flavors/entities/flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  recommendations: number;

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees,
    {
      cascade: true,
    },
  )
  flavors: Flavor[];
}
```

and open `flavor.entity.ts` and add the following code:
```typescript
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from '../../coffees/entities/coffee.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(
    type => Coffee,
    coffee => coffee.flavors,
  )
  coffees: Coffee[];
}
```

Now let's update the graphql schema to reflect the changes we made to our entities. Open `src/coffees/coffees.graphql` and add the following code:
```graphql
type Coffee {
  id: ID!
  name: String!
  brand: String!
  description: String
  recommendations: Int!
  flavors: [Flavor!]!
}

type Flavor {
  id: ID!
  name: String!
  coffees: [Coffee!]!
}
```
## Using field resolvers

In real world applications, we may need to resolve some of the properties on-demand (meaning: only when they are requested).

Field resolvers can be very useful when we are resolving SQL relations (take as an example, our existing Coffee & Flavor relation).

Let’s create a new CoffeeFlavorsResolver class using the Nest CLI:
```shell
nest g resolver coffees/coffee-flavors --flat
```

```typescript
// 📝 coffee-flavors.resolver 
@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(
    // ⚙️ Inject the Flavor Repository
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    // Using the injected repository, 
    // let’s retrieve ALL flavors that belong to a “parent coffee”.
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
```

