import React, { useState, useEffect } from "react";
import Track from "./Track";
import Emoticon from "./Emoticon";
import ShareButton from "./ShareButton";
const qs = require("query-string");

const recentlyPlayedUri = "https://api.spotify.com/v1/me/player/recently-played";
const audioFeaturesUri = "https://api.spotify.com/v1/audio-features";

const getTracksIdList = (tracks) => tracks.map((track) => track.id).join(",");

const getAverageValence = (tracks) => {
  return 0.5 * tracks[0].valence + 0.25 * tracks[1].valence + 0.15 * tracks[2].valence + 0.1 * tracks[3].valence;
};

export default ({ location }) => {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    if (!location.hash) {
      window.location.replace("/");
    }
    const accessToken = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
    const headers = { Authorization: "Bearer " + accessToken };
    window.history.replaceState("mood", "mood", "/mood");

    (async () => {
      const recentlyPlayedTracks = (
        await fetch(recentlyPlayedUri, { headers }).then((response) => response.json())
      ).items
        .slice(0, 5)
        .map((item) => item.track);
      const audioFeatures = (
        await fetch(`${audioFeaturesUri}?ids=${getTracksIdList(recentlyPlayedTracks)}`, { headers }).then((response) =>
          response.json()
        )
      ).audio_features;
      audioFeatures.forEach((track, i) => (recentlyPlayedTracks[i].valence = track.valence));
      setState({
        tracksData: recentlyPlayedTracks,
        loading: false,
      });
    })();
  }, [location]);

  if (state.loading) {
    return (
      <div className="wrapper">
        <h1>Analyzing...</h1>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <h2>
          <span>Based on what you've listned to recently, your mood is</span>
        </h2>
        <div className="resultEmoticon">
          <Emoticon valence={getAverageValence(state.tracksData)} size={100} />
        </div>
        <div id="tracks">
          <div style={{ fontSize: 28 }}>Recently played tracks</div>
          {state.tracksData.map((trackData, i) => (
            <Track key={"track" + (i + 1)} idx={i + 1} trackData={trackData} />
          ))}
        </div>
        <div className="footer">
          <ShareButton score={getAverageValence(state.tracksData)} />
        </div>
      </div>
    );
  }
};
