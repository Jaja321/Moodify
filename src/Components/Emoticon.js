import React from 'react';
import styled from 'styled-components';

const Face = styled.div`
  ${({ size }) =>
    `
      height: ${size}px;
      width: ${size}px;
      border: ${Math.round(0.075 * size)}px solid white;
      border-radius: 50%;
      box-sizing: border-box;
    `}
`;

const Eye = styled.div`
  height: 15%;
  width: 15%;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 30%;
`;

const LeftEye = styled(Eye)`
  left: 25%;
`;

const RightEye = styled(Eye)`
  right: 25%;
`;

const Mouth = styled.div`
  border-color: white;
  border-style: solid;
  position: absolute;
`;

const NeutralMouth = styled(Mouth)`
  width: 20%;
  border-bottom-width: ${({ size }) => Math.round(0.01 * size)}px;
  bottom: 27%;
  left: 33%;
`;

const HappyMouth = styled(Mouth)`
  height: 50%;
  width: 50%;
  border-width: ${({ size }) => Math.round(0.075 * size)}px;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  bottom: 20%;
  left: 17.5%;
`;

const SadMouth = styled(HappyMouth)`
  border-top-color: white;
  border-bottom-color: transparent;
  top: 62%;
`;

const OpenMouth = styled(Mouth)`
  height: ${({ size }) => size / 20}px;
  width: ${({ size }) => size / 4}px;
  background-color: white;
  top: 60%;
  left: 30%;
`;

const VeryHappyMouth = styled(OpenMouth)`
  border-bottom-left-radius: ${({ size }) => size / 2}px;
  border-bottom-right-radius: ${({ size }) => size / 2}px;
`;

const VerySadMouth = styled(OpenMouth)`
  border-top-left-radius: ${({ size }) => size / 2}px;
  border-top-right-radius: ${({ size }) => size / 2}px;
  top: 58%;
`;

const getMouth = (valence) => {
  switch (true) {
    case valence > 0.8:
      return VeryHappyMouth;
    case valence > 0.6:
      return HappyMouth;
    case valence > 0.4:
      return NeutralMouth;
    case valence > 0.2:
      return SadMouth;
    default:
      return VerySadMouth;
  }
};

export default ({ valence, size }) => {
  const Mouth = getMouth(valence);
  return (
    <Face size={size}>
      <LeftEye size={size} />
      <RightEye size={size} />
      <Mouth size={size} />
    </Face>
  );
};
