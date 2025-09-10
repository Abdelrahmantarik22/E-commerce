'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth"

export async function upateDataApi({name, email, phone}:{name:string,email:string,phone:string}) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`${process.env.API}/users/updateMe/`,{
    cache:'no-store',
    method:'PUT',
    headers:{
        'Content-Type':'application/json',
        token:token
    },
    body:JSON.stringify({
         name,
    email,
    phone
    })
})

const payload=await res.json()

return payload
}