'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem,  FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Verify from './Verify'
import { useForget } from '@/app/context/ForgetContext'





export default  function PasswordReset() {
    const { setForget } = useForget();
    const[code,setCode]=useState(false)
  const notifySuccess = () => toast.success("Correct Reset Code" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});

  const notifyError = () => toast.error("Incorrect Reset Code" ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });


const form=useForm({
    defaultValues:{
        email:''
    }
})

async function onSubmit(data:{email:string}){
    const msg=await sendCode(data.email)
    
    if (msg.statusMsg==='success') {
        notifySuccess()
    data.email=''
    setCode(true)
    }else{
notifyError()
    }
    

}


  return (
     <div className='absolute inset-0 backdrop-blur-lg flex justify-center items-center  '>
        <div className='flex flex-col items-center w-full md:w-3/6 mx-auto p-5 md:bg-light dark:md:bg-[#101828] shadow-lg rounded-lg'>
           
         
            <div className='w-4/6 mx-auto'>
{ code? <Verify/>   : <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-5">
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Enter Your Email</h2>
       
           <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='email' placeholder="Enter Your Email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
              <div className='flex md:flex-row flex-col gap-3'>
                  <Button className='bg-main py-2 px-4 mx-auto md:w-6/12 w-full self-center' type="submit">Send Code</Button>
                <Button onClick={(e)=>{e.preventDefault() 
                    setForget(false)}} className='bg-red-700 text-white py-2 px-4 mx-auto md:w-4/12 w-full self-center' type="submit">Cancle</Button>

              </div>
</form>
</Form>
}
            </div>

        </div>
      
    </div>
  )
}



export async function sendCode(email:string) {
try {
       const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
    {
        cache:'no-store',
        method:'POST',
        headers:{
              "Content-Type": "application/json",
    },
    body:JSON.stringify({
        email:email
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
