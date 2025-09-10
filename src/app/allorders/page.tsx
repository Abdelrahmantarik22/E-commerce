'use client'
import { Button } from '@/components/ui/button'
import { Cart } from '@/interfaces/cart.interface'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'




export default function Page() {
  
 const{data:cartProducts}=useQuery<Cart>({queryFn:async()=>{const res =await fetch('/api/cart')
        const payload=await res.json()
        return payload
    },queryKey:['cart']})



  return (
    <div className='h-100 w-full flex justify-center items-center'>
{cartProducts?.numOfCartItems&&cartProducts?.numOfCartItems>0?
      <div className='flex flex-col items-center gap-7  '>
<i className="fa-solid fa-money-check-dollar text-7xl text-green-800"></i>
<div className='flex flex-col items-center gap-5'>
  <h2 className='text-black dark:text-white font-bold text-2xl'>Your  Order need be Confirmed </h2>
<p className='text-gray-400'>Thank you for your order</p>
</div>
<Button className='bg-main text-black dark:text-white hover:bg-main'><Link href={`/checkout/${cartProducts.cartId}`}> Go to Check Out</Link></Button>

      </div>

:

   <div className='flex flex-col items-center gap-7  '>
<i className="fa-solid fa-circle-check text-7xl text-green-800"></i>
<div className='flex flex-col items-center gap-5'>
  <h2 className='text-black dark:text-white font-bold text-2xl'>Order Confirmed</h2>
<p className='text-gray-400'>Thank you for your order</p>
</div>
<Button className='bg-main text-black dark:text-white hover:bg-main'><Link href={'/product'}> Continue Shopping</Link></Button>

      </div>
}
    </div>
  )
}
