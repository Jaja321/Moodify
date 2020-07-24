import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import MoodSelector from './MoodSelector';
import GenreSelector from './GenreSelector';
import { getRecommendations } from '../actions';
import Button from './Button';
import loaderIcon from '../assets/loader.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DiscoverButton = styled(Button)`
  border: solid 2px white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.3rem 0.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const SmallTitle = styled.div`
  font-size: 1.1rem;
  margin: 0.5rem;
`;

const SmallerTitle = styled.div`
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  return (
    <Wrapper>
      <Title>What's your mood?</Title>
      <MoodSelector />
      <SmallTitle>Choose up to 5 genres:</SmallTitle>
      <GenreSelector />
      <SmallerTitle>Ready?</SmallerTitle>
      {isLoading ? (
        <object data={loaderIcon} type="image/svg+xml"></object>
      ) : (
        <DiscoverButton onClick={() => dispatch(getRecommendations())}>Discover</DiscoverButton>
      )}
    </Wrapper>
  );
};
