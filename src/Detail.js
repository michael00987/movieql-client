import React from 'react'
import {useQuery} from '@apollo/client';
import {MOVIE_DETAILS} from './queries';
import Movie from './Movie'
import styled from 'styled-components'

const Container = styled.div`
display:grid;
grid-template-columns:1fr 4fr;
margin-bottom:50px;
`;
const Card = styled.div`
box-shadow:0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgna(0,0,0,0.23);
background-color:white;
border-radius:7px;
`;
const Image = Card.withComponent('img');
const Title = styled.h1`
font-size:24px;
margin-bottom:10px;
`;
const Paragraph=styled.span`
margin-bottom:10px;
display:black;
font-weight:${props=>(props.bord?"500":"400")};
`;
const MovieContainer = styled.div`
display:grid;
grid-template-columns:repeat(3,0.7fr);
flex-wrap:wrap;
justify-items:center;
margin-top:50px;
`;

const Detail =({match:{params:{movieId}}})=>{
  movieId=Number(movieId)
  const {loading, error, data} = useQuery(MOVIE_DETAILS, {
  variables:{ movieId },
});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return(
    <>
    <Container>
      <Image src={data.movie.medium_cover_image}/>
      <span>
        <Title>{data.movie.title}</Title>
        <Paragraph bold>Rating:{data.movie.rating}</Paragraph>
        <Paragraph > {data.movie.description_intro}</Paragraph>
      </span>
    </Container>
    <Title>Suggested</Title>
    <MovieContainer>
      {data.suggestions.map(movie=>{
        return(
          <Movie 
          key={movie.id}
          id={movie.id}
          title={movie.title}
          rating={movie.rating}
          poster={movie.medium_cover_image}
          />
          )
      })}
    </MovieContainer>
        {data.movie.title}
        {data.movie.medium_cover_image}
        {data.movie.rating}
        {data.movie.description_intro}
    </>
    )
}

export default Detail