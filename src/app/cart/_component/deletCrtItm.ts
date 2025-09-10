'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth"

export async function deletProduct(productId:string) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`${process.env.API}/cart/${productId}`,{
    cache:'no-store',
    method:'DELETE',
    headers:{
        token:token
    },
   
})

const payload=await res.json()

return payload
}