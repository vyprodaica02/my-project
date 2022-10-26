import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdAPI } from "../../config";
//https://api.themoviedb.org/3/movie/now_playing?api_key=c31b4d2e7648c9fe7306400bbe172453
const MovieList = ({ type = "now_playing" }) => {
  const [movie, setMovie] = useState([]);
  const { data } = useSWR(tmdAPI.getMovieList(type), fetcher);
  // const movie = data?.results || [];

  useEffect(() => {
    if (data && data.results) setMovie(data.results);
  }, [data]);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
