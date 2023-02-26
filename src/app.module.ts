import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CoffeeModule } from './coffee/coffee.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 👈 Using the ApolloDriver
      typePaths: ['./**/*.graphql'], // 👈 where our (.)graphql files are located
    }),
    CoffeeModule,
  ],
  providers: [],
})
export class AppModule {}
