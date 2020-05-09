import React, { useState } from "react";
import Emoticon from "./Emoticon";

const formatTrackName = (trackName) => {
  const maxLength = 35;
  if (trackName.length > maxLength) {
    return trackName.substring(0, maxLength - 3) + "...";
  } else {
    return trackName;
  }
};

export default ({ idx, trackData }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="track"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <Emoticon valence={trackData.valence} size={50} />
      ) : (
        <div className="trackIndex">{idx}</div>
      )}
      <div className="trackDetails">
        <div className="artist">{trackData.artists[0].name}</div>
        <div className="trackName">{formatTrackName(trackData.name)}</div>
      </div>
    </div>
  );
};
