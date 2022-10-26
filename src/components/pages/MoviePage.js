import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdAPI } from "../../config";
import useDebounce from "../../hook/useDebounce";
import MovieCard from "../movie/MovieCard";
import ReactPaginate from "react-paginate";
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  //
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(
    // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nextPage}`
    tmdAPI.getMovieList("popular", nextPage)
  );
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        // `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebounce}&page=${nextPage}`
        tmdAPI.getSearchMovie(filterDebounce, nextPage)
      );
    } else {
      setUrl(tmdAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);
  const movie = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;

    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 border border-[#ffff] text-white"
            placeholder="Type here to search"
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movie.length > 0 &&
          movie.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

const itemsPerPage = 20;
export default MoviePage;
