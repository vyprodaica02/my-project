export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "c31b4d2e7648c9fe7306400bbe172453";
const tmdbEndPoint = `https://api.themoviedb.org/3/movie`;
const tmdEndPointSearch = `https://api.themoviedb.org/3/search/movie`;
export const tmdAPI = {
  //https://api.themoviedb.org/3/movie/now_playing?api_key=c31b4d2e7648c9fe7306400bbe172453
  getMovieList: (type, page = 1) =>
    `${tmdbEndPoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (movieId) => `${tmdbEndPoint}/${movieId}?api_key=${apiKey}`,
  //   getMovieCredits: (movieId, type = "credits") =>
  //     `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
  //   getMovieVideos: (movieId, type = "videos") =>
  //     `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
  getSearchMovie: (query, page) =>
    `${tmdEndPointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
};
