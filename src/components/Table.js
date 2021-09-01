import { useState } from "react";
import Button from "./Button";
import Loading from "./Loading";
import Modal from "./Modal";
import Pagination from "./Pagination";

function Table(props) {
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
                <th className="border-2">海報</th>
                <th className="border-2">名稱</th>
                <th className="border-2">類型</th>
                <th className="border-2">年份</th>
                <th className="border-2" />
              </tr>
            </thead>
            <tbody className="w-auto">
              {columns.map((column) => (
                <tr key={column.imdbID}>
                  <td className="border-2">
                    <img
                      className="w-28 h-32"
                      src={column.Poster}
                      alt="Poster"
                    />
                  </td>
                  <td className="border-2">{column.Title}</td>
                  <td className="border-2">{column.Type}</td>
                  <td className="border-2">{column.Year}</td>
                  <td className="border-2">
                    <Button
                      color="bg-gray-500"
                      size="sm"
                      onClick={() => setId(column.imdbID)}
                    >
                      詳細資料
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {totalResults > 10 &&
      <Pagination
        current={current}
        onPageChange={onPageChange}
        total={totalResults ? Math.ceil(totalResults / 10) : 1}
      />
            }
      {id && <Modal id={id} onClose={() => setId('')} />}
    </>
  );
}

export default Table;
