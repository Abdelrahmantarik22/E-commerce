'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import  {Input}  from "@/components/ui/input";
import z from "zod";
import { useRouter } from 'next/navigation';

import React from 'react'
import {  useForm } from 'react-hook-form'
import { regSchema } from '../_schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
export default function RegisterFeild() {
    const router =useRouter()
    const form = useForm<z.infer<typeof regSchema>>({
        resolver:zodResolver(regSchema),
        defaultValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:''
        }
    })


    async function onSubmit(values: z.infer<typeof regSchema>){
const sendReg=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
    method:'post',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(values)
});
    const data = await sendReg.json();

  if (!sendReg.ok) {
    alert(data.message)
    return;
  }
    alert("Registration successful!");
    router.push('/login')

form.reset()
    }




  return (
    <>
    
           <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col p-5">
        <h2 className='text-4xl font-bold text-main text-center'>Register Now</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />


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




           <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rePassword</FormLabel>
              <FormControl>
                <Input type='password' placeholder="rePassword" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />




           <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        
        <Button className='bg-main hover:bg-main cursor-pointer py-2 px-4 dark:text-white mx-auto md:w-6/12 w-full self-center' type="submit">Register</Button>
      </form>
    </Form>
    
    </>
  )
}
