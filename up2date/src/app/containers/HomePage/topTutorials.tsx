import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Tutorial } from '../../components/tutorial';
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../components/responsive';
import tutorialService from '../../services/tutorialService';
import { Dispatch } from 'redux';
import { GetTutorials_tutorials } from '../../services/tutorialService/__generated__/GetTutorials';
import { setTopTutorials } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectTopTutorials } from './selectors';
import { MoonLoader } from 'react-spinners';
const TopTutorialsContainer = styled.div`
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

const TutorialsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
    `};
`;

const EmptyTutorials = styled.div`
  ${tw`
  w-full
    flex
    justify-center
    items-center
    text-sm
    text-gray-500
  `}
`;
const LoadingContainer = styled.div`
  ${tw`
  w-full
  mt-9
    flex
    justify-center
    items-center
    text-base
    text-black
  `}
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setTopTutorials: (tutorials: GetTutorials_tutorials[]) =>
    dispatch(setTopTutorials(tutorials)),
});

const stateSelector = createSelector(
  makeSelectTopTutorials,
  (topTutorials) => ({
    topTutorials,
  })
);

export function TopTutorials() {
  const [current, setCurrent] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const { topTutorials } = useSelector(stateSelector);
  const { setTopTutorials } = actionDispatch(useDispatch());

  const fetchTopTutorials = async () => {
    setLoading(true);
    const tutorials = await tutorialService.getTutorials().catch((err) => {
      console.log('error', err);
    });

    if (tutorials) setTopTutorials(tutorials);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopTutorials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmptyTopTutorials = !topTutorials || topTutorials.length === 0;

  const tutorials =
    (!isEmptyTopTutorials &&
      topTutorials.map((tutorial) => (
        <Tutorial
          {...tutorial}
          thumbnailSrc={tutorial.thumbnailSrc}
          source="Local"
        />
      ))) ||
    [];

  const numberOfDots = isMobile
    ? tutorials.length
    : Math.ceil(tutorials.length / 3);

  return (
    <TopTutorialsContainer>
      <Title>Explore popular tutorials</Title>
      {isLoading && (
        <LoadingContainer>
          <MoonLoader loading size={20} />
        </LoadingContainer>
      )}
      {isEmptyTopTutorials && !isLoading && (
        <EmptyTutorials>No tutorials here, add one?</EmptyTutorials>
      )}
      {!isEmptyTopTutorials && !isLoading && (
        <TutorialsContainer>
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
        </TutorialsContainer>
      )}
    </TopTutorialsContainer>
  );
}
