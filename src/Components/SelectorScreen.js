import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Track from './Track';
import { useDispatch, useSelector } from 'react-redux';
import { getTracks } from '../actions';
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

const getFittingTracks = (tracks, valence, energy) => {
  return tracks
    .map((track) => {
      const dist = Math.sqrt(Math.pow(track.valence - valence, 2) + Math.pow(track.energy - energy, 2));
      return { track, dist };
    })
    .sort((a, b) => a.dist - b.dist)
    .map((obj) => obj.track)
    .slice(0, 10);
};

export default ({ location }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const tracks = useSelector((state) => state.tracks);
  const selectedGenres = useSelector((state) => state.selectedGenres);
  const accessToken = useSelector((state) => state.accessToken);

  //const { valence, energy } = useSelector((state) => state.audioProperties);

  useEffect(() => {
    // if (!location.hash) {
    //   window.location.replace('/');
    // }
    //window.history.replaceState('mood', 'mood', '/mood');
    const accessToken = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
    dispatch(setAccessToken(accessToken));

    //dispatch(getTracks());
  }, [dispatch, location]);

  const topTracks = tracks.slice(0, 12);

  //const fittingTracks = getFittingTracks(tracks, valence, energy);

  return (
    <Wrapper>
      <h2>What's your mood?</h2>
      <MoodSelector />
      <GenreSelector />

      {selectedGenres.length > 0 && (
        <>
          <TracksWrapper>
            {topTracks.map((trackData, i) => (
              <Track key={'track' + (i + 1)} idx={i + 1} trackData={trackData} />
            ))}
          </TracksWrapper>
          <PlaylistButton tracks={topTracks} />
        </>
      )}
    </Wrapper>
  );
};
