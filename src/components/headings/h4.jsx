
const H4 = ({ as, children, className }) => {
  return (
    <>
      {as === "tag" && (
        <h4
          className={
            (className || "") +
            " text-[18px] text-[#2A2C29]  leading-[28px] tracking-[0.01em]"
          }
        >
          {children}
        </h4>
      )}
      {as !== "tag" && (
        <div
          className={
            (className || "") +
            " text-[18px] font-semibold leading-[17.29px] tracking-normal"
          }
        >
          {children}
        </div>
      )}
    </>
  )
}

export default H4;
