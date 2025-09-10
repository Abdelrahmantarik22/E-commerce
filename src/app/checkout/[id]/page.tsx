"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Cart } from "@/interfaces/cart.interface";
import {  useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { goToOfflinePayment, goToPayment } from "../check.api/shippingAddress";
import { zodResolver } from "@hookform/resolvers/zod";
import { shoppingSchema } from "@/app/_schema/shopping.schema";
import z from "zod";

export default function Check() {
  const [onLine,setOnLine]=useState(false)

   const {id}:{id:string}=useParams()

  const { data: cartProducts,isLoading} = useQuery<Cart>({
    queryFn: async () => {
      const res = await fetch("/api/cart");
      const payload = await res.json();
      return payload;
    },
    queryKey: ["cart"],
  });

  const form = useForm<z.infer<typeof shoppingSchema>>({
    resolver:zodResolver(shoppingSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });





   async function onSubmit(data:z.infer<typeof shoppingSchema>){
let res;
if (onLine) {
  
  res =await goToPayment({
   cartId:id,
     details: data.details,
   phone: data.phone,
   city: data.city
 })
 
if(res.status==='success'){
window.location.href=res?.session.url
}
}else{
       res =await goToOfflinePayment({
      cartId:id,
        details: data.details,
      phone: data.phone,
      city: data.city
    })
  if(res.status==='success'){
  window.location.href=`/`
  }
}
  }


if (cartProducts?.numOfCartItems==0) {
  return(
    <div className="flex justify-center items-center  flex-col gap-5  w-full  h-screen">

<i 
  className="fa-solid fa-wallet -rotate-z-45 text-9xl text-main " 
/>
      <span className="text-[20px] font-bold">You Dont have Product </span>
      <Link className="text-xl font-light hover:text-main transition-colors duration-200" href={'/product'}>lets Add some product <i className="fa-solid fa-cart-shopping"></i></Link>
            </div>
  )
}

else{

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="md:w-4/6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-5">
            <h2 className="text-4xl font-bold text-center">
              Shipping Information
            </h2>

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Details" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Phone" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="City" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              />

            <Button
            onClick={()=>setOnLine(true)}
              className="bg-green-800 hover:bg-green-900 py-2 dark:text-white  px-4 mx-auto md:w-4/12 w-full self-center"
              type="submit"
            >
              Continue to onLine payment
            </Button>
            <Button
            onClick={()=>setOnLine(false)}
            className="bg-green-800 hover:bg-green-900 py-2 dark:text-white px-4 mx-auto md:w-4/12 w-full self-center"
            type="submit"
            >
              Continue to offLine payment
            </Button>
          
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-4 md:w-2/6 w-full p-5">
      <div className={`w-full h-90 overflow-y-auto`}>
        <div className={`${isLoading&&'hidden'} grid grid-cols-3 gap-4 px-4 py-2 font-semibold text-gray-700 dark:text-white border-t`}>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>

        {cartProducts &&
          cartProducts?.data?.products.map((prod) => (
            <div
            key={prod._id}
            className="grid  grid-cols-3 my-2 gap-4 items-center p-4 rounded-lg border shadow-md bg-white dark:bg-gray-800 "
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <Image
                  src={prod.product.imageCover}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                  alt={prod.product.title}
                />
              </div>

              {/* Price */}
              <div className="text-gray-700 dark:text-gray-300">
                {prod.price} EGP
              </div>

              <div className="flex items-center gap-3">
                <span className="border py-1 px-3 rounded-lg">
                  {prod.count}
                </span>
              </div>
            </div>
          ))}
      </div>
              <Link href={"/"} className="text-center py-2 px-4 bg-main text-white rounded-lg w-5/6 mx-auto">
        <span >
                {" "}
                Return to shop <i className="fa-solid fa-cart-shopping"></i>
            </span>
              </Link>
            </div>
    </div>
  );
}
}
