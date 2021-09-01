import { memo } from "react";

function Input(props) {
  const { value, onChange, placeholder, onKeyDown, onFocus, onBlur } = props;

  return (
    <input
      className="h-10 p-2 border-2 rounded-md border-gray-300"
      type="text"
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
}

export default memo(Input);
