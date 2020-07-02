import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { setAudioProperties } from '../reducer';
import { useDispatch } from 'react-redux';
import Joystick from './Joystick';

const SIZE = 300;
const CIRCLE_SIZE = 25;

const Square = styled.div`
  height: ${SIZE}px;
  width: ${SIZE}px;
  border: 1px solid white;
  border-radius: 20px;
  margin-top: 2rem;
  position: relative;
  margin-bottom: 26px;
`;

const xLabel = styled.div`
  width: 100%;
  text-align: center;
`;

const yLabel = styled.div`
  position: absolute;
  top: ${SIZE / 2 - 8}px;
`;

const TopLabel = styled(xLabel)`
  position: relative;
  top: -1.5rem;
`;

const BottomLabel = styled(xLabel)`
  position: absolute;
  top: ${SIZE + 5}px;
`;

const LeftLabel = styled(yLabel)`
  left: -35px;
`;

const RightLabel = styled(yLabel)`
  left: ${SIZE + 5}px;
`;

const normalizeCoord = (coord) => Math.min(Math.max(0 + CIRCLE_SIZE / 2, coord), SIZE - CIRCLE_SIZE / 2);

const coordToValue = (value) => value / SIZE;

export default () => {
  const dispatch = useDispatch();
  const [isPointerDown, setPointerDown] = useState(false);
  const [{ x, y }, setCoords] = useState({ x: SIZE / 2, y: SIZE / 2 });

  useEffect(() => {
    const mouseUpHandler = () => {
      if (isPointerDown) {
        setPointerDown(false);
        dispatch(
          setAudioProperties({
            valence: coordToValue(x),
            energy: 1 - coordToValue(y),
          })
        );
      }
    };
    document.addEventListener('mouseup', mouseUpHandler);
    return () => document.removeEventListener('mouseup', mouseUpHandler);
  }, [isPointerDown, x, y, dispatch]);

  return (
    <Square
      onMouseDown={(e) => {
        e.preventDefault();
        setPointerDown(true);
      }}
      onMouseMove={(e) => {
        if (isPointerDown) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = normalizeCoord(e.clientX - rect.left);
          const y = normalizeCoord(e.clientY - rect.top);
          setCoords({ x, y });
          // const valence = coordToValue(e.clientX - rect.left);
          // const energy = coordToValue(e.clientY - rect.top);
          // dispatch(setAudioProperties({
          //   valence,
          //   energy
          // }));
        }
      }}
    >
      <TopLabel>Energetic</TopLabel>
      <BottomLabel>Calm</BottomLabel>
      <LeftLabel>Sad</LeftLabel>
      <RightLabel>Happy</RightLabel>
      <Joystick x={x} y={y} />
    </Square>
  );
};
