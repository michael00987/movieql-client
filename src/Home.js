import React from 'react';
import styled from 'styled-components';
import {useQuery} from '@apollo/client';
import {HOME_PAGE} from './queries';
import Movie from './Movie';
const Container = styled.div`
  display: grid;
  gird-template-columns: repeat(3, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
`;
const Home = () => {
  const {loading, error, data} = useQuery(HOME_PAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.movies.map((movie) => (
    <Container key={movie.id}>
      <Movie
        id={movie.id}
        poster={movie.medium_cover_image}
        title={movie.title}
        rating={movie.rating}
      />
    </Container>
  ));
};

export default Home;
