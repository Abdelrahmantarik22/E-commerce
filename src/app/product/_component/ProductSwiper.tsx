
import productApi from '@/app/apis/product.api';
import { ProductInterface } from '@/interfaces/product.interface';
import Link from 'next/link';
import ProductSlide from './ProductSlide';

export default async function ProductSwiper() {
  const allProduct: ProductInterface[] = await productApi();

  return (
    <div className="my-10">
      <Link href="/product">
        <h2 className="font-bold text-main text-2xl text-center">
          Our Products <i className="fa-solid fa-arrow-right"></i>
        </h2>
      </Link>

      <div className="w-full">
        <ProductSlide allProduct={allProduct} />
      </div>
    </div>
  );
}
