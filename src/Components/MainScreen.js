import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ResultsView from './ResultsView';
import SelectorView from './SelectorView';
import { setAccessToken, setTracks } from '../reducer';
const qs = require('query-string');

export default ({ location }) => {
  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.tracks);
  useEffect(() => {
    const accessToken = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
    dispatch(setAccessToken(accessToken));
    const tracks = JSON.parse(window.localStorage.getItem('tracks'));
    if (tracks) {
      dispatch(setTracks(tracks));
    }
    window.history.replaceState('app', 'app', '/app');
  }, [dispatch, location]);

  return tracks && tracks.length > 0 ? <ResultsView /> : <SelectorView />;
};
