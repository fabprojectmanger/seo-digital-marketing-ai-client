'use client'
import React, { useEffect, useState } from 'react'

const Indicator = ({gap}) => {
    const [circleFill, setCircleFill] = useState('#f33');
    useEffect(()=>{
      if(gap >= 90 && gap <= 100){
        setCircleFill('#0c6')
      }
      else if(gap >= 50 && gap <= 89){
        setCircleFill('#fa3')
      }
      else if(gap >= 0 && gap <= 49){
        setCircleFill('#f33')
      }
    },[gap])
  return (
    <div className='w-2 h-2 rounded-full' style={{background:circleFill}}>
      
    </div>
  )
}

export default Indicator
