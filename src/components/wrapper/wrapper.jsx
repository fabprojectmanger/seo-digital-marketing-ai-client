const Wrapper = ({className, children,onClick}) => {
  return (
    <div 
    onClick={onClick}
    className={(className || "") + " "}>
      {children}
    </div>
  );
}

export default Wrapper;
