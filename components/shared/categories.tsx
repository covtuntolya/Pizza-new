'use client'

import { cn } from '@/lib/utils';
import React from 'react'

import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';

interface Props {
  cats: Category[];
  className?:string;
} 

export const Categories:React.FC<Props>=({cats, className})=> {
  
//  const cats=[
//    {id: 1, name: 'Пиццы' },
//    {id: 2, name: 'Комбо'},
//    {id: 3, name: 'Закуски'},
//    {id: 4, name: 'Коктейли'},
//    {id: 5, name: 'Кофе'},
//    {id: 6, name: 'Напитки'},
//    {id: 7, name: 'Десерты'},
//]
  const activeIndex=useCategoryStore(state=>state.activeId)

  return (
    <div className={cn('inline-flex gap-1 p-1 bg-gray-50 rounded-2xl', className)}>
      {
        cats.map((cat, index)=> (
          <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5', 
            activeIndex===cat.id && 'bg-white shadow-md shadow-gray-200 text-primary '
          )}
           key={cat.id}
           href={`/#${cat.name}`}
           >
            
            <button>{cat.name}</button>
            
          </a>
        ))
      }
    </div>
  )
}
