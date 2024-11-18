'use client'

import React, { useState } from 'react'
import { Title } from './title';
import { Input, RangeSlider } from '../ui';
import { ChecboxFilterGroup } from './checkbox-filter-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';

import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  className?:string;
} 

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaType: string;
  sizes: string;
  selectedIds: string;
}

export const Filters:React.FC<Props>=({className})=> {

  const router=useRouter()
  const serchParams=useSearchParams() as unknown as Map<keyof QueryFilters, string>
  //console.log(serchParams, 999);
  
  const {ingredients, loading, onAddId, selectedIds}=useFilterIngredients(
    serchParams.get('selectedIds')?.split(','))

  const [prices, setPrice]=React.useState<PriceProps>({
    priceFrom:  Number(serchParams.get('priceFrom')) || undefined,
    priceTo:  Number(serchParams.get('priceTo')) || undefined
  })
  
  
  const [sizes, { toggle: toogleSizes }] = useSet(new Set<string>(serchParams.get('sizes')?.split(',')));
  const [pizzaType, { toggle: toogleType }] = useSet(new Set<string>(serchParams.get('pizzaType')?.split(',')));
  //console.log('type', pizzaType);

  const updatePrice=(name: keyof PriceProps, value: number)=> {
    setPrice({
      ...prices,
      [name]: value,
    })
  }

  React.useEffect(()=>{
    
    const filters={
      ...prices, 
      selectedIds: Array.from(selectedIds), 
      sizes: Array.from(sizes), 
      pizzaType: Array.from(pizzaType),
    }
    const query=(qs.stringify(filters, {
      arrayFormat: 'comma',
    }))

    router.push(`?${query}`, {
      scroll: false
    })

  }, [selectedIds, prices, sizes, pizzaType ])
  
  return (
    <div className={className}>
      <Title text='Фильтрация' className='font-bold mb-5'/>

      <ChecboxFilterGroup 
          name='types'
          className='mb-5'
          title='Тип теста' 
          onClickCheckbox={toogleType}
          selectedIds={pizzaType}
          items={[
            {text: 'тонкое', value: '1'},
            {text: 'толстое', value: '2'},
          ]}
        />
      <ChecboxFilterGroup 
          name='sizes'
          className='mb-5'
          title='Размер' 
          onClickCheckbox={toogleSizes}
          selectedIds={sizes}
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
            value={prices.priceFrom || 0}
            onChange={(e)=>updatePrice('priceFrom', Number(e.target.value))}
          >
          </Input>
          <Input 
            type='number' 
            min={0} 
            max={250} 
            placeholder='250' 
            value={prices.priceTo || 0}
            onChange={(e)=>updatePrice('priceTo', Number(e.target.value))}
          >
          </Input>
        </div>
        <RangeSlider min={0} max={250} step={10} 
          value={[prices.priceFrom || 0, prices.priceTo || 250]}
          onValueChange={([from, to])=>setPrice({priceFrom: from, priceTo: to})}  />
        <ChecboxFilterGroup 
          className='mt-10' 
          title='Ингредиенты:' 
          limit={6} 
          defaultItems={ingredients.slice(0,6)}
          items={ingredients}
          loading={loading}
          onClickCheckbox={onAddId}
          selectedIds={selectedIds}
          name='ingredients'
        />
          
        </div>
        <div style={{height:'300px'}}></div>
    </div>
  )
}
