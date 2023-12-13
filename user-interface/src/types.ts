export interface EnergyDrink {
  fullName: string;
  brand: string;
  image: string;
  volume: number;
  priceWithDiscount: number;
  priceWithOutDiscount: number;
  discount: number;
}

export interface SortedEnergyDrink extends EnergyDrink {
  shopInfo: {
    name: string;
    image: string;
  };
}

export interface Shop {
  name: string;
  image: string;
  energyDrinks: EnergyDrink[];
}

export enum sortTypeValues {
  DISCOUNT,
  PRICE,
}

export enum sortOrderValues {
  ASCENDING = 2,
  DESCENDING,
}
