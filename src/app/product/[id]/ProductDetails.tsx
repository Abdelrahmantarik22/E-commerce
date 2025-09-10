import React from 'react'
import Image from 'next/image'
import { ProductInterface } from '@/interfaces/product.interface'
import ProductBtn from '../_component/ProductBtn'
import productCategory from '@/app/apis/productCategory'
import { Daum } from '@/interfaces/related.interface'
import WishlistBtn from '../_component/AddWishItem'
import RelatedSwiper from '../_component/RelatedSwiper'

export default async function ProductDetails({prodDet}:{prodDet:ProductInterface}) {

const relatedProduct:Daum[]=await productCategory(prodDet.category._id)



  return (
    <>
    <div className='flex font-main w-full md:w-5/6 mx-auto items-center flex-col md:flex-row  my-10'>
      <div className='md:w-1/3 px-3 w-full'>
      <Image src={prodDet.imageCover} alt={prodDet.title} width={200} height={200} className='w-full'></Image>
      </div>
      <div className='w-full md:w-2/3 flex flex-col gap-4 px-2  my-2'>
      <div className='flex items-center gap-4 w-full justify-end py-5 order-5 md:-order-1'>
<ProductBtn id={prodDet._id}></ProductBtn> 
  <WishlistBtn id={prodDet._id}></WishlistBtn>

      </div>
      <h4 className='text-main font-bold text-[18px]'>{prodDet.title}</h4>
      <p className='text-gray-500 text-[16px] font-light'>{prodDet.description}</p>
      <span className='font-[100] text-gray-700'>{prodDet.category.name}</span>
      <div className='flex justify-between items-center'>
        <span className='font-bold text-gray-950'>{`${prodDet.price} EGP`}</span>
    <span className='text-gray-500'><i className="fa-solid fa-star text-rating"  /> {prodDet.ratingsAverage}</span>
      </div>

      </div>
    </div>
    <div className='my-12'>
                
                  <h2 className='font-bold text-main text-2xl text-center'>Related Products</h2>
             <RelatedSwiper productt={relatedProduct}></RelatedSwiper>

    </div>
    </>
  )
}
