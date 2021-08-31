import { memo, useState } from "react";
import Button from "./Button";
import Input from "./Input";

function Search(props) {
  const { onSearch } = props;

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="grid grid-flow-col gap-1">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onSearch(searchTerm);
          }
        }}
        placeholder="請輸入電影名稱"
      />
      <Button
        color="bg-blue-400"
        size="md"
        onClick={() => onSearch(searchTerm)}
      >
        Search
      </Button>
    </div>
  );
}

export default memo(Search);
