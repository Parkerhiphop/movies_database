import axios from "axios";

export default async function getMovies({
  setIsLoading,
  searchTerm,
  page,
  type,
}) {
  try {
    setIsLoading(true);

    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=85dadcdf&s=${searchTerm}&page=${page}&type=${type}`
    );

    setIsLoading(false);

    return data;
  } catch (error) {
    console.error(error);
  }
}
