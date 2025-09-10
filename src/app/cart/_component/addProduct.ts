'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth"

export async function addProduct(productId:string) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`${process.env.API}/cart`,{
    cache:'no-store',
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        token:token
    },
    body:JSON.stringify({productId})
})

const payload=await res.json()

return payload
}