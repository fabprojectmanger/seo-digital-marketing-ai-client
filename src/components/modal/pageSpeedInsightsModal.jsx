import React from "react";

export default function PageSpeedInsightsModal({ props }) {

  return (
    <div  className="w-full md:max-w-[800px] mx-auto bg-white overflow-auto max-h-[80vh] p-6 relative">
        <div className='cursor-pointer absolute top-[10px] right-[10px]' onClick={()=>props.close(false)}>
        <img
        src='/assets/images/crossIcon.png'
        className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
        alt='Image'
      />
        </div>
        <div
          className="htmlIncluded mt-6"  
          dangerouslySetInnerHTML={{
            __html: props.report,
          }}
        ></div>
    </div>
  );
}
