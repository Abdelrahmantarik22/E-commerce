'use client'
import { ProductInterface, Root } from '@/interfaces/product.interface';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import productByPage from '@/app/apis/productByPage.api';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
export default function Products() {

  const[pageNum,setPageNum]=useState(1)
  const{data}=useQuery<Root>({
    queryKey:['productPage',pageNum],
    queryFn:()=>productByPage(pageNum)
  })
  

  return (
    <div  className='my-10'>

   <div className="flex flex-wrap ">
{data&&data?.data.map((prod:ProductInterface)=>( <ProductCard key={prod._id} prod={prod} ></ProductCard>))}
   </div>
   <div className='flex items-center gap-3 justify-center m-7 '>
    <Button onClick={()=>{
if (pageNum===1) {
  setPageNum(2)
}else if (pageNum===2) {
  setPageNum(1)
}

    }} className='cursor-pointer'><i className='fa-solid fa-arrow-left font-bold'></i> Prev  </Button>

<span className='p-3 shadow dark:shadow-white dark:text-white shadow-black text-black rounded-lg'>{pageNum} </span>

    <Button onClick={()=>{
if (pageNum===2) {
  setPageNum(1)
}else if (pageNum===1) {
  setPageNum(2)
}

    }} className='cursor-pointer'>Next <i className='fa-solid fa-arrow-right font-bold'></i> </Button>
   </div>
    </div>
  )
}
