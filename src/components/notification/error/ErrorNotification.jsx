"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Wrapper from "../../wrapper/wrapper";
import Text from "../../text/text";
import { useTheme } from "../../../contexts/theme/ThemeProvider";

function ErrorNotification({ children, message, className, active }) {
  className = className || "";
  const [activeNoti, setActiveNoti] = useState(false);
  const { setError } = useTheme();
  useEffect(() => {
    setTimeout(() => {
      setActiveNoti(active);
    }, 500);
    setTimeout(() => {
      setError(false);
    }, 5000);
  }, [active]);

  return (
    <Wrapper
      className={
        className +
        " fixed top-20 right-4  z-[999999] max-w-96 w-full sm:p-3 transition-all flex justify-between items-center duration-500 bg-red-500 rounded-lg shadow dark:border md:mt-0 l:p-0  opacity-0 translate-y-7" +
        `${
          activeNoti === true
            ? " !opacity-100 !translate-y-0"
            : " cursor-not-allowed pointer-events-none "
        }`
      }
    >
      <Text className="flex-1 !text-base font-medium text-white">
        {children}
        {message}
      </Text>
    </Wrapper>
  );
}
ErrorNotification.propTypes = {
  children: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
};

export default ErrorNotification;
