import { setTracks, setLoading } from './reducer';
import { shuffleArray } from './utils';

const baseRecommendationsUri = 'https://api.spotify.com/v1/recommendations';
const baseServerUri = 'https://us-central1-moodify-c2a16.cloudfunctions.net/getSongs';

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

const getServerUri = (genres, valence, energy) =>
  `${baseServerUri}?genres=${genres}&valence=${valence}&energy=${energy}`;

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
    setTimeout(
      async () => await getTracksFromSpotify(accessToken, genres, audioProperties, attempt),
      timeoutSeconds * 1000
    );
    return;
  }
  const tracks = (await res.json()).tracks;
  if (tracks.length < 12 && attempt < 8) {
    return await getTracksFromSpotify(accessToken, genres, audioProperties, attempt + 1);
  }
  return tracks.map((track) => {
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
};

const getTracksFromServer = async (genres, audioProperties) => {
  const { valence, energy } = audioProperties;
  const res = await fetch(getServerUri(genres.join(','), valence, energy)).then((res) => res.json());
  if (!res || res.error) {
    //unauthorized, go back to home page
    window.location.href = '/';
    return;
  }
  return res;
};

export const getRecommendations = async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { accessToken, selectedGenres, audioProperties } = getState();
  if (selectedGenres.length === 0) {
    dispatch(setTracks(null));
    return;
  }
  let tracks;
  if (accessToken) {
    tracks = await getTracksFromSpotify(accessToken, selectedGenres, audioProperties);
  } else {
    tracks = await getTracksFromServer(selectedGenres, audioProperties);
  }
  shuffleArray(tracks);
  dispatch(setTracks(tracks));
  dispatch(setLoading(false));
};
