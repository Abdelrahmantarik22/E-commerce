'use client'
import { wishproduct } from '@/interfaces/wishlist'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import WishCard from './WishCard'
import Link from 'next/link'

export default function WishComp() {

const{data:wishProducts}=useQuery<wishproduct>({queryFn:async()=>{const res =await fetch('/api/wishlist')
        const payload=await res.json()
        return payload
    },queryKey:['wishlist']})

if (wishProducts?.count===0) {
  return(
     <div className='w-full h-full flex justify-center items-center flex-col gap-5'>
            <i className="fa-solid fa-heart-broken text-9xl text-main"></i>
          <div className='flex flex-col  items-center gap-4'>
            <p className='font-bold text-xl'>Your Wishlist is Empty !</p>
            <p className='text-gray-500'>Add something to make me happy</p>
            <Link className='bg-main py-2 px-4 rounded-lg text-white' href={'/product'} >Add Some Product</Link>
          </div>
        </div>
        
  )
}
else{

  
  return (
    <div>
  <div className="hidden md:grid grid-cols-4 gap-4 px-4 py-2 font-semibold text-gray-700 dark:text-white border-t">
  <div>Products</div>
  <div>Price</div>
  <div>Stock Status</div>
  <div>Actions</div>
</div>
{ wishProducts?.data.map((prod)=> <WishCard prod={prod} key={prod._id}></WishCard>)}    
      </div>
  )
}
}
