
const H3 = ({ as, children, className }) => {
  return (
    <>
      {as === "tag" && (
        <h3
          className={
            (className || "") +
            " text-[19px] font-medium leading-[25.88px] tracking-[-0.01em]"
          }
        >
          {children}
        </h3>
      )}
      {as !== "tag" && (
        <div
          className={
            (className || "") +
            " text-[20px] font-semibold leading-[26.44px] tracking-[-0.01em]"
          }
        >
          {children}
        </div>
      )}
    </>
  )
}

export default H3
