import { cn } from '@/lib/utils';
import React from 'react'
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';

interface Props {
  className?:string;
} 

export const Header:React.FC<Props>=({className})=> {
  return (
    <div className={cn('border border-b',className)}>
      <Container className='flex items-center py-8 justify-between'>

        {/*left side*/}

        <Link href='/'>
        <div className='flex items-center gap-4'>
          <Image src='/assets/img/logo.png' alt='logo' width={35} height={35} />
          <div>
          <h1 className='uppercase text-2xl font-black'>pizza</h1>
          <p className='text-sm text-gray-400 leading-3'>вкуснее не бывает</p>
        </div>
        </div>
        </Link>

        <div className='flex-1 mx-10'>
          <SearchInput />
        </div>

        {/*right side*/}
        <div className='flex gap-3'>
          <Button variant='outline' className='gap-1 flex items-center g'>
          <User size={16} />
            Войти
          </Button>
          <div>
           <Button  className='group relative'>
            <b>520 лей </b>
            <span className='h-full w-[1px] bg-white/30 mx-3'></span>
            <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
              <ShoppingCart size={16} className='relative' strokeWidth={2}/>
              <b>3</b>
            </div>
            <ArrowRight className='absolute w-5 right-5 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300'/>
           </Button>
          </div>
        </div>


       

      </Container>
      
    </div>
  )
}
