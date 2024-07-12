"use client";
import Link from "next/link";
const LinkButton = ({ aos, className, to, children, style, duration, delay }) => {  
  className =  " pt-[7px] pb-2 px-[21px] text-center block text-base leading-[21.28px] font-normal rounded-[9px] border border-dark-100  transition-colors duration-300 " +
    (className || "");
  if (style === 'outlined') {
    className += " text-dark-100 border-dark-100 hover:bg-dark-100 hover:text-white";
  }
  else {
    className +=
      " bg-dark-100 text-white hover:bg-transparent hover:text-dark-100";
  }
  return (
    <div data-aos={aos || 'fade-in'} data-aos-duration={duration || 1000} data-aos-delay={delay || 100}>
    <Link href={to} className={className}>
      {children}
    </Link>
    </div>
  );
};
export default LinkButton;
