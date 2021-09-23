import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Footer } from '../../components/footer';
import { Marginer } from '../../components/marginer';
import { Navbar } from '../../components/navbar';
import { DevSteps } from './devSteps';
import { StudentSteps } from './studentSteps';
import { TopSection } from './topSection';
import { TopTuts } from './topTuts';

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

export function HomePage() {
  return (
    <PageContainer>
      <Navbar />
      <TopSection />
      <Marginer direction="vertical" margin="8em" />
      <StudentSteps />
      <Marginer direction="vertical" margin="8em" />
      <DevSteps />
      <Marginer direction="vertical" margin="8em" />
      <TopTuts />
      <Footer />
    </PageContainer>
  );
}
