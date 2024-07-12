
const H5 = ({ as, children, className }) => {
  return (
    <>
    {as === "tag" && (
      <h5
        className={
          (className || "") +
          " text-[14px] font-semibold leading-[24px]"
        }
      >
        {children}
      </h5>
    )}
    {as !== "tag" && (
      <div
        className={
          (className || "") +
          " text-[14px] font-semibold leading-[24px] "
        }
      >
        {children}
      </div>
    )}
  </>
  )
}

export default H5
