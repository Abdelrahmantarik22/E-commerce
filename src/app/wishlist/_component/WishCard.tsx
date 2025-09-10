import { deletWishItem } from '@/app/apis/deleteWishlist';
import { WishData } from '@/interfaces/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function WishCard({prod}:{prod:WishData}) {
    const queryClient=useQueryClient()
    const {mutate}=useMutation({mutationFn:deletWishItem,
        onSuccess:()=>{
queryClient.invalidateQueries({queryKey:['wishlist']})
        }
    })
    function deletItem(productID:string){
        mutate(productID)
    }
    
  return (
<div>
    <Link href={`/product/${prod._id}`}><div
    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-lg border shadow-md bg-white dark:bg-gray-800 my-4"
  >
    {/* Product */}
    <div className="flex items-center gap-4">
      <Image
        src={prod.imageCover}
        width={80}
        height={80}
        className="rounded-lg object-cover"
        alt={prod.title}
      />
      <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
        {prod.title}
      </h2>
    </div>

    {/* Price */}
    <div className="text-gray-700 dark:text-gray-300">
      {prod.price} EGP
    </div>

    {/* Stock Status */}
   <div className="text-gray-700 dark:text-gray-300">
{`${prod.quantity>0?'In Stock':'Out Of Stock'}`}
    </div>

    {/* Actions */}
    <div>
      <span className="text-red-600  hover:text-red-700 rounded-lg cursor-pointer" 
      onClick={(e)=>{e.preventDefault()
        deletItem(prod._id)
        
      }}>
<i className='fa-solid fa-trash'></i>
      </span>
    </div>
  </div></Link>
</div>
  )
}
