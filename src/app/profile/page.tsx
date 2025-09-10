'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React, { useState } from 'react'
import Uuser from '../assets/default-profile.png'
import ChangePassword from './_component/ChangePassword';
import UpdateData from './_component/UpdateData';
import CartComp from '../cart/_component/CartComp';
import Checkk from './_component/Checkk';
import WishComp from '../wishlist/_component/WishComp';

export default function Page() {
  const[user,setUser]=useState(true)
const[change,setChange]=useState(false)
const[update,setUpdate]=useState(false)
const[cart,setCart]=useState(false)
const[wishlist,setWishlist]=useState(false)
const[check,setCheck]=useState(false)

 

     const { data: session} = useSession()

     
  return (
    <div className='flex gap-9 h-[450px]  flex-col  my-10'>
      {update&&<UpdateData closeupdate={setUpdate}></UpdateData>}
        {change&&<ChangePassword close={setChange}></ChangePassword>}
<div className='flex  flex-row justify-around p-3 shadow rounded-lg w-full  '>

<div onClick={()=>{setUser(true)   
  setCart(false)
  setCheck(false)
  setWishlist(false)}
} className= {`flex md:flex-row flex-col hoov gap-3 items-center cursor-pointer ${user&&'text-main'}`}>
    <i className='fa-solid fa-user'></i>
    <span >User</span>
</div>
<div onClick={()=>{setUser(false)   
  setCart(true)
  setCheck(false)
  setWishlist(false)}
} className={`flex md:flex-row flex-col hoov gap-3 items-center cursor-pointer ${cart&&'text-main'}`}>
    <i className='fa-solid fa-cart-shopping'></i>
    <span>Cart</span>
</div>
<div onClick={()=>{setUser(false)   
  setCart(false)
  setCheck(false)
  setWishlist(true)}
} className={`flex md:flex-row flex-col hoov gap-3 items-center cursor-pointer ${wishlist&&'text-main'}`}>
    <i className='fa-solid fa-heart'></i>
    <span>Wishlist</span>
</div>
<div onClick={()=>{setUser(false)   
  setCart(false)
  setCheck(true)
  setWishlist(false)}
} className={`flex md:flex-row flex-col hoov gap-3 items-center cursor-pointer ${check&&'text-main'}`}>
    <i className='fa-solid fa-wallet'></i>
    <span>Check Out</span>
</div>



</div>




            
        <div className='w-full  p-3 rounded-lg overflow-y-auto'>
 { user&&<div className='flex gap-5 flex-col items-center w-full '>
         <Image className='size-14 rounded-full border-2 border-main ' src={session?.user?.image?session.user?.image:Uuser} width={12} height={12} alt={`${session?.user?.name}`}></Image>
      <h2 className='text-3xl font-bold'>{session?.user?.name}</h2>
      <p className='text-2xl font-light'>{session?.user?.email}</p>
<div className='flex items-center gap-10'>
        <span onClick={()=>setChange(true)} className='cursor-pointer text-gray-500'>Change Password</span>
        <span onClick={()=>setUpdate(true)} className='cursor-pointer text-gray-500'>Update Data</span>

</div>
        </div>}
        {cart&&<CartComp></CartComp>}
        {wishlist&&<WishComp></WishComp>}
        {check&&<Checkk ></Checkk>}
          
        </div>
    </div>
  )
}
