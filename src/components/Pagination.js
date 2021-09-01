import { useMemo } from "react";

export const range = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, i) => start + i);
};

function Pagination(props) {
  const { current, onPageChange, total } = props;

  const activeClass =
    "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
  const inActiveClass =
    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
  const ellipsisClass =
    "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700";

  const pageList = useMemo(() => {
    const startPage = 1;
    const endPage = total;

    if (total < 7) {
      return range(startPage, endPage);
    }

    const minPageCount = 5;

    const defaultStartPageBoundary = minPageCount - startPage;
    const defaultEndPageBoundary = endPage - minPageCount;

    const startPages =
      current <= defaultStartPageBoundary
        ? range(startPage, minPageCount)
        : [startPage];
    const endPages =
      current > defaultEndPageBoundary
        ? range(endPage - minPageCount + 1, endPage)
        : [endPage];

    const currentInMiddle =
      current > defaultStartPageBoundary &&
      defaultEndPageBoundary >= current &&
      current !== total
        ? current
        : null;

    const siblingStart =
      currentInMiddle > defaultStartPageBoundary ? currentInMiddle - 1 : null;
    const siblingEnd =
      currentInMiddle >= defaultStartPageBoundary + 1 &&
      defaultEndPageBoundary + 1 > currentInMiddle
        ? currentInMiddle + 1
        : null;

    return [
      ...startPages,
      currentInMiddle - startPage > 2 ? "ellipsisLeft" : "",
      siblingStart,
      currentInMiddle,
      siblingEnd,
      total - currentInMiddle > 2 ? "ellipsisRight" : "",
      ...endPages,
    ].filter((page) => page);
  }, [current, total]);

  return (
    <div className="w-full flex items-center justify-center">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          disabled={current === 1}
          onClick={() => onPageChange(1)}
        >
          <span className="sr-only">GoToStart</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <li
          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={() => onPageChange(current - 1)}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
        {pageList.map((page) => {
          const isEllipsis = page.toString().includes("ellipsis");

          return (
            <li
              key={page}
              className={
                page === current
                  ? activeClass
                  : isEllipsis
                  ? ellipsisClass
                  : inActiveClass
              }
              onClick={() => {
                if (!isEllipsis) {
                  onPageChange(page);
                }
              }}
            >
              {isEllipsis ? "..." : page}
            </li>
          );
        })}
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          disabled={current === total}
          onClick={() => onPageChange(current + 1)}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <li
          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={() => onPageChange(total)}
        >
          <span className="sr-only">GoToEnd</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
      </nav>
    </div>
  );
}

export default Pagination;
