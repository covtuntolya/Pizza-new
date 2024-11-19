'use client'

import React, { useState } from 'react'
import { Title } from './title';
import { Input, RangeSlider } from '../ui';
import { ChecboxFilterGroup } from './checkbox-filter-group';
import { useIngredients } from '@/hooks/use-ingredients';

import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilters } from '@/hooks/use-filters';
import { useQueryFilters } from '@/hooks/use-query-filters';

interface Props {
  className?:string;
} 

export const Filters:React.FC<Props>=({className})=> {

  const router=useRouter()

  const {ingredients, loading}=useIngredients();
  const filters=useFilters()
  useQueryFilters(filters)

  const updatePrices=(prices: number[])=> {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])

  }

  return (
    <div className={className}>
      <Title text='Фильтрация' className='font-bold mb-5'/>

      <ChecboxFilterGroup 
          name='types'
          className='mb-5'
          title='Тип теста' 
          onClickCheckbox={filters.setPizzaTypes}
          selectedIds={filters.pizzaTypes}
          items={[
            {text: 'тонкое', value: '1'},
            {text: 'толстое', value: '2'},
          ]}
        />
      <ChecboxFilterGroup 
          name='sizes'
          className='mb-5'
          title='Размер' 
          onClickCheckbox={filters.setSizes}
          selectedIds={filters.sizes}
          items={[
            {text: '20 см', value: '20'},
            {text: '30 см', value: '30'},
            {text: '40 см', value: '40'}
          ]}
        />
        

        <div className='mt-5 border-y border-y-neutral-100 pt-6 pb-7'>
        <p className='font-bold mb-5'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input 
            type='number' 
            placeholder='0' 
            min={0} max={250} 
            value={filters.prices.priceFrom || 0}
            onChange={(e)=>filters.setPrices('priceFrom', Number(e.target.value))}
          >
          </Input>
          <Input 
            type='number' 
            min={0} 
            max={250} 
            placeholder='250' 
            value={filters.prices.priceTo || 0}
            onChange={(e)=>filters.setPrices('priceTo', Number(e.target.value))}
          >
          </Input>
        </div>
        <RangeSlider min={0} max={250} step={10} 
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 250]}
          onValueChange={updatePrices}  />
        <ChecboxFilterGroup 
          className='mt-10' 
          title='Ингредиенты:' 
          limit={6} 
          defaultItems={ingredients.slice(0,6)}
          items={ingredients}
          loading={loading}
          onClickCheckbox={filters.setSelectedIngredients}
          selectedIds={filters.selectedIngredients}
          name='ingredients'
        />
          
        </div>
        <div style={{height:'300px'}}></div>
    </div>
  )
}
