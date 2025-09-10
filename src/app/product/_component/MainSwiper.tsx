"use client";
import React from 'react'
import Image from 'next/image';
import slide1 from '@/app/assets/slider-image-1.jpeg'
import slide2 from '@/app/assets/slider-image-2.jpeg'
import slide3 from '@/app/assets/slider-image-3.jpeg'
import slide4 from '@/app/assets/slider-2.jpeg'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

export default function MainSwiper() {
  return (
    <div className='md:flex hidden my-4 rounded-2xl'>
    <Swiper spaceBetween={0}
    loop={true} slidesPerView={1} modules={[Autoplay,Pagination,EffectFade]} 
      pagination={{ clickable: true }}
      effect='fade'
  autoplay={{ delay: 5000, disableOnInteraction: false }}
className='w-ful rounded-lg'
    >
        <SwiperSlide> <Image className='w-full h-[400px]' src={slide3} alt='product' width={200} height={200} ></Image> </SwiperSlide>
        <SwiperSlide> <Image className='w-full h-[400px]' src={ slide4} alt='product' width={200} height={200} ></Image> </SwiperSlide>
        <SwiperSlide> <Image className='w-full h-[400px]' src={ slide2} alt='product' width={200} height={200} ></Image> </SwiperSlide>
        <SwiperSlide> <Image className='w-full h-[400px]' src={ slide1} alt='product' width={200} height={200} ></Image> </SwiperSlide>
        

    </Swiper>
    
    </div>
  )
}
