import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DateScalar } from './common/scalars/date.scalar';
import { DrinkResolver } from './drink/drink.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 👈 Using the ApolloDriver
      typePaths: ['./**/*.graphql'], // 👈 where our (.)graphql files are located
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // this is the default path
      ignoreEnvFile: process.env.NODE_ENV === 'production', // ignore the .env file in production
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true, // Automatically load entities from the entities folder.
          synchronize: true, // Don't use this in production! This will drop and re-create your database every time the app is restarted.
        };
      },
    }),
    CoffeeModule,
  ],
  providers: [DateScalar, DrinkResolver],
})
export class AppModule {}
