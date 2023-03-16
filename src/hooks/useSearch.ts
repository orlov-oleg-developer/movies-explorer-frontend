import { useMemo } from "react";
import { IMovie } from "../types/movies";
import {ISavedMovie} from "../types/savedMovies";

const useSearch = (array: any, searchQuery: string, toggleState: boolean): any[] => {
  const result: any = useMemo(() => {
    const moviesList = array.filter((movie: any) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()));

    if (toggleState) {
      return moviesList.filter((movie: any) => {
        return (movie.duration <= 40)
      })
    }

    return moviesList;
  }, [searchQuery, array, toggleState ])

  return result
}

export default useSearch;
