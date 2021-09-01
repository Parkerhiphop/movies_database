import { memo } from "react";

function Button(props) {
  const { children, color, onClick, size } = props;

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        w-max
        rounded-md
        hover:opacity-75
        focus:ring-1
        ${color}
        ${size === "sm" ? "h-8" : "h-10"}
        ${size === "sm" ? "p-2" : "p-3"}
        px-4
      `}
      type="button"
      onClick={onClick}
    >
      <span
        className={`
          ${size === "sm" ? "text-xs" : "text-sm"}
          text-gray-50
        `}
      >
        {children}
      </span>
    </button>
  );
}

export default memo(Button);
