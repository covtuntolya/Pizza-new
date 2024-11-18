import { hashSync } from "bcrypt";
import prisma from "./prisma-client";
import { categories, ingredients, products } from "./constants";

async function Up() {

  await prisma.user.createMany({
    data : [
      {
        fullName: 'User-Test',
        email: 'user-test@gmail.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin-Test',
        email: 'admin-test@gmail.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ]
  })

  await prisma.category.createMany({
    data: categories
  })

  await prisma.ingridient.createMany({
    data: ingredients
  })

  await prisma.product.createMany({
    data: products
  })

  const pizza1=await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
      categoryId: 1,
      ingridients: {
        connect: ingredients.slice(0, 5)
      }
    }
  })

  const pizza2=await prisma.product.create({
    data: {
      name: 'Сырная 🌱👶',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
      categoryId: 1,
      ingridients: {
        connect: ingredients.slice(5, 10)
      }
    }
  })

  const pizza3=await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61706D472F9A5D71EB94149304.avif',
      categoryId: 1,
      ingridients: {
        connect: ingredients.slice(10, 30)
      }
    }
  })

  await prisma.productItem.createMany({
    data: [
      {
       productId: pizza1.id,
       price: 115,
       pizzaType: 1,
       size: 20,
      },
      {
        productId: pizza1.id,
        price: 115,
        pizzaType: 1,
        size: 20,
       },
       {
        productId: pizza1.id,
        price: 120,
        pizzaType: 2,
        size: 30,
       },
       {
         productId: pizza1.id,
         price: 120,
         pizzaType: 2,
         size: 30,
        },
        {
          productId: pizza1.id,
          price: 130,
          pizzaType: 2,
          size: 40,
         },
         {
          productId: pizza2.id,
          price: 115,
          pizzaType: 1,
          size: 20,
         },
         {
          productId: pizza2.id,
          price: 120,
          pizzaType: 1,
          size: 30,
         },
         {
          productId: pizza2.id,
          price: 130,
          pizzaType: 1,
          size: 40,
         },
         {
          productId: pizza2.id,
          price: 115,
          pizzaType: 2,
          size: 20,
         },
         {
          productId: pizza2.id,
          price: 120,
          pizzaType: 2,
          size: 30,
         },
         {
          productId: pizza2.id,
          price: 130,
          pizzaType: 3,
          size: 40,
         },
         {
          productId: pizza3.id,
          price: 115,
          pizzaType: 1,
          size: 20,
         },
         {
          productId: pizza3.id,
          price: 120,
          pizzaType: 2,
          size: 30,
         },
         {
          productId: pizza3.id,
          price: 130,
          pizzaType: 2,
          size: 40,
         },
         {
          productId: 1,
          price: 45,
         },
         {
          productId: 2,
          price: 20,
         },
         {
          productId: 3,
          price: 23,
         },
         {
          productId: 4,
          price: 15,
         },
         {
          productId: 5,
          price: 20,
         },
         {
          productId: 6,
          price: 15,
         },
         {
          productId: 7,
          price: 20,
         },
         {
          productId: 8,
          price: 25,
         },
         {
          productId: 9,
          price: 25,
         },
         {
          productId: 10,
          price: 20,
         },
         {
          productId: 11,
          price: 22,
         },
         {
          productId: 12,
          price: 28,
         },
         {
          productId: 13,
          price: 20,
         },
         {
          productId: 14,
          price: 15,
         },
         {
          productId: 15,
          price: 15,
         },
         {
          productId: 16,
          price: 20,
         },
         {
          productId: 17,
          price: 18,
         },
    ]
  })

  await prisma.cart.createMany(
    {
      data: [
        {
          userId: 1,
          totalAmount: 0,
          token: '111111'
        },
        {
          userId: 2,
          totalAmount: 0,
          token: '222222'
        },
      ]
    }
  )

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{id:1}, {id: 2}, {id: 3}, {id:4}]
      }

    }
  })


}

async function Down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingridient" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`
}

async function main() {
  try {
    await Down()
    await Up()
  } catch (e) {
    console.error(e);

  }
}

main()
  .then(async()=> {
    await prisma.$disconnect()
  })
  .catch(async(e)=> {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })