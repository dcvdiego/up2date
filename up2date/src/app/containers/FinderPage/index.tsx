import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Footer } from '../../components/footer';
import { Marginer } from '../../components/marginer';
import { Navbar } from '../../components/navbar';
import { SearchBar } from '../../components/searchbar';

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

const Title = styled.h1`
  ${tw`
    text-black
    text-2xl
    md:text-5xl
    font-extrabold
    md:font-black
    md:leading-normal
    `};
`;

const DescriptionContainer = styled.div`
  margin-top: 2em;
  ${tw`
  w-full
  max-w-screen-2xl
  flex
  justify-between
  pl-3
  pr-3
  lg:pl-12
  lg:pr-12
  
  `}
`;

const PageDescription = styled.p`
  ${tw`
  text-xs
  lg:text-sm
  xl:text-lg
  sm:max-h-full
  overflow-hidden
  max-h-12
  text-gray-800
  `};
`;

export function FinderPage() {
  return (
    <PageContainer>
      <Navbar />
      <Title>Find the tutorial you need:</Title>
      <DescriptionContainer>
        <PageDescription>
          You can use the Local Search to find tutorials uploaded directly to
          this site (usually not found on YouTube) You can also search for
          tutorials in YouTube directly and see if we have any up2date changes
          for you!
        </PageDescription>
      </DescriptionContainer>
      <Marginer direction="vertical" margin="6em" />
      <h3>Local Search</h3>
      <SearchBar source="Local" />
      <Marginer direction="vertical" margin="8em" />
      <h3>Youtube Search</h3>
      <SearchBar source="Youtube" />
      <Marginer direction="vertical" margin="8em" />
      <Footer />
    </PageContainer>
  );
}
