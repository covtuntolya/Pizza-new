'use client'

import React from 'react'
import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';

import { useCategoryStore } from '@/store/category';

import { useIntersection } from 'react-use';

interface Props {
  categoryId: number;
  title: string;
  items: any;
  listClassName?: string;
  className?:string;
} 

export const ProductsGroupList:React.FC<Props>=({categoryId, title, items, listClassName, className})=> {

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  const {setActiveId}=useCategoryStore()

  React.useEffect(()=> {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId)
    }
    
  }, [intersection?.isIntersecting, title, categoryId])

  return (
    <div className={className} ref={intersectionRef} id={title}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {
          items.map((product:any, i:number)=> (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}

            />
          ))
        }

      </div>

    </div>
  )
}
