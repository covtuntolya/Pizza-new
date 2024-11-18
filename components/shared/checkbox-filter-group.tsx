import React from 'react'
import { FilterChecboxProps, FilterCheckBox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';
import { log } from 'console';

type Item=FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string;
  selectedIds?: Set<string> 
  className?:string;
  name?:string;
  loading?: boolean;
} 

export const ChecboxFilterGroup:React.FC<Props>=({
  title,
  items,
  defaultItems,
  limit=5,
  searchInputPlaceholder='Поиск...',
  onClickCheckbox,
  defaultValue,
  selectedIds,
  className,
  name,
  loading=false,
})=> {
  const [showAll, setShowAll]=React.useState(false)
  const [searchValue, setSearchValue]=React.useState('')

  const list=showAll ? 
    items.filter(item=>item.text.toLowerCase().includes(searchValue.toLowerCase())) 
    : (defaultItems || items).slice(0, limit)

  const onChangeSearchInput=(e: React.ChangeEvent<HTMLInputElement>)=> {
    setSearchValue(e.target.value)
  }
  const onButtonClick=()=> {
    setShowAll(!showAll)
    setSearchValue('')
  }

  {if (loading) return (

    <div className={className}>
      <p className='font-bold mb-6'>{title}</p>
      {
        Array(limit).fill(0).map((_, ind)=> (
          <Skeleton key={ind } className="w-full mb-4 h-[20px] rounded-[8px]"/>
          
        ))
      }
      <Skeleton className="w-[150px] mt-2 mb-4 h-[20px] rounded-[8px]"/>
      
    </div>
  )}

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>
      <div className='mb-5'>
        {showAll && <Input placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' 
        onChange={onChangeSearchInput}/>}
      </div>
      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {
          list.map((item, index)=> (
            <FilterCheckBox 
              key={index}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={selectedIds?.has(item.value)}
              onCheckedChange={()=>onClickCheckbox?.(item.value)}
              name={name}
              
            />
          ))
        }
      </div>
        {items.length > limit && (
          <button className='text-primary mt-5' onClick={()=>onButtonClick()}>{showAll ? 'Скрыть' : '+ Показать все'}</button>
        )}
    </div>
  )
}
