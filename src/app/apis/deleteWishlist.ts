'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth"

export async function deletWishItem(productID:string) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`${process.env.API}/wishlist/${productID}`,{
    cache:'no-store',
    method:'DELETE',
    headers:{
        'Content-Type':'application/json',
        token:token
    }
   
})

const payload=await res.json()

return payload
}