//'use client'

import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
import prisma from "@/prisma/prisma-client";

export default async function Home() {

  const categories= await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingridients: true,
        }
      }
    }
  })


  return (
    <>
      <Container className="mt-8">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
        
      </Container>
      <TopBar categories={categories.filter((category)=>(
          category.products.length>0
      ))} />
      <Container className="flex mt-10 gap-[80px]">
        {/*фильтрция*/}
        <div className="w-[250px]">
          <Filters/>
        </div>
        {/*Список товаров*/}
        <div className="flex-1">
        <div className="flex flex-col gap-16">
          {
            categories.map(category=>(
              category.products.length>0 && (
                <ProductsGroupList 
                 key={category.id}
                 categoryId={category.id}
                 title={category.name}
                 items={category.products}
          />
              )
            ))
          }
           
        </div>
        </div>
      </Container>
    </>
  );
}
