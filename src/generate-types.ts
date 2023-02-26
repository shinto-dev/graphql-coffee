import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'), // 👈 where to save the generated file
  outputAs: 'class',
  watch: true, // 👈 watch for changes
  skipResolverArgs: true,
  defaultTypeMapping: {
    ID: 'number', // 👈 map ID to number, default is string.
  },
});
