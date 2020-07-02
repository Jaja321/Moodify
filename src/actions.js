import { setTracks, setLoading } from "./reducer";

const audioFeaturesUri = "https://api.spotify.com/v1/audio-features";
const topTracksUri = "https://api.spotify.com/v1/me/top/tracks?limit=50";
const timeRanges = ["short_term", "medium_term", "long_term"];

const getAudioFeatures = async (ids, headers) => {
  return (
    await fetch(`${audioFeaturesUri}?ids=${getTracksIdList(ids)}`, { headers }).then((response) =>
      response.json()
    )
  ).audio_features;
};

const getTracksIdList = (tracks) => tracks.map((track) => track.id).join(",");

export const getTracks = (accessToken) => async (dispatch) => {
  const headers = { Authorization: "Bearer " + accessToken };
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
  console.log("topTracks", topTracks);
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
