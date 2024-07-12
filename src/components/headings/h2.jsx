const H2 = ({ as, children, className }) => {  
  return (
    <>
      {as === "tag" && (
        <h2
          className={
            (className || "") +
            " text-[22px] font-bold leading-[29.08px] tracking-[-0.01em]"
          }
        >
          {children}
        </h2>
      )}
      {as !== "tag" && (
        <div
          className={
            (className || "") +
            " text-[22px] font-bold leading-[29.08px] tracking-[-0.01em]"
          }
        >
          {children}
        </div>
      )}
    </>
  );
};

export default H2;
