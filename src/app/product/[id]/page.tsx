import productDetailsApi from '@/app/apis/productDetails.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import ProductDetails from './ProductDetails';

export default async function page({params}:{params:Promise<{id:string}>}) {
    const {id}=await params
    
    const prdDetails:ProductInterface =await productDetailsApi(id)


  return (
    <div>
      <ProductDetails prodDet={prdDetails}></ProductDetails>
    </div>
  )
}
