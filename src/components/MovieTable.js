import { memo, useState } from "react";
import Button from "./Button";
import Loading from "./Loading";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";

export function TH(props) {
  return <th className="border-2 p-2">{props.children}</th>;
}

export function TD(props) {
  return <td className="border-2 p-3">{props.children}</td>;
}

function MovieTable(props) {
  const [id, setId] = useState("");

  const { isLoading, current, onPageChange, totalResults, columns } = props;

  return (
    <>
      <div className="min-w-min h-3/5 overflow-y-auto">
        {isLoading && <Loading />}
        {!isLoading && (
          <table className="table-fixed border-collapse border-2 w-auto">
            <thead className="w-auto">
              <tr>
                <TH>海報</TH>
                <TH>名稱</TH>
                <TH>類型</TH>
                <TH>年份</TH>
                <TH />
              </tr>
            </thead>
            <tbody className="w-auto">
              {columns.map((column) => (
                <tr key={column.imdbID}>
                  <TD>
                    <img
                      className="w-28 h-32"
                      src={column.Poster}
                      alt="Poster"
                    />
                  </TD>
                  <TD>{column.Title}</TD>
                  <TD>{column.Type}</TD>
                  <TD>{column.Year}</TD>
                  <TD>
                    <Button
                      color="bg-gray-500"
                      size="sm"
                      onClick={() => setId(column.imdbID)}
                    >
                      詳細資料
                    </Button>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {totalResults > 10 && (
        <Pagination
          current={current}
          onPageChange={onPageChange}
          total={totalResults ? Math.ceil(totalResults / 10) : 1}
        />
      )}
      {id && <DetailModal id={id} onClose={() => setId("")} />}
    </>
  );
}

export default memo(MovieTable);
