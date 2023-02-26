
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Coffee {
    id: number;
    name: string;
    brand: string;
    flavors: string[];
}

export abstract class IQuery {
    coffees: Coffee[];
    coffee?: Nullable<Coffee>;
}

type Nullable<T> = T | null;
