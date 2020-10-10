import React from 'react';
import styled from 'styled-components';
import { getRedirectUri, login } from '../apiUtils';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.div`
  font-family: 'Damion', cursive;
  font-size: 100px;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
`;

const BigButton = styled.button`
  font-family: inherit;
  font-size: 15px;
  border: none;
  border-radius: 7px;
  background-color: #1db954;
  color: white;
  height: 50px;
  width: 200px;
  cursor: pointer;
  outline: none;
  display: block;
  margin-bottom: 1rem;

  &:hover {
    background-color: #2ad666;
    transition: background-color, 0.5s;
  }
`;

const ButtonWrappers = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Subtitle = styled.span`
  text-align: center;
`;

const redirectToApp = () => {
  window.location.href = getRedirectUri();
};

export default () => (
  <Wrapper>
    <MainTitle>Moodify</MainTitle>
    <Subtitle>Discover music that fits your mood</Subtitle>
    <ButtonWrappers>
      <BigButton onClick={redirectToApp}>Start</BigButton>
      <BigButton onClick={login}>Connect With Spotify</BigButton>
    </ButtonWrappers>
  </Wrapper>
);
