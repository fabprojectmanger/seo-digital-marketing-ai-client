import Image from "next/image";
import React from "react";
import { DateRangePicker } from "react-date-range";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import IconsArrowForward from "../../../public/icons/IconsArrowForward";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding:'40px'
  },
};

export default function DateModal(props) {

  return (
    <div>
      <Modal
        isOpen={props.open}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div
            className="cursor-pointer absolute top-[10px] right-[10px]"
            onClick={() => props.close(false)}
          >
            <Image
              src="/assets/images/crossIcon.png"
              width={25}
              height={25}
              alt="Image"
            />
          </div>
          <DateRangePicker
            ranges={[props.ranges]}
            onChange={props.onChange}
            minDate={props.minDate}
            maxDate={new Date()}
            months={props.minDate}
            showMonthAndYearPickers={false}
          />
          <button
              onClick={() => props.option(3)}
              className="w-[42px] h-[42px] rounded-[10px] bg-dark-100 flex justify-center items-center"
            >
              <IconsArrowForward />
            </button>
      </Modal>
    </div>
  );
}
