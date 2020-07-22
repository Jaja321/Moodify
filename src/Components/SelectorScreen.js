import React, { useEffect } from 'react';
import styled from 'styled-components';
import Track from './Track';
import { useDispatch, useSelector } from 'react-redux';
import MoodSelector from './MoodSelector';
import { setAccessToken } from '../reducer';
import GenreSelector from './GenreSelector';
import PlaylistButton from './PlaylistButton';
const qs = require('query-string');

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TracksWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.5rem;
  min-width: 0;
`;

export default ({ location }) => {
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.tracks);
  const selectedGenres = useSelector((state) => state.selectedGenres);

  useEffect(() => {
    const accessToken = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
    dispatch(setAccessToken(accessToken));
  }, [dispatch, location]);

  return (
    <Wrapper>
      <MoodSelector />
      <GenreSelector />

      {selectedGenres.length > 0 && (
        <>
          <TracksWrapper>
            {tracks.slice(0, 12).map((trackData, i) => (
              <Track key={'track' + (i + 1)} idx={i + 1} trackData={trackData} />
            ))}
          </TracksWrapper>
          <PlaylistButton tracks={tracks} />
        </>
      )}
    </Wrapper>
  );
};
