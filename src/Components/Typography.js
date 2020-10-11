import styled from 'styled-components';

export const SmallText = styled.div`
  font-size: .8rem;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem;
  @media only screen and (max-width: 600px) {
    margin: 0.3rem;
  }
`;

export const BigTitle = styled(Title)`
  font-size: 1.5rem;
  @media only screen and (max-width: 600px) {
    font-size: 1.125rem;
  }
`;

export const SmallTitle = styled(Title)`
  font-size: 1.1rem;
  @media only screen and (max-width: 600px) {
    font-size: 0.825rem;
  }
`;