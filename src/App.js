import React from "react";
import "swiper/scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./components/pages/HomePage";
import Banner from "./components/banner/Banner";
import MoviePage from "./components/pages/MoviePage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
const App = () => {
  return (
    <>
      <BrowserRouter basename="my-project">
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/resister" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
