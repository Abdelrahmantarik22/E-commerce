import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import googlePlay from '@/app/assets/logo-google-play-4096.png'
import amzon from '@/app/assets/amazon-pay-removebg-preview.png'
import paypal from '@/app/assets/paypal_PNG9.png'
import mastercard from '@/app/assets/mastercard-logo-png-image-background-logo-mastercard-11563000929p7h8ctftya-removebg-preview.png'

export default function Footer() {
  return (
    <>
<footer className="bg-light dark:bg-gray-900 px-5 py-12 ">
    <div className="md:flex flex-col md:justify-between">
      <div className="mb-4 flex flex-col gap-2">
        <h2 className='font-bold font-main text-main'>Get the FreshCart app</h2>
        <p className='font-light text-gray-600 dark:text-white'>we will send you alink ,open it on your phone to download the app</p>
      </div>
      <div className="flex items-center my-5 justify-between flex-col md:flex-row gap-3 ">
        <Input className='md:w-9/12 w-full bg-white' placeholder='Email'></Input>
        <Button className='bg-main text-gray-50 font-light md:w-2/12 w-1/2 mx-auto'>Share App Link</Button>
      </div>
       
      
      
       <div className='hidden md:flex  md:flex-row items-center md:justify-between border-t-2 border-b-2  py-1 text-black'>
        <div className='flex items-center gap-2 font-bold '>
          <p className='dark:text-white'>Payment Partners</p>
          <Image src={paypal} alt='PayPal ' width={100 } height={10} className='w-14'></Image>
          <Image src={mastercard} alt='MasterCard ' width={ 100} height={10} className='w-14 '></Image>
          <Image src={amzon} alt='AmazonPay ' width={ 100} height={10} className='w-14 '></Image>
          </div>
        <div className='flex items-center gap-2'>
          <p className='dark:text-white'>Get deliveries With FreshCart</p>
          <Image src={googlePlay} alt='googlePlay ' width={ 100} height={10} className='w-28 '></Image>
          </div>
        </div>
    
  </div>
</footer>

 
    </>
  )
}
