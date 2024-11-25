import React from "react"
import { Filters } from "./use-filters"
import qs from "qs"
import { useRouter } from "next/navigation"


export const useQueryFilters=(filters:Filters)=> {
  const router=useRouter()

  React.useEffect(()=>{
    
    const params={
      ...filters.prices, 
      selectedIngredients: Array.from(filters.selectedIngredients), 
      sizes: Array.from(filters.sizes), 
      pizzaTypes: Array.from(filters.pizzaTypes),
    }

    const query=(qs.stringify(params, {
      arrayFormat: 'comma',
    }))
  
    router.push(`?${query}`, {
      scroll: false,
    })
  
  }, [filters.prices, filters.selectedIngredients, filters.sizes, filters.pizzaTypes,  router])
}