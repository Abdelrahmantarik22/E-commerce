import { ProductInterface } from "@/interfaces/product.interface";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductBtn from "./ProductBtn";
import WishlistBtn from "./AddWishItem";
export default function productCard({ prod }: { prod: ProductInterface }) {
  return (
    <div className="lg:w-1/5 sm:w-1/2 w-full md:w-1/3 flex flex-col px-3  ">
      <div className=" shadow-lg  my-3  rounded-lg dark:shadow-amber-50">
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
  );
}
