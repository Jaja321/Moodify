import React from 'react';
import styled from 'styled-components';
import Track from './Track';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.5rem;
  min-width: 0;
`;

export default ({tracks}) => (
  <Wrapper>
    {tracks.map((trackData, i) => (
      <Track key={'track' + (i + 1)} idx={i + 1} trackData={trackData} />
    ))}
  </Wrapper>
);
