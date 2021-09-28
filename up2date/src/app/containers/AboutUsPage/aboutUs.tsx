import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SCREENS } from '../../components/responsive';
import YaBoiImg from '../../../assets/images/YaBoi.png';
const AboutUsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    items-center
    justify-center
    pt-4
    pb-4
    pr-7
    pl-7
    md:pl-0
    md:pr-0
    bg-white
    `};
`;

const MeContainer = styled.div`
  width: auto;
  height: 15em;
  margin-left: -30px;

  img {
    width: auto;
    height: 100%;
  }

  @media (min-width: ${SCREENS.md}) {
    height: 28em;
  }
  @media (min-width: ${SCREENS.lg}) {
    height: 30em;
  }
  @media (min-width: ${SCREENS['2xl']}) {
    height: 35em;
    margin-left: 0;
  }
`;

const InfoContainer = styled.div`
  ${tw`
    md:w-1/2
    flex
    flex-col
    md:ml-6
    2xl:ml-16
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

const InfoText = styled.p`
  ${tw`
    md:max-w-2xl
    text-sm
    md:text-base
    text-gray-500
    font-normal
    mt-4
    `};
`;

export default function AboutUs() {
  return (
    <AboutUsContainer>
      <MeContainer>
        <img src={YaBoiImg} alt="Creator profile pic" />
      </MeContainer>
      <InfoContainer>
        <Title>About Us</Title>
        <InfoText>
          As I was starting my internship at IBM, I was trying to learn as much
          as possible from various sources in tutorials. It was to my surprise
          that whenever I followed a tutorial that was 1 or even 2 years old
          there would be many problems just because it is outdated. Technology
          prospers and innovates, and so should our skills. That is why I made
          this website, also because I grew tired of hours of debugging only to
          find that it doesn't work with the latest version haha.
        </InfoText>
      </InfoContainer>
    </AboutUsContainer>
  );
}
