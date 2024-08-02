"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
import Wrapper from "../../wrapper/wrapper";
import Text from "../../text/text";

const SuccessNotification = ({ children, message, className, active }) => {
  className = className || "";
  const [activeNoti, setActiveNoti] = useState(false);
  const { setSuccess } = useTheme();
  useEffect(() => {
    setTimeout(() => {
      setActiveNoti(active);
    }, 500);
    setTimeout(() => {
      setSuccess({
        status:false
      });
    }, 5000);
  }, [active]);
  return (
    <Wrapper
      className={
        className +
        "noti fixed z-[999999] top-20 right-4 max-w-96 w-full sm:p-3 flex items-center justify-between duration-500 bg-green-700 !py-4 rounded-lg  md:mt-0 l:p-0   transition-all " +
        `${
          activeNoti === true
            ? " opacity-1 translate-y-0"
            : " cursor-not-allowed pointer-events-none opacity-0 translate-y-7"
        }`
      }
    >
      <Text className="flex-1 text-white">
        {children}
        {message}
      </Text>
    </Wrapper>
  );
};
SuccessNotification.propTypes = {
  children: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
};

export default SuccessNotification;
