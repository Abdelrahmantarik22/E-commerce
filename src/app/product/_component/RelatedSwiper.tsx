'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay} from 'swiper/modules';
import { Daum } from '@/interfaces/related.interface';
import Image from 'next/image';
import Link from 'next/link';

export default function RelatedSwiper({productt}:{productt:Daum[]}) {
    
  return (
    <div className='px-2 my-5'>
      <Swiper spaceBetween={0} 
    loop={true}  modules={[Autoplay]} 
    autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
    320: { slidesPerView: 3 },   
    640: { slidesPerView: 7 },   
    1024: { slidesPerView: 10 },  
  }}
    className='w-full '
    >
         {productt.map((product)=>(

        <SwiperSlide key={product._id}> <Link href={`/product/${product._id}`}><Image className='size-20 rounded-full' src={product.imageCover} alt={`${product.title}`} width={200} height={200} ></Image></Link> </SwiperSlide>
   ))}
    
        

    </Swiper>
    </div>
  )
}






