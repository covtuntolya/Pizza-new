import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react'

interface Props {
  className?:string;
} 

export const SortPopup:React.FC<Props>=({className})=> {
  return (
    <div className={cn('inline-flex gap-1 items-center bg-gray-50 px-5 h-[52px] rounded-2xl cursor-poinetr', className)}>
      <ArrowUpDown size={16} />    
      <b>сортировка:</b> 
      <b className='text-primary'>популярное</b>
    </div>
  )
}