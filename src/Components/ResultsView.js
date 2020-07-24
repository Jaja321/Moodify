import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setTracks } from '../reducer';
import PlaylistButton from './PlaylistButton';
import TracksGrid from './TracksGrid';
import Button from './Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TracksWrapper = styled.div`
  width: 90%;
  max-width: 900px;
  margin: auto;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem;
`;


const ButtonsRow = styled.div`
  display: flex;
  align-items: space-between;
`;

export default () => {
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.tracks);

  return (
    <Wrapper>
      <Title>Here are some songs you might enjoy:</Title>
      <TracksWrapper>
        <TracksGrid tracks={tracks.slice(0, 12)} />
      </TracksWrapper>
      <ButtonsRow>
        <PlaylistButton tracks={tracks} />
        <Button onClick={() => dispatch(setTracks(null))}>Go Again</Button>
      </ButtonsRow>
    </Wrapper>
  );
};