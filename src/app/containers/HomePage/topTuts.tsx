import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ITutorial } from '../../../typings/tutorial';
import { Tutorial } from '../../components/tutorial';
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../components/responsive';
import tutorialService from '../../services/tutorialService';

const TopTutsContainer = styled.div`
  ${tw`
    max-w-screen-lg
    w-full
    flex
    flex-col
    items-center
    justify-center
    pr-4
    pl-4
    md:pl-0
    md:pr-0
    mb-10
    `};
`;

const Title = styled.h2`
  ${tw`
    text-3xl
    lg:text-5xl
    text-black
    font-extrabold
    `};
`;

const TutsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
    `};
`;

export function TopTuts() {
  const [current, setCurrent] = useState(0);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const fetchTopTutorials = async () => {
    const tutorials = await tutorialService.getTutorials().catch((err) => {
      console.log('error', err);
    });

    console.log('tutorials:', tutorials);
  };

  const testTutorial1: ITutorial = {
    name: 'Full MERN Website from Zero to Deployment',
    thumbnailSrc:
      'https://i.ytimg.com/an_webp/4ELH8CT4J0A/mqdefault_6s.webp?du=3000&sqp=CIDasYoG&rs=AOn4CLAVZHqFNtR9fi0SbnFaSeCY-wy-kg',
    language: 'React, NodeJS, GraphQL, Tailwind, Docker',
    lastUpdated: 'Last Updated: 23/09/21',
    uploadDate: 'Date Uploaded: 01/06/21',
  };
  const testTutorial2: ITutorial = {
    name: 'How to use a .env file',
    thumbnailSrc:
      'https://i.ytimg.com/vi/qTU7w3bWrOk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGL1feC2Hljnq54hNB1kNsn2YFQQ',
    language: 'VS Code',
    lastUpdated: 'Last Updated: 23/09/21',
    uploadDate: 'Date Uploaded: 16/09/21',
  };

  useEffect(() => {
    fetchTopTutorials();
  }, []);

  const tutorials = [
    <Tutorial {...testTutorial1} />,
    <Tutorial {...testTutorial2} />,
    <Tutorial {...testTutorial1} />,
    <Tutorial {...testTutorial2} />,
    <Tutorial {...testTutorial1} />,
    <Tutorial {...testTutorial2} />,
  ];

  const numberOfDots = isMobile
    ? tutorials.length
    : Math.ceil(tutorials.length / 3);

  return (
    <TopTutsContainer>
      <Title>Explore popular tutorials</Title>
      <TutsContainer>
        <Carousel
          value={current}
          onChange={setCurrent}
          slides={tutorials}
          plugins={[
            'clickToChange',
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 3,
              },
            },
          ]}
          breakpoints={{
            640: {
              plugins: [
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 1,
                  },
                },
              ],
            },
            900: {
              plugins: [
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 2,
                  },
                },
              ],
            },
          }}
        />
        <Dots value={current} onChange={setCurrent} number={numberOfDots} />
      </TutsContainer>
    </TopTutsContainer>
  );
}
