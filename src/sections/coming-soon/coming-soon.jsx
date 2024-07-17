import React from 'react'
import Wrapper from '../../components/wrapper/wrapper'

const ComingSoon = () => {
  return (
    <Wrapper className='min-h-[calc(100vh-119px)] flex items-center justify-center flex-col -mt-24'>
      <h1 className='text-[5vw] font-black uppercase text-center max-sm-tab:text-3xl'>
        Coming Soon
      </h1>
      <p className='text-center text-2xl max-w-[500px] mx-auto max-sm-tab:text-base px-4'>
      We&apos;re coming soon! We&apos;re working
      hard to give you the best experience
      </p>
    </Wrapper>
  )
}

export default ComingSoon
