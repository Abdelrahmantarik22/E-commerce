'use client'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addWishlist } from '@/app/apis/addWishlist';
import { wishproduct } from '@/interfaces/wishlist';
import { deletWishItem } from '@/app/apis/deleteWishlist';

export default function WishlistBtn({id}:{id:string}) {
  const queryClient =useQueryClient()
    const notifySuccess = () => toast.success(" Product added successfully to Wishlist" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});
  const{data:wishProducts}=useQuery<wishproduct>({queryFn:async()=>{const res =await fetch('/api/wishlist')
          const payload=await res.json()
          return payload
      },queryKey:['wishlist']})

  const notifyError = () => toast.error(" Login first !" ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });

    
    const{mutate}=useMutation({mutationFn:addWishlist,
        onSuccess:()=>{
            notifySuccess()
                  queryClient.invalidateQueries({ queryKey: ['wishlist'] })

        },onError:()=>{
            notifyError()
        }
    })
    const{mutate:deleteMutate}=useMutation({mutationFn:deletWishItem,
        onSuccess:()=>{
                  queryClient.invalidateQueries({ queryKey: ['wishlist'] })

        },onError:()=>{
            notifyError()
        }
    })
 const alreadyInWishlist = wishProducts?.data?.some(
      (item) => item._id === id
    )
 function Action(productId: string) {
    if (alreadyInWishlist) {
      deleteMutate(productId);
    } else {
      mutate(productId);
    }
  }
    
  return (
    <div>
<i onClick={(e)=>{e.preventDefault()
    Action(id)}} className={`${alreadyInWishlist?'fa-solid fa-heart' :'fa-regular fa-heart'} text-red-800 text-2xl`}></i>
    </div>
  )
}
