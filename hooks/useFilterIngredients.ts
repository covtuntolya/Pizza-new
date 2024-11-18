import { Api } from "@/services/api-client"
import { Ingridient } from "@prisma/client"
import React from "react"
import { useSet } from "react-use"

type IngredientItem = {
  value: string,
  text: string,
}

interface ReturnProps {
  ingredients: IngredientItem[],
  loading: boolean,
  selectedIds: Set<string>,
  onAddId: (id: string)=> void,
}

export const useFilterIngredients=(values: string[]=[]) : ReturnProps=> {
  console.log('values', values);
  

  const [ingredients, setIngredients]=React.useState<ReturnProps['ingredients']>([])
  const [loading, setLoading]=React.useState(false)

  const [selectedIds, { toggle }] = useSet(new Set<string>(values));


  React.useEffect(()=> {
    async function getIngredients() {
      try {
        setLoading(true)
        const ingredients=await Api.ingredients.getAll()
        setIngredients(ingredients.map(ingredient=>({value: String(ingredient.id), text: ingredient.name})))
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    getIngredients()
  }, [])

  return {ingredients, loading, onAddId: toggle, selectedIds}
}