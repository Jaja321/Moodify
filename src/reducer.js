import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    tracks: [],
    loading: true,
    accessToken: null,
    audioProperties: {
      valence: 0.5,
      energy: 0.5
    }
  },
  reducers: {
    setTracks: (state, action) => {state.tracks = action.payload},
    setAccessToken: (state, action) => {state.accessToken = action.payload},
    setLoading: (state, action) => {state.loading = action.payload},
    setAudioProperties: (state, action) => {state.audioProperties = action.payload}
  }
});

export const { setTracks, setAccessToken, setLoading, setAudioProperties } = mainSlice.actions;

export default mainSlice.reducer;
