const Text = ({children, className}) => {
  return (
    <p className={(className || "" ) + " text-[14px] font-normal leading-[13.3px] antialiased  tracking-[0.02em]"}>
        {children}
    </p>
  );
}

export default Text;