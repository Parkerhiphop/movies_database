import { memo } from "react";

function Input(props) {
  const { value, onChange, placeholder, onKeyDown } = props;

  // const [value, setValue] = useState(valueProp || '');

  // const onChange = useCallback((event) => {
  //   const nextValue = event.target.value;

  //     setValue(nextValue);

  //     if (onChangeProp) {
  //       onChangeProp(event);
  //     }
  // }, [onChangeProp]);

  return (
    <input
      className="h-10 p-2 border-2 rounded-md border-gray-300"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
}

export default memo(Input);
