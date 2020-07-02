import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Track from './Track';
import { useDispatch, useSelector } from 'react-redux';
import { getTracks } from '../actions';
import MoodSelector from './MoodSelector';
const qs = require('query-string');

const TracksWrapper = styled.div`
  height: 450px;
  width: 600px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
  console.log('SelectorScreen rendered');
  const { valence, energy } = useSelector((state) => state.audioProperties);

  useEffect(() => {
    // if (!location.hash) {
    //   window.location.replace('/');
    // }
    const accessToken = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
    //window.history.replaceState('mood', 'mood', '/mood');

    dispatch(getTracks(accessToken));
  }, [location, dispatch]);

  const fittingTracks = getFittingTracks(tracks, valence, energy);

  if (loading) {
    return (
      <div className="wrapper">
        <h1>Analyzing...</h1>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <h2>What's your mood?</h2>
        <MoodSelector />
        <TracksWrapper>
          {fittingTracks.map((trackData, i) => (
            <Track key={'track' + (i + 1)} idx={i + 1} trackData={trackData} />
          ))}
        </TracksWrapper>
      </div>
    );
  }
};
