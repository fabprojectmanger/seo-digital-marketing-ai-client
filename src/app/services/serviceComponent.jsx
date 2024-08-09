import Link from "next/link";
import React from "react";

const ServiceComponent = ({ props }) => {
  return (
    <div class="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border h-[250px]">
    <img
      src={props.icon}
      className="w-full h-full object-contain"
      alt="ui/ux review check" />
  </div>
  <div class="p-6">
    <h4 class="block font-sans text-xl antialiased font-[600] leading-snug tracking-normal text-blue-gray-900">
      {props.title}
    </h4>
    <p class="block mt-3 font-sans text-l antialiased font-normal leading-relaxed text-gray-700">
      {props.description}
    </p>
  </div>
  <div class="p-6 pt-0">
    <Link href={`/services/${props.slug}`} className="inline-block">
      <button
        class="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
        type="button">
        Learn More
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" class="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg>
      </button>
    </Link>
  </div>
</div> 
  );
};
export default ServiceComponent;
