import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getRecommendations } from '../actions';
import Button from './Button';
import loaderIcon from '../assets/loader.svg';
import { setTracks } from '../reducer';
import { SmallTitle } from './Typography';

const DiscoverButton = styled(Button)`
  border: solid 2px white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.3rem 0.5rem;
`;

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const genresSelected = useSelector((state) => state.selectedGenres.length > 0);
  const noTracksFound = useSelector((state) => state.tracks && state.tracks.length === 0);

  useEffect(() => {
    if (noTracksFound) {
      setTimeout(() => dispatch(setTracks(null)), 2000);
    }
  }, [noTracksFound, dispatch]);

  if (!genresSelected) {
    return null;
  } else if (noTracksFound) {
    return <SmallTitle>No matching tracks found, try another mood or genre</SmallTitle>;
  } else if (isLoading) {
    return <object data={loaderIcon} type="image/svg+xml"></object>;
  } else {
    return (
      <>
        <SmallTitle>Ready?</SmallTitle>
        <DiscoverButton onClick={() => dispatch(getRecommendations())}>Discover</DiscoverButton>
      </>
    );
  }
};
