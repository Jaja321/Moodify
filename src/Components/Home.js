import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.h1`
  font-family: 'Damion', cursive;
  font-size: 100px;
`;

const LoginButton = styled.button`
  font-family: inherit;
  font-size: 15px;
  border: none;
  border-radius: 7px;
  background-color: #1db954;
  color: white;
  height: 50px;
  width: 200px;
  cursor: pointer;
  outline:none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    background-color: #2ad666;
    transition: background-color, 0.5s;
    &::before {
      content: "Connect with Spotify";
    }
  }

  &::before {
    content: "Start";
  }
`;

const login = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  let redirectUri;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    redirectUri = 'http://localhost:3000/mood';
  } else {
    redirectUri = 'https://moodify.benmiz.com/mood';
  }
  const scope = 'user-read-recently-played,user-top-read,playlist-modify-public';
  const authUri = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
  window.location.replace(authUri);
};

export default () => (
  <Wrapper>
    <MainTitle>Moodify</MainTitle>
    <LoginButton onClick={() => login()} />
  </Wrapper>
);
