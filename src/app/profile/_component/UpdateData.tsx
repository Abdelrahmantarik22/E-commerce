 'use client'
 import { updateData } from '@/app/_schema/updateMyData'
import { upateDataApi } from '@/app/apis/updateDataApi'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
type UpdatePasswordProps = {
  closeupdate: (value: boolean) => void;
};
export default function UpdateData({closeupdate}:UpdatePasswordProps) {

  const { data: session,update} = useSession()
const notifySuccess = () => toast.success("Data Updated" ,{style:{
    background:"#00bc7d",
    color:'white'
  }});

  const notifyError = () => toast.error("This is Old Data" ,{
    style:{
      background:'#ff6467',
      color:'white'
  }
 });


const form=useForm<z.infer<typeof updateData>>({
    resolver:zodResolver(updateData),
    defaultValues:{
     name: "",
    email: "",
    phone: ""
}
})


async function onSubmit(data:{name:string,email:string,phone:string}){
    const msg=await upateDataApi({name:data.name,email:data.email,phone:data.phone})
    
    if (msg.message==='success') {
        notifySuccess()
        closeupdate(false)
         update({
      ...session,
      user: {
        ...session?.user,
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    })
    }
    else{
        notifyError()
    }
    

}


  return (
  <div className='absolute inset-0 backdrop-blur-lg flex justify-center items-center  '>
        <div className='flex flex-col items-center md:w-3/6 w-full mx-auto p-5 dark:md:bg-[#101828] bg-light shadow-lg rounded-lg'>
           
         
            <div className='w-4/6 mx-auto'>
 <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-5">
        <h2 className='text-4xl font-light text-center'>Update Data</h2>
       
           <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder=" Name" {...field} />
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
              <FormControl>
                <Input type='email' placeholder="Email" {...field} />
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
              <FormControl>
                <Input type='text' placeholder=" Phone " {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
              <div className='flex md:flex-row flex-col gap-3'>
                  <Button className='bg-main py-2 px-4 mx-auto md:w-6/12 w-full self-center' type="submit">Update Data</Button>
                <Button onClick={(e)=>{e.preventDefault() 
                closeupdate(false)   }} className='bg-red-700 text-white py-2 px-4 mx-auto md:w-4/12 w-full self-center' type="submit">Cancle</Button>

              </div>
</form>
</Form>
            </div>

        </div>
      
    </div>
  )
}
