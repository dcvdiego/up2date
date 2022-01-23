import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef, FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { MoonLoader } from 'react-spinners';
import { useDebounce } from '../../hooks/debounceHook';
import { Dispatch } from 'redux';

import { GetTutorials_tutorials } from '../../services/tutorialService/__generated__/GetTutorials';
import { setTutorials } from '../../containers/FinderPage/slice';
import { createSelector } from 'reselect';
import tutorialService from '../../services/tutorialService';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectTutorials } from '../../containers/FinderPage/selectors';
import { Tutorial } from '../tutorial';

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 30em;
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
  overflow-y: auto;
  ${tw`
  flex
  flex-col
  w-full
  h-full
  items-center
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
    height: '32em',
  },
  collapsed: {
    height: '3.8em',
  },
};

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

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const actionDispatch = (dispatch: Dispatch) => ({
  setTutorials: (tutorials: GetTutorials_tutorials[]) =>
    dispatch(setTutorials(tutorials)),
});

const stateSelector = createSelector(makeSelectTutorials, (tutorials) => ({
  tutorials,
}));

interface SearchBarProps {
  source: String;
}
export const SearchBar: FC<SearchBarProps> = ({ source }): JSX.Element => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef: any = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [noTutorials, setNoTutorials] = useState(false);

  const { tutorials } = useSelector(stateSelector);
  const { setTutorials } = actionDispatch(useDispatch());

  const [networkError, setNetworkError] = useState(false);
  const changeHandler = (e: any) => {
    e.preventDefault();

    if (e.target.value.trim() === '') setNoTutorials(false);
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery('');
    setLoading(false);
    setNoTutorials(false);
    setNetworkError(false);
    setTutorials([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const searchTutorial = async () => {
    if (!searchQuery || searchQuery.trim() === '') return;

    setLoading(true);
    setNoTutorials(false);
    const tutorials = await tutorialService.getTutorials().catch((err) => {
      console.log('error', err);
      setNetworkError(true);
    });
    if (tutorials) {
      const searchedTutorials = tutorials.filter(
        (tutorial) =>
          tutorial.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutorial.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (searchedTutorials.length === 0) {
        setNoTutorials(true);
      }
      setTutorials(searchedTutorials);
    }
    setLoading(false);
  };
  const isEmptyTutorials = !tutorials || tutorials.length === 0;

  const tutorialsResult =
    (!isEmptyTutorials &&
      tutorials.map((tutorial) => (
        <Tutorial {...tutorial} thumbnailSrc={tutorial.thumbnailSrc} />
      ))) ||
    [];

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
      {isExpanded && <LineSeparator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading size={20} />
            </LoadingWrapper>
          )}
          {isEmptyTutorials && !isLoading && !noTutorials && !networkError && (
            <EmptyTutorials>
              Start typing to search for tutorials
            </EmptyTutorials>
          )}
          {!isLoading && noTutorials && (
            <EmptyTutorials>No tutorials found! Add one?</EmptyTutorials>
          )}
          {!isLoading && networkError && (
            <EmptyTutorials> Error</EmptyTutorials>
          )}
          {!isEmptyTutorials &&
            !isLoading &&
            tutorialsResult.map((tutorial) => <>{tutorial}</>)}
        </SearchContent>
      )}
    </SearchBarContainer>
  );
};
