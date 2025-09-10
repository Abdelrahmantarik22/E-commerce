import React from 'react'
import error from '@/app/assets/error.svg'
import Image from 'next/image'
export default function notfound() {
  return (
    <div>
  <Image src={error} alt='error' width={100} height={100} className='w-full h-100'></Image>
    </div>
  )
}
