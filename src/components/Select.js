import { memo } from "react";

function Select(props) {
  const { name, options, onSelect } = props;

  return (
    <select
      className="h-10 p-2 border-2 rounded-md border-gray-300"
      name={name}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((option) => (
        <option id={option.value} key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default memo(Select);
