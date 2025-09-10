 'use client'
 
 import { rePass } from '@/app/_schema/rePassword.schema'
import { reChangePassword } from '@/app/apis/rePasswordChange.api'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'



type ChangePasswordProps = {
  close: (value: boolean) => void;
};

export default function ChangePassword({close}:ChangePasswordProps) {


const notifySuccess = () => toast.success(" Password has Changed" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});

  const notifyError = () => toast.error("Incorrect old Password ,Invalid New Password" ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });


const form=useForm<z.infer<typeof rePass>>({
    resolver:zodResolver(rePass),
    defaultValues:{
     currentPassword:"",
    password:"",
    rePassword:""
    }
})


async function onSubmit(data:{currentPassword:string,password:string,rePassword:string}){
    const msg=await reChangePassword({currentPassword:data.currentPassword,password:data.password,rePassword:data.rePassword})
    
    if (msg.message==='success') {
        notifySuccess()
        close(false)
    }else{
notifyError()
    }
    

}


  return (
  <div className='absolute inset-0 backdrop-blur-lg flex justify-center items-center  '>
        <div className='flex flex-col items-center md:w-3/6 w-full mx-auto p-5 bg-light dark:md:bg-[#101828] shadow-lg rounded-lg'>
           
         
            <div className='w-4/6 mx-auto'>
 <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-5">
        <h2 className='text-4xl font-light text-center'>Change Password</h2>
       
           <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder=" current Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

           <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder=" New Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

           <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder="  re PAssword" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
              <div className='flex md:flex-row flex-col gap-3'>
                  <Button className='bg-main py-2 px-4 mx-auto md:w-6/12 w-full self-center' type="submit">Submit</Button>
                <Button onClick={(e)=>{e.preventDefault() 
                close(false)   }} className='bg-red-700 text-white py-2 px-4 mx-auto md:w-4/12 w-full self-center' type="submit">Cancle</Button>

              </div>
</form>
</Form>
            </div>

        </div>
      
    </div>
  )
}
