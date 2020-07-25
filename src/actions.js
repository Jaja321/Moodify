import { setTracks, setLoading } from './reducer';

const baseRecommendationsUri = 'https://api.spotify.com/v1/recommendations';

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

export const getRecommendations = () => async (dispatch, getState) => {
  const { accessToken, selectedGenres, audioProperties } = getState();
  if(selectedGenres.length === 0) {
    dispatch(setTracks(null));
    return;
  }
  const headers = getHeaders(accessToken);
  dispatch(setLoading(true));
  const res = await fetch(getRecommendationsUri(audioProperties, selectedGenres), { headers }).then((response) => response.json());
  if(!res || (res.error && res.error.status === 401)) {
    //unauthorized, go back to home page
    window.location.href = '/';
    return;
  }
  if(res.error && res.error.status === 429) {
    setTimeout(() => dispatch(getRecommendations()), res.headers['Retry-After'] * 1000);
    return;
  }
  const tracks = res.tracks.map(track => ({
    name: track.name,
    artist: track.artists[0].name,
    id: track.id,
    imageUrl: track.album.images[2].url,
    uri: track.uri
  }));
  dispatch(setTracks(tracks));
  dispatch(setLoading(false));
};
