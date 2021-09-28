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
      <SearchBar />
      <Marginer direction="vertical" margin="4em" />
      <Footer />
    </PageContainer>
  );
}
