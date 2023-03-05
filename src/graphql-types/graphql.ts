
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCoffeeInput {
    name: string;
    brand: string;
    flavors: string[];
}

export class UpdateCoffeeInput {
    name?: Nullable<string>;
    brand?: Nullable<string>;
    flavors?: Nullable<string[]>;
}

export interface Drink {
    name: string;
}

export class Tea implements Drink {
    id: number;
    name: string;
}

export class Coffee implements Drink {
    id: number;
    name: string;
    brand: string;
    flavors?: Nullable<Flavor[]>;
    createdAt?: Nullable<Date>;
}

export class Flavor {
    id: number;
    name: string;
}

export abstract class IQuery {
    coffees: Coffee[];
    coffee: Coffee;
    drinks: Drink[];
}

export abstract class IMutation {
    createCoffee: Coffee;
    updateCoffee: Coffee;
    deleteCoffee: Coffee;
}

type Nullable<T> = T | null;
