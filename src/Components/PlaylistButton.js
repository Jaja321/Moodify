import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylistId } from '../reducer';
import spotifyIcon from '../assets/spotify_icon.png';

const getHeaders = (accessToken) => ({
  Authorization: 'Bearer ' + accessToken,
  'Content-Type': 'application/json',
});

const populatePlaylist = async (playlistId, tracks, accessToken) => {
  const populatePlaylistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  await fetch(populatePlaylistUrl, {
    method: 'PUT',
    headers: getHeaders(accessToken),
    body: JSON.stringify({
      uris: tracks.map((track) => track.uri),
    }),
  });
  //TODO handle error
};

const createPlaylist = async (accessToken, userId) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const res = await fetch(url, {
    method: 'POST',
    headers: getHeaders(accessToken),
    body: JSON.stringify({
      name: 'My Moodify Playlist',
    }),
  }).then((res) => res.json());
  //TODO handle error
  return res.id;
};

const Button = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SpotifyIcon = styled.img`
  height: 1.2rem;
  width: 1.2rem;
  margin-left: .5rem;
`;

export default ({ tracks }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);
  let playlistId = useSelector((state) => state.playlistId);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const res = await fetch('https://api.spotify.com/v1/me', {
        headers: getHeaders(accessToken),
      }).then((res) => res.json());
      //TODO: handle error
      return res.id;
    };
    getUserId().then((id) => setUserId(id));
  }, [accessToken]);

  const openPlaylist = useCallback(async () => {
    if (!playlistId) {
      playlistId = await createPlaylist(accessToken, userId);
      dispatch(setPlaylistId(playlistId));
    }
    await populatePlaylist(playlistId, tracks, accessToken);
    const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
    window.open(playlistUrl);
  }, [tracks, accessToken, playlistId, dispatch, userId]);

  return (
    <Button onClick={openPlaylist} disabled={!!userId}>
      Create Playlist
      <SpotifyIcon src={spotifyIcon} alt="Spotify Logo"/>
    </Button>
  );
};
