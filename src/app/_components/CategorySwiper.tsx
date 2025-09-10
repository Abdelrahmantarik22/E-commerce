'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation} from 'swiper/modules';
import Image from 'next/image';
import { Daum } from '@/interfaces/category.interface';

export default function CategorySwiper({productt}:{productt:Daum[]}) {
    
  return (
    <div className='px-2 my-5 w-full'>
      <Swiper spaceBetween={0} 
    loop={true}  modules={[Autoplay,Navigation]} 
    autoplay={{ delay:1000, disableOnInteraction: false }}
      breakpoints={{
    320: { slidesPerView: 3 },   
    640: { slidesPerView: 5 },   
    1024: { slidesPerView: 10 },  
  }}
    className='w-full '
    >
         {productt.map((product)=>(

        <SwiperSlide key={product._id}> <div className='flex flex-col items-center' >
            <Image className='size-20 rounded-full' src={product.image} alt={`${product.name}`} width={200} height={200} ></Image>
            <h3 className='font-bold text-main text-center'>{product.name}</h3>

            </div> </SwiperSlide>
   ))}
    
        

    </Swiper>
    </div>
  )
}






