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
    dispatch(setAccessToken(accessToken));
  }, [dispatch, location]);

  return tracks ? <ResultsView /> : <SelectorView />;
};
