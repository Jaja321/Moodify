import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ResultsView from './ResultsView';
import SelectorView from './SelectorView';
import { setAccessToken } from '../reducer';
const qs = require('query-string');

export default ({ location }) => {
  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.tracks);
  useEffect(() => {
    const accessToken = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
    if (!accessToken) {
      window.location.href = '/';
      return;
    }
    dispatch(setAccessToken(accessToken));
    window.history.replaceState('app', 'app', '/app');
  }, [dispatch, location]);

  return tracks && tracks.length > 0 ? <ResultsView /> : <SelectorView />;
};
