import { createSlice } from '@reduxjs/toolkit';

const setStoreVariable = (key) => (state, action) => {state[key] = action.payload};

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    tracks: [],
    loading: true,
    accessToken: null,
    audioProperties: {
      valence: 0.5,
      energy: 0.5,
    },
    selectedGenres: []
  },
  reducers: {
    setTracks: setStoreVariable('tracks'),
    setAccessToken: setStoreVariable('accessToken'),
    setLoading: setStoreVariable('loading'),
    setAudioProperties: setStoreVariable('audioProperties'),
    setSelectedGenres: setStoreVariable('selectedGenres'),
  },
});

export const { setTracks, setAccessToken, setLoading, setAudioProperties, setSelectedGenres } = mainSlice.actions;

export default mainSlice.reducer;
