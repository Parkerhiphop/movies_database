import { memo, useEffect, useState } from "react";
import getMovies from "./api/getMovies";
import MovieSearch from "./components/MovieSearch";
import MovieTable from "./components/MovieTable";
import Select from "./components/Select";

const typeOptions = [
  {
    value: "",
    name: "搜尋影視類型",
  },
  {
    value: "movie",
    name: "電影",
  },
  {
    value: "series",
    name: "影集",
  },
  {
    value: "episode",
    name: "單集",
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [type, setType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchTerm) {
      const movies = getMovies({ setIsLoading, searchTerm, page, type });

      movies.then((movie) => {
        setMovieData(movie);
      });
    }
  }, [searchTerm, page, type]);

  const {
    Search: movieResults,
    totalResults,
    Response,
    Error: hasError,
  } = movieData;

  useEffect(() => {
    if (hasError) {
      setType("");
      setSearchTerm("");
    }
  }, [hasError, searchTerm, type]);

  const hasLoaded = Response === "True";

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl">電影資料庫</h1>
      <div className="inline-flex flex-row gap-4">
        {hasLoaded && (
          <Select
            name="type"
            onSelect={(value) => {
              setType(value);
            }}
            options={typeOptions}
          />
        )}
        <MovieSearch
          clearable={hasLoaded}
          hasError={hasError}
          onClear={() => {
            setSearchTerm("");
            setType("");
            setPage(1);
            setMovieData({});
          }}
          onSearch={(searchTerm) => setSearchTerm(searchTerm)}
        />
      </div>
      {hasError && (
        <h5 className="text-center text-red-500 font-bold tracking-widest">
          並沒有符合的搜尋結果！
        </h5>
      )}
      {hasLoaded && (
        <MovieTable
          isLoading={isLoading}
          columns={movieResults}
          current={page}
          onPageChange={setPage}
          totalResults={totalResults}
        />
      )}
    </div>
  );
}

export default memo(App);
