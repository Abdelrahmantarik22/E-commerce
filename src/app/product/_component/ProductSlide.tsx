"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ProductInterface } from "@/interfaces/product.interface";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductBtn from "./ProductBtn";
import WishlistBtn from "./AddWishItem";

export default function ProductSlide({
  allProduct,
}: {
  allProduct: ProductInterface[];
}) {
  return (
    <>
    
      <Swiper
        spaceBetween={0}
        loop={true}
        modules={[Autoplay, Navigation]}
           navigation={{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full "
      >
         <div className="custom-prev absolute top-1/2 translate-y-1/2 cursor-pointer rounded-full bg-main p-2.5 z-10 size-10 flex justify-center items-center  left-0"><i className="fa-solid fa-arrow-left"></i></div>
      <div className="custom-next absolute top-1/2 translate-y-1/2 cursor-pointer rounded-full bg-main p-2.5 z-10 size-10 flex justify-center items-center right-0 "><i className="fa-solid fa-arrow-right"></i></div>

        {allProduct.map((prod: ProductInterface) => (
          <SwiperSlide key={prod._id} className="w-full">
             <div className="w-full flex flex-col px-3">
      <div className=" shadow-lg shadow-ma my-3  rounded-lg dark:shadow-amber-50">
        <div className="p-3 flex flex-col gap-1">
          <Link href={`/product/${prod._id}`}>
            <div className="relative overflow-hidden rounded-lg pr-3 ">
              <Image
                src={prod.imageCover}
                alt="product image"
                width={150}
                height={150}
                className="w-full"
              />
            </div>
            <span className="text-main text-[18px] font-bold">
              {prod.category.name}
            </span>
            <p className="line-clamp-1 text-gray-500 ">{prod.title}</p>
            <div className="flex justify-between w-full my-2 items-center">
              <span>{prod.price} EGP</span>
              <span>
                <i className="fa-solid fa-star text-rating" />{" "}
                {prod.ratingsAverage}
              </span>
            </div>
          </Link>
          <div className="  backdrop-blur-lg  flex  gap-2 justify-center items-center py-3 px-1 rounded-lg ">
            <ProductBtn id={prod._id}></ProductBtn>
            <WishlistBtn id={prod._id}></WishlistBtn>
          </div>
        </div>
      </div>
    </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
