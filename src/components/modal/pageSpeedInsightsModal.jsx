import React from "react";
const removeIframesAndFramesKeepContent = (html) => {
  return html.replace(/<\/?(iframe|frame)[^>]*>/gi, '');
};
export default function PageSpeedInsightsModal({ props }) {
  const cleanedContent = removeIframesAndFramesKeepContent(props.report);

  return (
    <div  className="h-screen border-2 border-slate-400 w-full  mx-auto bg-white overflow-auto p-6 relative">
        <div className='cursor-pointer fixed top-[10px] right-[30px]' onClick={()=>props.close(false)}>
        <img
        src='/assets/images/crossIcon.png'
        className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
        alt='Image'
      />
        </div>
        <div
          className="htmlIncluded mt-6"  
          dangerouslySetInnerHTML={{
            __html: cleanedContent,
          }}
        ></div>
    </div>
  );
}
