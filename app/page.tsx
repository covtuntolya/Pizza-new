//'use client'

import Image from "next/image";
import { Button } from "@/components/ui";
import { Container, Filters, ProductCard, ProductsGroupList, SortPopup, Title, TopBar } from "@/components/shared";
import { Categories } from "@/components/shared/categories";

export default function Home() {
  return (
    <>
      <Container className="mt-8">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
        
      </Container>
      <TopBar />
      <Container className="flex mt-10 gap-[80px]">
        {/*фильтрция*/}
        <div className="w-[250px]">
          <Filters/>
        </div>
        {/*Список товаров*/}
        <div className="flex-1">
        <div className="flex flex-col gap-16">
          <ProductsGroupList 
            categoryId={1}
            title='Пиццы'
            items={[{
              id:1,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:2,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:3,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:4,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:5,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            }
          ]}
          />
          <ProductsGroupList 
            categoryId={2}
            title='Комбо'
            items={[{
              id:1,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:2,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:3,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:4,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            },
            {
              id:5,
              name:'Сырный циплёнок',
              price:120,
              imageUrl:"https://media.dodostatic.net/image/r:233x233/11EE7D610E8BBB248F31270BE742B4BD.avif",
              items:[{price:120}]
            }
          ]}
          />
          
            
          
        </div>
        </div>
      </Container>
    </>
  );
}
