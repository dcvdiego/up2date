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

export function FinderPage() {
  return (
    <PageContainer>
      <Navbar />
      <Title>Find the tutorial you need:</Title>
      <Marginer direction="vertical" margin="4em" />
      <h3>Local Search</h3>
      <SearchBar source="Local" />
      <Marginer direction="vertical" margin="4em" />
      <h3>Youtube Search</h3>
      <SearchBar source="Youtube" />
      <Marginer direction="vertical" margin="4em" />
      <Footer />
    </PageContainer>
  );
}
