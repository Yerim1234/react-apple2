import { useEffect, useState } from "react";
import "./Banner.css";
import axiosInstance from "../api/axios";
import requests from "../api/request";
import styled from "styled-components";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // 현재 상영중인 영화 정보 data 가져오기
    const res = await axiosInstance.get(requests.fetchNowPlaying);
    // 받아온 여러 개의 영화 중 하나의 ID 받아오기
    const movieId =
      res.data.results[Math.floor(Math.random() * res.data.results.length)].id;

    // 특정 영화에 대한 상세페이지 정보를 가져오기 (비디오 정보 포함)
    const { data: movieDetail } = await axiosInstance.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" }, // movieAPI에서 정한 params
    });
    setMovie(movieDetail);
  };
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };
  if (!movie) {
    return <div>Loading...</div>;
  }
  if (!isClicked) {
    return (
      <div
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.origin_name}
          </h1>
          <div className="banner__btns">
            {movie.videos?.results[0]?.key ? (
              <button
                className="banner__btn play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            ) : null}
          </div>
          <p className="banner__description">{truncate(movie.overview, 100)}</p>
        </div>
        <div className="banner__fadeBottom" />
      </div>
    );
  } else {
    return (
      <>
        <button className="back__btn" onClick={() => setIsClicked(false)}>
          x
        </button>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}
            ></Iframe>
          </HomeContainer>
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 87%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`;
