import { memo, useCallback, useState } from "react";
import Button from "./Button";
import Input from "./Input";

function Search(props) {
  const { clearable, hasError, onSearch, onClear } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const handleError = useCallback(() => {
    if (hasError) {
      onClear();
      setSearchTerm("");
    }
  }, [hasError, onClear]);

  return (
    <div className="grid grid-flow-col gap-1">
      <Input
        value={searchTerm}
        onBlur={handleError}
        onFocus={handleError}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleError();
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onSearch(searchTerm);
            handleError();
          }
        }}
        placeholder="請輸入電影名稱"
      />
      <Button
        color="bg-blue-400"
        size="md"
        onClick={() => {
          onSearch(searchTerm);
        }}
      >
        Search
      </Button>
      {clearable && (
        <Button
          color="bg-red-600"
          onClick={() => {
            setSearchTerm("");
            onClear();
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}

export default memo(Search);
