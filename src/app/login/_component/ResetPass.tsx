import { useForget } from '@/app/context/ForgetContext'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from "zod";

export  const resetPasswordSchema =z.object({
    email:z.string().nonempty("this field is required").email("not valid email"),
    newPassword:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'InValid Password'),
})
export default function ResetPass() {
    const {  setForget } = useForget();

const notifySuccess = () => toast.success(" Password has Changed" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});

  const notifyError = () => toast.error("Incorrect Email" ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });


    const form =useForm<z.infer<typeof resetPasswordSchema>>({
        resolver:zodResolver(resetPasswordSchema),
        defaultValues:{
              email:"",
    newPassword: ""
        }
    })

async function onSubmit(data:{email:string,newPassword:string}){
    const msg=await resetPassword({email:data.email,
      newPassword:data.newPassword})
    
    console.log(msg);
    if (msg.token) {
        notifySuccess()
   setForget(false)
    }else{
notifyError()
    }
    

}

  return (
    <div>
      <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-5">
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Reset Password</h2>
       
           <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
        <FormLabel>Email</FormLabel>

              <FormControl>
                <Input type='email' placeholder="Enter Your email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

            <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Passward</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Enter Your New Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
              <div className='flex md:flex-row flex-col gap-3'>
                  <Button className='bg-main py-2 px-4 mx-auto  w-full self-center' type="submit">Reset Password</Button>

              </div>
</form>
</Form>
    </div>
  )
}


export async function resetPassword({email,newPassword}:{email:string,newPassword:string}) {
try {
       const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
    {
        cache:'no-store',
        method:'PUT',
        headers:{
              "Content-Type": "application/json",
    },
    body:JSON.stringify({
        email:email,
        newPassword:newPassword
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