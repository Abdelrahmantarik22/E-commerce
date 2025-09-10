
'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Cart } from '@/interfaces/cart.interface'
import Loading from '@/app/_components/Loading'
import { deletProduct } from './deletCrtItm'
import toast from 'react-hot-toast'
import { clearCart } from './Clearusercart'
import Link from 'next/link'
import {updateQuan } from './updateQuanCart'

export default function CartComp() {
  const queryClient =useQueryClient()
const [deId,setDeId]=useState('')
const [upd,setUpd]=useState('')


  const notifySuccess = () => toast.success(" Product deleted successfully from your cart" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});
  const notifySucces = () => toast.success(" Products deleted successfully from your cart" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});
  const{mutate,isPending:deletLoad}=useMutation({mutationFn:deletProduct,
    onSuccess:()=>{
      
      notifySuccess()
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }})
  const{mutate:clearcart ,isPending:deletLoa}=useMutation({mutationFn:clearCart,
    onSuccess:()=>{
      notifySucces()
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }})


  const{mutate:updatequan,isPending }=useMutation({mutationFn:updateQuan,
    onSuccess:()=>{
    
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }})
    

  




    const{data:cartProducts,isLoading}=useQuery<Cart>({queryFn:async()=>{const res =await fetch('/api/cart')
        const payload=await res.json()
        return payload
    },queryKey:['cart']})



      if (isLoading) {
          return <Loading></Loading>
      }
     
      function deletItem(productId:string){
mutate(productId)
      }
 
      if (cartProducts?.data?.products.length==0) {
        return(
          <div className='w-full h-full flex justify-center items-center flex-col gap-5'>
          <i className="fa-solid fa-cart-shopping text-9xl text-main"></i>
          <div className='flex flex-col  items-center gap-4'>
            <p className='font-bold text-xl'>Your Cart is Empty !</p>
            <p className='text-gray-500'>Add something to make me happy</p>
            <Link className='bg-main py-2 px-4 rounded-lg text-white' href={'/'} >Continue Shopping</Link>
          </div>
        </div>
)
}else{




 
  
  return (
    <div>
      <div className='w-full flex justify-center items-center  mt-5'>
      <h2 className='text-3xl font-bold '>Your Cart({cartProducts?.numOfCartItems})</h2>
      </div>
<div className="space-y-4 my-5">

<div className="hidden md:grid grid-cols-4 gap-4 px-4 py-2 font-semibold text-gray-700 dark:text-white border-t">
  <div>Product</div>
  <div>Price</div>
  <div>Quantity</div>
  <div>Actions</div>
</div>


  {cartProducts &&
    cartProducts?.data?.products.map((prod) => (
  


<div
    key={prod._id}
    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-lg border shadow-md bg-white dark:bg-gray-800"
  >
    {/* Product */}
    <div className="flex items-center gap-4">
      <Image
        src={prod.product.imageCover}
        width={80}
        height={80}
        className="rounded-lg object-cover"
        alt={prod.product.title}
      />
      <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
        {prod.product.title}
      </h2>
    </div>

    {/* Price */}
    <div className="text-gray-700 dark:text-gray-300">
      {prod.price} EGP
    </div>

    {/* Quantity */}
    <div className="flex items-center gap-3">
      {/* Minus */}
      <button onClick={()=>{updatequan({productId:prod.product._id,count:prod.count-1})
    setUpd(prod.product._id)}} className="cursor-pointer h-7 w-7 flex items-center justify-center border rounded-full hover:bg-gray-100 dark:border-gray-600">
        <i className="fa-solid fa-minus text-xs"></i>
      </button>

      {/* Count */}       
  <span className='border py-1 px-3 rounded-lg'>{isPending&&upd==prod.product._id?<i className='fa-solid fa-spin fa-spinner'></i>:prod.count}</span>

      {/* Plus */}
      <button onClick={()=>{updatequan({productId:prod.product._id,count:prod.count+1}) 
      setUpd(prod.product._id)}} className="cursor-pointer h-7 w-7 flex items-center justify-center border rounded-full hover:bg-gray-100 dark:border-gray-600">
        <i className="fa-solid fa-plus text-xs"></i>
      </button>
    </div>

    {/* Actions */}
    <div>
      <span className="text-red-600  hover:text-red-700 rounded-lg cursor-pointer" 
      onClick={()=>{deletItem(prod.product._id)
         setDeId(prod.product._id)
      }}>
        {deletLoad&&deId==prod.product._id?<i className='fa-solid fa-spin fa-spinner'></i>:<i className={`fa-solid fa-trash`}></i>}

      </span>
    </div>
  </div>



    ))}
</div>

{cartProducts?.data?.products.length!=0&&<div className='w-full flex items-center  justify-center my-10 p-5 rounded-lg border shadow-md'>
  <div className='flex w-full flex-col justify-center items-center '> 
      <p className=' text-gray-400'><span className='font-bold text-black'>Total :</span> {cartProducts?.data?.totalCartPrice} EGP</p>

      <div className='flex md:flex-row flex-col items-center gap-3'>
      <Button className='text-white bg-green-800 m-5 hover:bg-green-900 cursor-pointer'><Link href={`/checkout/${cartProducts?.cartId}`}>Check Out</Link></Button>
     <Button className="bg-red-600 text-white hover:bg-red-700 rounded-lg cursor-pointer justify-self-start w-[120.275px]" onClick={()=>clearcart()} >
        {deletLoa?<i className='fa-solid fa-spin fa-spinner'></i>:<> <i className={`fa-solid fa-trash`}></i>Clear Cart   </>}

      </Button>

      </div>
      
  </div>
</div>}

    </div>
 

)
}
}
