import { Api } from "@/services/api-client"
import React from "react"

type IngredientItem = {
  value: string,
  text: string,
}

interface ReturnProps {
  ingredients: IngredientItem[],
  loading: boolean,
}

export const useIngredients=(values: string[]=[]) : ReturnProps=> {

  const [ingredients, setIngredients]=React.useState<ReturnProps['ingredients']>([])
  const [loading, setLoading]=React.useState(false)

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

  return {ingredients, loading}
}