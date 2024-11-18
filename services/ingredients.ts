// метод для получения продуктов

import { axiosInstance } from "./instance"
import { ApiRoutes } from "./costants"
import { Ingridient } from "@prisma/client"

export const getAll =async (): Promise<Ingridient[]> => {
  const {data}=await axiosInstance.get<Ingridient[]>(ApiRoutes.INGREDIENTS)

  return data
}