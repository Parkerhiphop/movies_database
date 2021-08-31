import { memo } from "react";

function Button(props) {
  const { children, color, onClick, size } = props;

  return (
    <button
      className={`
        min-w-button
        rounded-md
        hover:opacity-75
        focus:ring-1
        ${color}
        ${size === "sm" ? "h-8" : "h-10"}
        ${size === "sm" ? "p-1" : "p-2"}
      `}
      type="button"
      onClick={onClick}
    >
      <span
        className={`
          ${size === "sm" ? "text-xs" : "text-sm"}
          ${size === "sm" ? "leading-7" : ""}
          text-gray-50
        `}
      >
        {children}
      </span>
    </button>
  );
}

export default memo(Button);
