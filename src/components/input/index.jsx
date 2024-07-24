"use client";
import "./style.css";
const Input = ({
  wrapperClassName,
  type,
  placeholder,
  required,
  setInputData,
  value,
  disabled,
  name,
  className,
  onInput,
  onKeyDown
}) => {
  return (
    <>
      <div className={`relative w-full ` + (wrapperClassName || '')}>
        {onInput ? 
        <input
        onKeyDown={onKeyDown}
          name={name}
          type={type}
          disabled={disabled}
          autoComplete={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onInput={(e)=>{
            onInput(e)
          }}
          className={`${className || ''}`} 
        />
        : 
        <input
          name={name}
          type={type}
          disabled={disabled}
          autoComplete={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => {
            setInputData(e);
          }}
          className={`${className || ''}`} 
        />

}
      </div>
    </>
  );
};

export default Input;
