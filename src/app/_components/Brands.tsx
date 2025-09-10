
import { BrandsData, BrandsType } from '@/interfaces/brands.interface';
import BrandsSwiper from './BrandsSwiper';


export default  async function Brands() {
 
const res =await fetch ('https://ecommerce.routemisr.com/api/v1/brands',{cache:'no-store'})
const brandsData:BrandsType =await res.json()
    const allCategory:BrandsData[]= brandsData.data

  return (
    <div className='my-5'>
      <h2 className='font-bold text-main text-2xl text-center'>Product Brands</h2>
    <div className='w-full flex items-center justify-between m-auto'>
    <BrandsSwiper productt={allCategory}></BrandsSwiper>
    </div>
        </div>
  )
}




