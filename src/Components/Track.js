import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 250px;
  display: flex;
  height: 80px;
  align-items: center;
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
`;

const Thumbnail = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 5px;
`;

const ArtistLabel = styled.div`
  font-size: 14px;
`;

const TrackNameLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const formatTrackName = (trackName) => {
  const maxLength = 35;
  if (trackName.length > maxLength) {
    return trackName.substring(0, maxLength - 3) + '...';
  } else {
    return trackName;
  }
};

export default ({ idx, trackData }) => {
  //const [hover, setHover] = useState(false);
  console.log(trackData);

  return (
    <Wrapper>
      <Thumbnail src={trackData.album.images[2].url} />
      <TrackDetails>
        <ArtistLabel>{trackData.artists[0].name}</ArtistLabel>
        <TrackNameLabel>{formatTrackName(trackData.name)}</TrackNameLabel>
      </TrackDetails>
    </Wrapper>
  );
};
