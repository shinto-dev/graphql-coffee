import * as GraphQLTypes from '../../graphql-types/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coffees')
export class Coffee implements GraphQLTypes.Coffee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column({ type: 'json' })
  flavors: string[];
}
