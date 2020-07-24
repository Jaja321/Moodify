import React from 'react';
import styled from 'styled-components';

const BaseButton = styled.div`
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  cursor: pointer;
  color: white;
  @media only screen and (max-width: 600px) {
    margin: 0.3rem;
  }
`;

export default ({ children, ...props }) => {
  return <BaseButton {...props}>{children}</BaseButton>;
};
