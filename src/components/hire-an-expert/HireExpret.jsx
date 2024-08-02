import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HireExpret = () => {
  return (
    <div className='fixed bottom-4 right-6 z-50'>
      <Link href='/contact-us' className='py-3 px-5 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-6xl text-dark-100 flex justify-center gap-x-4 items-center text-xl font-semibold tracking-tight'>
      <Image
        src='/assets/images/expert.png'
        width='50'
        height='50'
        alt='Image'
      />
      Hire an Expert</Link>
    </div>
  )
}

export default HireExpret
