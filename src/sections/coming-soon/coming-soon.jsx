import React from 'react'
import Wrapper from '../../components/wrapper/wrapper'

const ComingSoon = () => {
  return (
    <Wrapper className='min-h-[calc(100vh-155px)] flex items-center justify-center flex-col -mt-24'>
      <h1 className='text-[5vw] font-black uppercase text-center'>
        Coming Soon
      </h1>
      <p className='text-center text-2xl max-w-[500px] mx-auto'>
      We're coming soon! We're working
      hard to give you the best experience
      </p>
    </Wrapper>
  )
}

export default ComingSoon
