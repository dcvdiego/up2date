import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Logo } from '../logo';

const FooterContainer = styled.div`
  min-height: 30em;
  background-color: rgb(34 9 79);
  ${tw`
    flex
    min-w-full
    pt-4
    md:pt-12
    pb-1
    items-center
    justify-center
    `};
`;

const InnerContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    max-w-screen-2xl
`}
`;

const AboutContainer = styled.div`
  ${tw`
    flex
    flex-col
    `}
`;

export function Footer() {
  return (
    <FooterContainer>
      <InnerContainer>
        <AboutContainer>
          <Logo color="white" />
        </AboutContainer>
      </InnerContainer>
    </FooterContainer>
  );
}
