import React from 'react';
import styled from 'styled-components';

const Face = styled.img`
  ${({ size }) => `
    height: ${size}px;
    width: ${size}px;
  `}
`;

const energyToString = (energy) => {
  switch (true) {
    case energy > 0.7:
      return 'energetic';
    case energy > 0.3:
      return 'neutral';
    default:
      return 'calm';
  }
};

const valenceToString = (valence) => {
  switch (true) {
    case valence > 0.8:
      return 'happy';
    case valence > 0.5:
      return 'slightly-happy';
    case valence === 0.5:
      return 'neutral';
    case valence > 0.2:
      return 'slightly-sad';
    default:
      return 'sad';
  }
};

export default ({ valence, energy, size }) => {
  const happy = require(`../assets/${energyToString(energy)}_${valenceToString(valence)}.svg`);

  return <Face src={happy} size={size} />;
};
