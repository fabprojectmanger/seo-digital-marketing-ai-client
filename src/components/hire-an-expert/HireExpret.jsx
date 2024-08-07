import Image from 'next/image'
import React, { useEffect } from 'react'
import HireMeModal from '../modal/hireMeModal';
import { useTheme } from '../../contexts/theme/ThemeProvider';

const HireExpret = () => {
  const { showForm,setShowForm } = useTheme();

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },[showForm])
  return (
    <>
    <div className='fixed bottom-4 right-6 z-50'>
      <div onClick={()=>setShowForm(true)}  className='cursor-pointer py-3 px-5 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-6xl text-dark-100 flex justify-center gap-x-4 items-center text-xl font-semibold tracking-tight'>
      <Image
        src='/assets/images/expert.png'
        width={50}
        height={50}
        alt='Image'
      />
      Connect with the Best</div>
    </div>
    {showForm &&
    <div className='absolute top-[15%] left-0 right-0 z-50 w-[100%] items-center px-[16px] justify-center flex '>
      <div className='w-full md:max-w-[800px] mx-auto bg-white overflow-auto max-h-[80vh] p-6 relative'>
        <div className='cursor-pointer absolute top-[10px] right-[10px]' onClick={()=>setShowForm(false)}>
        <Image
        src='/assets/images/crossIcon.png'
        width={50}
        height={50}
        alt='Image'
      />
        </div>
     <HireMeModal />
      </div>
    </div>
    }
     </>
  )
}

export default HireExpret
