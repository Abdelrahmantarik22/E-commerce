'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth"

export async function reChangePassword({currentPassword, password, rePassword}:{currentPassword:string,password:string,rePassword:string}) {
 
const token=await getTokenAuth()  

if(!token){
    throw new Error('logIn first')
}


const res =await fetch(`${process.env.API}/users/changeMyPassword`,{
    cache:'no-store',
    method:'PUT',
    headers:{
        'Content-Type':'application/json',
        token:token
    },
    body:JSON.stringify({
         currentPassword,
    password,
    rePassword
    })
})

const payload=await res.json()

return payload
}