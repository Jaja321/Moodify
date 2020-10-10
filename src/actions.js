import { setTracks, setLoading } from './reducer';

const baseRecommendationsUri = 'https://api.spotify.com/v1/recommendations';

const getHeaders = (accessToken) => ({ Authorization: 'Bearer ' + accessToken });

const getPropertyInterval = (value, attempt) => {
  const diff = attempt * 0.05;
  const min = Math.max(0, value - diff);
  const max = Math.min(1, value + diff);
  return [min, max];
};

const getRecommendationsUri = (audioProperties, selectedGenres, attempt) => {
  const { energy, valence } = audioProperties;
  const [minEnergy, maxEnergy] = getPropertyInterval(energy, attempt);
  const [minValence, maxValence] = getPropertyInterval(valence, attempt);
  const genreList = selectedGenres.map((genre) => genre.toLowerCase()).join(',');
  return `${baseRecommendationsUri}?seed_genres=${genreList}&min_energy=${minEnergy}&max_energy=${maxEnergy}&min_valence=${minValence}&max_valence=${maxValence}`;
};

const getTracksFromSpotify = async (accessToken, genres, audioProperties, attempt = 1) => {
  const headers = getHeaders(accessToken);
  const res = await fetch(getRecommendationsUri(audioProperties, genres, attempt), {
    headers,
  });
  if (!res || (res.error && res.status === 401)) {
    //unauthorized, go back to home page
    window.location.href = '/';
    return;
  }
  if (res.error && res.status === 429) {
    const timeoutSeconds = res.headers.get('retry-after');
    setTimeout(() => dispatch(getRecommendations(attempt)), timeoutSeconds * 1000);
    return;
  }
  let tracks = res.tracks;
  if (tracks.length < 12 && attempt < 8) {
    dispatch(getRecommendations(attempt + 1));
    return;
  }
}

export const getRecommendations = (attempt = 1) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { accessToken, selectedGenres, audioProperties } = getState();
  if (selectedGenres.length === 0) {
    dispatch(setTracks(null));
    return;
  }
  const headers = getHeaders(accessToken);
  const res = await fetch(getRecommendationsUri(audioProperties, selectedGenres, attempt), {
    headers,
  }).then((response) => response.json());
  if (!res || (res.error && res.error.status === 401)) {
    //unauthorized, go back to home page
    window.location.href = '/';
    return;
  }
  if (res.error && res.error.status === 429) {
    setTimeout(() => dispatch(getRecommendations(attempt)), res.headers['Retry-After'] * 1000);
    return;
  }
  let tracks = res.tracks;
  if (tracks.length < 12 && attempt < 8) {
    dispatch(getRecommendations(attempt + 1));
    return;
  }
  tracks = res.tracks.map((track) => {
    const { name, artists, id, album, uri } = track;
    const albumCover = album.images[2];
    const imageUrl = albumCover ? albumCover.url : null;

    return {
      name,
      artist: artists[0].name,
      id,
      imageUrl,
      uri,
    };
  });
  dispatch(setTracks(tracks));
  dispatch(setLoading(false));
};
