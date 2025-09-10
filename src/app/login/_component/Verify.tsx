'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ResetPass from './ResetPass'

export default function Verify() {
    const [reset,setReset]=useState(false)

  const notifySuccess = () => toast.success(" Code sent" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});

  const notifyError = () => toast.error("There is no user registered with this email address " ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });

    const form=useForm({
        defaultValues:{
            resetCode:""
        }
    })


async function onSubmit(data:{resetCode:string}){
    const msg=await verifyCode(data.resetCode)
    
    if (msg.status==="Success") {
        notifySuccess()
    setReset(true)
    }else{
notifyError()
    }
    

}

  return (
    <div>
   {reset? <ResetPass></ResetPass>   :  <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-5">
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Verify Code</h2>
       
           <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder="Enter Your Reset Code" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
              <div className='flex md:flex-row flex-col gap-3'>
                  <Button className='bg-main py-2 px-4 mx-auto  w-full self-center' type="submit">Reset Password</Button>

              </div>
</form>
</Form>}
    </div>
  )
}



export async function verifyCode(resetCode:string) {
try {
       const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
    {
        cache:'no-store',
        method:'POST',
        headers:{
              "Content-Type": "application/json",
    },
    body:JSON.stringify({
        resetCode:resetCode
    })

    }
   ) 
    const payload = await res.json();

  return payload;
}  catch (error) {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Something went wrong");
  }
}

}