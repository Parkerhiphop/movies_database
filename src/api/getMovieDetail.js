import axios from "axios";

export default async function getMovieDetails({ setIsLoading, id }) {
  try {
    setIsLoading(true);

    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=85dadcdf&i=${id}`
    );

    setIsLoading(false);

    return data;
  } catch (error) {
    console.error(error);
  }
}
