const H1 = ({ as, children, className }) => {
  return (
      <>
        {as === "tag" && (
          <h1
            className={
              (className || "") +
              " text-[32px] font-normal leading-[42.56px] tracking-normal"
            }
          >
            {children}
          </h1>
        )}
        {as !== "tag" && (
          <div
            className={
              (className || "") +
              " text-[22px] font-normal leading-[29.08px] tracking-[-0.01em] h2"
            }
          >
            {children}
          </div>
        )}
      </>
  )
}

export default H1
