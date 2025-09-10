'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import  {Input}  from "@/components/ui/input";
import z from "zod";
import React from 'react'
import {  useForm } from 'react-hook-form'
import { loginSchema } from '../_schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import PasswordReset from './_component/PasswordReset';
import { useForget } from '../context/ForgetContext';
import google from '../assets/google_PNG19635.png'
import Image from 'next/image';





export default function LoginFeild() {
  const notifySuccess = () => toast.success(" Login successful!" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});
  const notifyError = () => toast.error(" email or password is incorrect !" ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });

const { forget, setForget } = useForget();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
           
            email:'',
            password:''
          
        }
    })

async function onSubmit(data: z.infer<typeof loginSchema>){
const res= await signIn('credentials',{
    email:data.email,
    password:data.password,
    redirect:false

})
if(res?.ok){
    window.location.href='/'
    notifySuccess()
}else{
    notifyError()
    
  }
  
}

function handleGitHubSignin(e:React.MouseEvent<HTMLButtonElement>
){
  e.preventDefault()
  signIn('github',{
callbackUrl:'/'
  })
}


  return (
    <>
    {forget&&<PasswordReset ></PasswordReset>}
           <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-5">
        <h2 className='text-4xl font-bold text-main text-center'>Login Now</h2>
       
           <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder="Email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<div className='flex flex-col gap-2 '>
   <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passward</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Passward" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <span onClick={()=>setForget(true)} className='self-end text-gray-500 cursor-pointer'>Forget Password ?</span>
</div>
        <Button  className='bg-main hover:bg-main cursor-pointer py-2 px-4 mx-auto md:w-6/12 w-full self-center dark:text-white' type="submit">Login</Button>

<div className='flex items-center gap-3 flex-col'>
      <Button onClick={handleGitHubSignin} className='text-white py-2 hover:bg-gray-950 bg-gray-950 mx-auto md:w-4/12 w-full self-center cursor-pointer'><i className='fa-brands fa-github text-white'></i> Login With GitHub</Button>
      <Button  className='text-black py-2 border-2 hover:bg-white bg-white mx-auto md:w-4/12 w-full self-center cursor-pointer'> <Image src={google} alt='google logo '  width={25} height={25}></Image> Login With Google</Button>

</div>


      </form>
    </Form>
    </>
  )
}




