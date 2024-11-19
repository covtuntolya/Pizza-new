import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useIngredients } from "./use-ingredients";
import { useSet } from "react-use";
import qs from "qs";

export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  selectedIngredients: string;
}


export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number)=>void;
  setPizzaTypes:(value: string)=>void;
  setSizes: (value: string)=>void;
  setSelectedIngredients: (value: string)=>void;
}

export const useFilters=():ReturnProps=>{
  const serchParams=useSearchParams() as unknown as Map<keyof QueryFilters, string>
  

  const {ingredients, loading}=useIngredients(
    serchParams.get('selectedIngredients')?.split(','))
  
  const [sizes, { toggle: toogleSizes }] = useSet(new Set<string>(
    serchParams.get('sizes')?.split(',')));

  const [pizzaTypes, { toggle: tooglePizzaTypes }] = useSet(new Set<string>(
    serchParams.get('pizzaTypes')?.split(',')));

  const [selectedIngredients, { toggle:toggleIngredients }] = useSet(new Set<string>(
    serchParams.get('selectedIngredients')?.split(',')
  ));

  const [prices, setPrices]=React.useState<PriceProps>({
    priceFrom:  Number(serchParams.get('priceFrom')) || undefined,
    priceTo:  Number(serchParams.get('priceTo')) || undefined
  })

  const updatePrices=(name: keyof PriceProps, value: number)=> {
    setPrices(prev=>({
      ...prev,
      [name]: value,
    }))
  }

  

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrices,
    setPizzaTypes: tooglePizzaTypes,
    setSizes: toogleSizes,
    setSelectedIngredients: toggleIngredients,
  }
}