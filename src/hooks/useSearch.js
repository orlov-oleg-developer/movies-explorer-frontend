import { useMemo } from "react";

const useSearch = (array, searchQuery, toggleState) => {
  const result = useMemo(() => {
    const moviesList = array.filter(movie => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()));

    if (toggleState) {
      return moviesList.filter((movie) => {
        return (movie.duration <= 40)
      })
    }

    return moviesList;
  }, [searchQuery, array, toggleState ])

  return result
}


export default useSearch;
