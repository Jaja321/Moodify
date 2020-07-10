import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Track from './Track';
import { useDispatch, useSelector } from 'react-redux';
import { getTracks } from '../actions';
import MoodSelector from './MoodSelector';
import { setAccessToken } from '../reducer';
import GenreSelector from './GenreSelector';
const qs = require('query-string');

const TracksWrapper = styled.div`
  height: 450px;
  width: 400px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const NoGenreMessage = styled.div`
  margin-top: 3rem;
  font-size: 1.5rem;
`;

const PlaylistButton = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
`;

const createPlaylist = (accessToken, tracks) => async () => {
  const url = 'https://api.spotify.com/v1/users/vvjajavv/playlists';
  const baseOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    }
  };
  const playlist = await fetch(url, {
    ...baseOptions,
    body: JSON.stringify({
      name: 'My Moodify Playlist'
    }),
  }).then((res) => res.json());
  const populatePlaylistUrl = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
  await fetch(populatePlaylistUrl, {
    ...baseOptions,
    body: JSON.stringify({
      uris: tracks.map(track => track.uri)
    }),
  }).then((res) => res.json());
  const playlistLink = `https://open.spotify.com/playlist/${playlist.id}`;
  window.open(playlistLink);
};

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

  const topTracks = tracks.slice(0, 10);

  //const fittingTracks = getFittingTracks(tracks, valence, energy);

  return (
    <div className="wrapper">
      <h2>What's your mood?</h2>
      <MoodSelector />
      <GenreSelector />

      {selectedGenres.length > 0 ? (
        <TracksWrapper>
          {topTracks.map((trackData, i) => (
            <Track key={'track' + (i + 1)} idx={i + 1} trackData={trackData} />
          ))}
        </TracksWrapper>
      ) : (
        <NoGenreMessage>Choose one or more genres</NoGenreMessage>
      )}
      <PlaylistButton onClick={createPlaylist(accessToken, topTracks)}>Create a Playlist</PlaylistButton>
    </div>
  );
};
