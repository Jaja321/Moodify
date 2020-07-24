import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSelectedGenres } from '../reducer';
import { getRecommendations } from '../actions';
import Button from './Button';

const genres = [
  'Rock',
  'Metal',
  'Classical',
  'Alternative',
  'Chill',
  'Country',
  'Electronic',
  'Hip-Hop',
  'Indie',
  'Pop',
  'Punk',
  'Techno',
];

const Wrapper = styled.div`
  display: flex;
  max-width: 600px;
  flex-wrap: wrap;
  justify-content: center;
`;

const GenreButton = styled(Button)`
  color: ${({ selected }) => (selected ? '#203e3f' : 'white')};
  font-weight: ${({ selected }) => selected && 'bold'};
  background-color: ${({ selected }) => selected && 'white'};
`;

export default () => {
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state) => state.selectedGenres);

  const buttonClickHandler = (genre) => () => {
    const newSelectedGenres = [...selectedGenres];
    if (selectedGenres.includes(genre)) {
      newSelectedGenres.splice(selectedGenres.indexOf(genre), 1);
    } else if (selectedGenres.length < 5) {
      newSelectedGenres.push(genre);
    } else {
      return;
    }
    dispatch(setSelectedGenres(newSelectedGenres));
    //dispatch(getRecommendations());
  };

  return (
    <Wrapper>
      {genres.map((genre) => (
        <GenreButton selected={selectedGenres.includes(genre)} onClick={buttonClickHandler(genre)}>
          {genre}
        </GenreButton>
      ))}
    </Wrapper>
  );
};
