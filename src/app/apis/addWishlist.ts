'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth"

export async function addWishlist(productID:string) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`${process.env.API}/wishlist`,{
    cache:'no-store',
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        token:token
    },
    body:JSON.stringify({
      productId:productID
    })
})

const payload=await res.json()

return payload
}