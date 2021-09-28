import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import './App.css';
import { AboutUsPage } from './app/containers/AboutUsPage';
import { FinderPage } from './app/containers/FinderPage';
import { HomePage } from './app/containers/HomePage';

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `};
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <AboutUsPage />
          </Route>
          <Route exact path="/find">
            <FinderPage />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;
