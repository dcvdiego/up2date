import {
  faCalendarCheck,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ITutorial } from '../../../typings/tutorial';
import Button from '../button';

interface ITutorialProps extends ITutorial {}

const TutorialContainer = styled.div`
  width: 16.5em;
  min-height: 23em;
  max-height: 23em;
  box-shadow: 0 1.3px 17px -2px rgba(0, 0, 0, 0.4);
  ${tw`
    flex
    flex-col
    items-center
    p-3
    pb-4
    bg-white
    rounded-md
    m-1
    sm:m-3
    md:m-6
`};
`;

const TutorialThumbnail = styled.div`
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

const TutorialName = styled.h3`
  ${tw`
    text-base
    font-bold
    text-black
    mt-1
    mb-1
    `};
`;

const LanguageContainer = styled.div`
  ${tw`
    w-full
    flex
    justify-start
    mt-3
    `};
`;

const Language = styled.h5`
  ${tw`
        text-purple-500
        font-bold
        text-sm
    `};
`;

const SmallIcon = styled.span`
  ${tw`
    text-gray-400
    text-sm
    mr-1
    `};
`;

const TutorialDetailsContainer = styled.div`
  ${tw`
    flex
    w-full
    justify-between
    `};
`;

const TutorialDetail = styled.span`
  ${tw`
    flex
    items-center
    `};
`;

const TutorialInfo = styled.h6`
  ${tw`
    text-gray-400
    text-xs
    `};
`;

const Separator = styled.div`
  min-width: 100%;
  min-height: 1px;
  ${tw`
flex
bg-gray-300
mt-2
mb-2
`};
`;

const AccessButton = styled(Button)`
  ${tw`
min-w-full
mt-5
`};
`;

export function Tutorial(props: ITutorialProps) {
  const { name, thumbnailSrc, language, uploadDate, lastUpdated } = props;

  return (
    <TutorialContainer>
      <TutorialThumbnail>
        <img src={thumbnailSrc} />
      </TutorialThumbnail>
      <TutorialName>{name}</TutorialName>
      <LanguageContainer>
        <Language>{language}</Language>
      </LanguageContainer>
      <Separator />
      <TutorialDetailsContainer>
        <TutorialDetail>
          <SmallIcon>
            <FontAwesomeIcon icon={faCalendarPlus} />
          </SmallIcon>
          <TutorialInfo>{lastUpdated}</TutorialInfo>
        </TutorialDetail>
        <TutorialDetail>
          <SmallIcon>
            <FontAwesomeIcon icon={faCalendarCheck} />
          </SmallIcon>
          <TutorialInfo>{uploadDate}</TutorialInfo>
        </TutorialDetail>
      </TutorialDetailsContainer>
      <AccessButton text="Access tutorial" />
    </TutorialContainer>
  );
}
