import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setTracks, setAudioProperties } from '../reducer';
import PlaylistButton from './PlaylistButton';
import TracksGrid from './TracksGrid';
import Button from './Button';
import { BigTitle } from './Typography';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TracksWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 900px;
  margin: 1rem;
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
      <BigTitle>Here are some tracks you might enjoy:</BigTitle>
      <TracksWrapper>
        <TracksGrid tracks={tracks.slice(0, 12)} />
      </TracksWrapper>
      <ButtonsRow>
        <PlaylistButton tracks={tracks} />
        <Button
          onClick={() => {
            dispatch(setTracks(null));
            dispatch(setAudioProperties({ energy: 0.5, valence: 0.5 }));
          }}
        >
          Go Again
        </Button>
      </ButtonsRow>
    </Wrapper>
  );
};
