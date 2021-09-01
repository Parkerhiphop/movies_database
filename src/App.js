import { useEffect, useState } from "react";
import getMovies from "./api/getMovies";
import Search from "./components/Search";
import MovieTable from "./components/MovieTable";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const movies = getMovies({ setIsLoading, searchTerm, page });

    movies.then((movie) => {
      setMovieData(movie);
    });
  }, [searchTerm, page]);

  const { Search: movieResults, totalResults, Response } = movieData;

  const hasLoaded = Response === "True"; /** 長出那個 layout */

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl">電影資料庫</h1>
      <Search onSearch={(searchTerm) => setSearchTerm(searchTerm)} />
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

export default App;
