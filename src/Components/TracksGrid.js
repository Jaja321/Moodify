import React from 'react';
import styled from 'styled-components';
import Track from './Track';

const Grid = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  min-width: 0;
  grid-template-columns: repeat(3, 250px);
  @media only screen and (max-width: 830px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 160px);
  }
  gap: 0.3rem;
`;

export default ({tracks}) => (
  <Grid>
    {tracks.map((trackData, i) => (
      <Track key={'track' + (i + 1)} trackData={trackData} />
    ))}
  </Grid>
);
