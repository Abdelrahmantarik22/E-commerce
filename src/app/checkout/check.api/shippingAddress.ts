'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth"

export async function goToPayment({cartId,details,phone,city}:{cartId:string|undefined,details:string,phone:string,city:string}) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,{
    cache:'no-store',
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        token:token
    },
   body: JSON.stringify({
  shippingAddress: {
    details,
    phone,
    city,
  },
})
})

const payload=await res.json()

return payload
}


//=======================================================================================================================

export async function goToOfflinePayment({cartId,details,phone,city}:{cartId:string|undefined,details:string,phone:string,city:string}) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    cache:'no-store',
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        token:token
    },
   body: JSON.stringify({
  shippingAddress: {
    details,
    phone,
    city,
  },
})
})

const payload=await res.json()

return payload
}