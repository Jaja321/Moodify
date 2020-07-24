import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  width: 250px;
  display: flex;
  height: 80px;
  align-items: center;
  transition: opacity .5s;
  opacity: ${({ loading }) => (loading ? '0' : '1')};
  cursor: pointer;
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
  const loading = useSelector(state => state.loading);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);

    //In case image onload is not triggered for whatever reason.
    const timer = setTimeout(() => setImageLoaded(true), 700);
    return () => clearTimeout(timer);
  }, [trackData]);

  const clickHandler = () => {
    console.log('trackData', trackData);
    window.open(`https://open.spotify.com/track/${trackData.id}`);
  }

  return (
    <Wrapper loading={loading || !imageLoaded} onClick={clickHandler}>
      <Thumbnail src={trackData.imageUrl} onLoad={() => setImageLoaded(true)}/>
      <TrackDetails>
        <ArtistLabel>{trackData.artist}</ArtistLabel>
        <TrackNameLabel>{formatTrackName(trackData.name)}</TrackNameLabel>
      </TrackDetails>
    </Wrapper>
  );
};
