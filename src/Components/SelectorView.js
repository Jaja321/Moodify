import React from 'react';
import styled from 'styled-components';
import MoodSelector from './MoodSelector';
import GenreSelector from './GenreSelector';
import DiscoverButton from './DiscoverButton';
import { BigTitle, SmallTitle } from './Typography';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => (
  <Wrapper>
    <BigTitle>What's your mood?</BigTitle>
    <MoodSelector />
    <SmallTitle>Choose up to 5 genres:</SmallTitle>
    <GenreSelector />
    <DiscoverButton />
  </Wrapper>
);
