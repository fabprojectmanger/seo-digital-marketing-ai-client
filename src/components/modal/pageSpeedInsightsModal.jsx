import React from "react";

export default function PageSpeedInsightsModal({ props }) {

  return (
    <div >
        <div
          className="max-w-[800px] mx-auto mt-16 mb-16 bg-white overflow-auto h-[600px] p-6"  
          dangerouslySetInnerHTML={{
            __html: props,
          }}
        ></div>
    </div>
  );
}
