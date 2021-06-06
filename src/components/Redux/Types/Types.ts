export interface IPrice {
  [key: string]: Array<number>;
}
export interface IPizza {
  id: number;
  imageUrl: string;
  name: string;
  types: Array<number>;
  sizes: Array<number>;
  price: IPrice;
  category: number;
  rating: number;
}
export interface ISortFilter {
  name: string;
  type: string;
  order: string;
}
export interface IPizzaAdd {
  [id: string]: IEveryOrderPizzas;
}

export interface IEveryOrderPizzas {
  price: number;
  name: string;
  imageUrl: string;
}

export interface IAddPizzaOrderBy {
  id: number;
  labelTypes: number;
  sizesName: Array<number>;
  labelSize: number;
  price: IPrice;
  category: number;
  name: string;
  imageUrl: string;
}
export type exit = {
  [key: string]: {
    price: number;
    name: string;
    imageUrl: string;
  };
};
