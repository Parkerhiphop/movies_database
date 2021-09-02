import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import getMovieDetail from "../api/getMovieDetail";
import Button from "./Button";
import Loading from "./Loading";

function DetailModal(props) {
  const { id, onClose } = props;

  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const movies = getMovieDetail({ setIsLoading, id });
    movies.then((movie) => {
      setMovieDetail(movie);
    });
  }, [id]);

  return createPortal(
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="w-3/6 overflow-auto bg-white rounded-lg text-left z-20 p-0">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="relative w-full p-4 border-b-2">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {movieDetail.Title}
                </h3>
                <button
                  className="absolute top-4 right-5 font-bold"
                  type="button"
                  onClick={() => onClose()}
                >
                  𝖷
                </button>
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-2 p-4 pb-7 border-b-2">
                <li>演員：{movieDetail.Actors}</li>
                <li>類型：{movieDetail.Genre}</li>
                <li>
                  故事內容簡介：
                  <br />
                  <p className="pt-1 pl-5">{movieDetail.Plot}</p>
                </li>
              </div>
              <div className="w-full inline-flex items-center justify-end gap-2 px-4 py-3">
                <Button color="bg-gray-500" size="sm" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button color="bg-blue-400" size="sm" onClick={() => onClose()}>
                  OK
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(DetailModal);
