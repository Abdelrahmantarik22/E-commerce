'use client'
import React from 'react'
import { addProduct } from '@/app/cart/_component/addProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function ProductBtn({id}:{id:string}) {
  const queryClient =useQueryClient()
    const notifySuccess = () => toast.success(" Product added successfully to your cart" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});
  const notifyError = () => toast.error(" Login first !" ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });
    
    const{mutate}=useMutation({mutationFn:addProduct,
        onSuccess:()=>{
            notifySuccess()
                  queryClient.invalidateQueries({ queryKey: ['cart'] })

        },onError:()=>{
            notifyError()
        }
    })

    
  return (
    <div>
      <i onClick={(e)=>{ e.preventDefault()  ;mutate(id)}} className='fa-solid fa-cart-shopping text-2xl text-green-800' ></i>

    </div>
  )
}
