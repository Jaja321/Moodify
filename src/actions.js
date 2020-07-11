import { setTracks, setLoading } from './reducer';

const audioFeaturesUri = 'https://api.spotify.com/v1/audio-features';
const topTracksUri = 'https://api.spotify.com/v1/me/top/tracks?limit=50';
const baseRecommendationsUri = 'https://api.spotify.com/v1/recommendations';
const timeRanges = ['short_term', 'medium_term', 'long_term'];

const getHeaders = (accessToken) => ({ Authorization: 'Bearer ' + accessToken });

const getRecommendationsUri = (audioProperties, selectedGenres) => {
  let { energy, valence } = audioProperties;
  energy = Math.max(0.25, energy);
  valence = Math.max(0.25, valence);
  const minEnergy = Math.max(0, energy - 0.1);
  const maxEnergy = Math.min(1, energy + 0.1);
  const minValence = Math.max(0, valence - 0.1);
  const maxValence = Math.min(1, valence + 0.1);
  const genreList = selectedGenres.map(genre => genre.toLowerCase()).join(',');
  return `${baseRecommendationsUri}?seed_genres=${genreList}&min_energy=${minEnergy}&max_energy=${maxEnergy}&min_valence=${minValence}&max_valence=${maxValence}`;
};

const getAudioFeatures = async (ids, headers) => {
  return (
    await fetch(`${audioFeaturesUri}?ids=${getTracksIdList(ids)}`, { headers }).then((response) => response.json())
  ).audio_features;
};

const getTracksIdList = (tracks) => tracks.map((track) => track.id).join(',');

export const getTracks = () => async (dispatch, getState) => {
  const { accessToken } = getState();
  const headers = getHeaders(accessToken);
  const topTracksSet = {};
  (
    await Promise.all(
      timeRanges.map((timeRange) =>
        fetch(`${topTracksUri}&time_range=${timeRange}`, { headers }).then((response) => response.json())
      )
    )
  ).forEach((tracks) => {
    tracks.items.forEach((track) => {
      topTracksSet[track.id] = track;
    });
  });
  const topTracks = Object.values(topTracksSet);
  const firstPart = await getAudioFeatures(topTracks.slice(0, 99), headers);
  const secondPart = await getAudioFeatures(topTracks.slice(99, 150), headers);
  const audioFeatures = [...firstPart, ...secondPart];
  audioFeatures.forEach((track, i) => {
    topTracks[i].valence = track.valence;
    topTracks[i].energy = track.energy;
  });
  dispatch(setTracks(topTracks));
  dispatch(setLoading(false));
};

export const getRecommendations = () => async (dispatch, getState) => {

  //const accessToken = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
  const { accessToken, selectedGenres, audioProperties } = getState();
  if(selectedGenres.length === 0) {
    return null;
  }
  const headers = getHeaders(accessToken);
  dispatch(setLoading(true));
  const res = await fetch(getRecommendationsUri(audioProperties, selectedGenres), { headers }).then((response) => response.json());
  if(res.error && res.error.status === 401) {
    //unauthorized, go back to home page
    window.location.href = '/';
    return;
  }
  console.log(
    'recommendations',
    res.tracks.map((track) => track.name + ' - ' + track.artists[0].name)
  );
  dispatch(setTracks(res.tracks)); //TODO: map the tracks to only include relevant data.
  dispatch(setLoading(false));
};
