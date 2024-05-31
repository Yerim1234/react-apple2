import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { imageBasePath } from "../../constant";
import "./DetailPage.css";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return null;
  console.log(movie);
  console.log(movie.genres[0].name);

  return (
    <section className="wapper__detail">
      <img
        className="detail__img"
        src={`${imageBasePath}${movie.backdrop_path}`}
        alt="detail"
      />
      <div className="wapper__description">
        <h2>{movie.title}</h2>
        <span>평점 : {movie.vote_average}</span>
        <div className="wapper__genre">
          <h3>장르</h3>
          {movie.genres.map((genre) => (
            <span className="genre" key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
        <h3>콘텐츠 설명</h3>
        <span className="wapper__overview">{movie.overview}</span>
      </div>
    </section>
  );
};

export default DetailPage;
