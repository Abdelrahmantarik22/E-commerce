import { Categoryinterface, Daum } from '@/interfaces/category.interface';

import CategorySwiper from './CategorySwiper';


export default  async function Category() {
 
const res =await fetch ('https://ecommerce.routemisr.com/api/v1/categories',{cache:'no-store'})
const categoryData:Categoryinterface =await res.json()
    const allCategory:Daum[]= categoryData.data

  return (
    <div className='my-5'>
      <h2 className='font-bold text-main text-2xl text-center'>Our Category</h2>
    <div className='w-full flex items-center justify-between m-7'>
    <CategorySwiper productt={allCategory}></CategorySwiper>
    </div>
        </div>
  )
}




