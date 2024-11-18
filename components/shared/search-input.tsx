'use client'

import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React  from 'react'

import {useClickAway, useDebounce} from 'react-use';

interface Props {
  className?:string;
} 

export const SearchInput:React.FC<Props>=({className})=> {
  const [focused, setFocused]=React.useState(false)
  const [searchQuery, setSearchCuery]=React.useState('')
  const [products, setProducts]=React.useState<Product[]>([])
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(()=> {
  Api.products.search(searchQuery)
  .then(respons=>{setProducts(respons)})
  .catch(error=>console.log(error)
  )
  }, 250, [searchQuery])

  const onClickLink=()=>{
    setFocused(false)
    setProducts([])
    setSearchCuery('')
  }

  return (
    <>
      {focused && <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-30' />}

      <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
      <Search  className='absolute top-1/4 traslate-y-[-50%] left-3 h-5 text-gray-400'/>
      <input
        value={searchQuery}
        onChange={(e)=>setSearchCuery(e.target.value)}
        className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
        type='text'
        placeholder='Найти пиццу...'
        onFocus={()=>setFocused(true)}
      />

      {products.length>0 && 
        <div className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
          focused && 'visible opacity-100 top-12'
        )}>
          {
            products.map(product=>(
             <Link onClick={()=>onClickLink()} key={product.id} href={`/product/${product.id}`} className='flex gap-2 items-center px-2  hover:bg-primary/10'>
              <img 
                className='rounded-sm h-8 w-8'
                 src={product.imageUrl} 
                 alt={product.name}
              />
              <div >
                 {product.name}
              </div>
             </Link>
            ))
          }
        </div>
      }

    </div>
    </>
  )
}
