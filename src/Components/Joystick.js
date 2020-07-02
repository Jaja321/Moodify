import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const CIRCLE_SIZE = 25;
const SIZE = 300;

const Circle = styled.div`
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  ${({ x, y }) => `
    top: ${y - CIRCLE_SIZE / 2}px;
    left: ${x - CIRCLE_SIZE / 2}px;
  `}
  cursor: pointer;
`;

const valueToCoord = (value) => Math.round(value * SIZE);

export default ({x, y}) => {
  // const { energy, valence } = useSelector(state => state.audioProperties);

  return <Circle x={x} y={y} />;
};
