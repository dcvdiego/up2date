import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { MoonLoader } from 'react-spinners';
import { useDebounce } from '../../hooks/debounceHook';
import { Dispatch } from 'redux';

import { GetTutorials_tutorials } from '../../services/tutorialService/__generated__/GetTutorials';
import { setTutorials } from './slice';
import { createSelector } from 'reselect';
import tutorialService from '../../services/tutorialService';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectTutorials } from '../../containers/FinderPage/selectors';
const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  min-height: 4em;
  padding: 2px 15px;
  ${tw`
    flex
    w-full
    items-center
    relative
    `};
`;

const SearchInput = styled.input`
  border-radius: 6px;
  ${tw`
    w-full
    h-full
    outline-none
    border-none
    text-base
    text-purple-800
    font-medium
    bg-transparent
    `};
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    transition: all 250ms ease-in-out;
    ${tw`
        text-gray-400
        `};
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  ${tw`
  text-base
  mr-4
  mt-3
  mb-2
  align-middle
  `};
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  transition: all 200ms ease-in-out;
  ${tw`
    text-sm
    align-middle
    cursor-pointer
`};
  &:hover {
    color: #ff5858;
  }
`;

const LineSeparator = styled.div`
  min-height: 1.5px;
  ${tw`
  flex
  min-w-full
  bg-gray-200
  `};
`;

const SearchContent = styled.div`
  padding: 1em;
  ${tw`
  flex
  flex-col
  w-full
  h-full
  `};
`;

const LoadingWrapper = styled.div`
  ${tw`
  flex
  w-full
  h-full
  items-center
  justify-center
  `}
`;

const containerVariants = {
  expanded: {
    height: '30em',
  },
  collapsed: {
    height: '3.8em',
  },
};

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const actionDispatch = (dispatch: Dispatch) => ({
  setTutorials: (tutorials: GetTutorials_tutorials[]) =>
    dispatch(setTutorials(tutorials)),
});

const stateSelector = createSelector(makeSelectTutorials, (tutorials) => ({
  tutorials,
}));

export function SearchBar() {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef: any = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { tutorials } = useSelector(stateSelector);
  const { setTutorials } = actionDispatch(useDispatch());

  const changeHandler = (e: any) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery('');
    setLoading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  // const prepareSearchQuery = (query) => {
  // const url = some url {query}
  // return encodeURI(url)
  // }
  const searchTutorial = async () => {
    if (!searchQuery /* || searchQuery.trim === '' */) return;
    setLoading(true);
    const tutorials = await tutorialService.getTutorials().catch((err) => {
      console.log('error', err);
    });

    if (tutorials) setTutorials(tutorials);
    console.log(tutorials);
    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchTutorial);

  return (
    <SearchBarContainer
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        <SearchInput
          placeholder="Search for tutorials..."
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      <LineSeparator />
      <SearchContent>
        {isLoading && (
          <LoadingWrapper>
            <MoonLoader loading size={20} />
          </LoadingWrapper>
        )}
      </SearchContent>
    </SearchBarContainer>
  );
}
