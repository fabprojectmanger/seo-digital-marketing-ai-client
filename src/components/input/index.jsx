"use client";
import "./style.css";
const Input = ({
  type,
  placeholder,
  required,
  setInputData,
  value,
  disabled,
  name,
  className
}) => {
  return (
    <>
      <div className={`relative w-full`}>
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
      </div>
    </>
  );
};

export default Input;
