import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Footer } from '../../components/footer';
import { Marginer } from '../../components/marginer';
import { Navbar } from '../../components/navbar';
import AboutUs from './aboutUs';

const PageContainer = styled.div`
  ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `};
`;

export function AboutUsPage() {
  return (
    <PageContainer>
      <Navbar />
      <AboutUs />
      <Marginer direction="vertical" margin="4em" />
      <Footer />
    </PageContainer>
  );
}
