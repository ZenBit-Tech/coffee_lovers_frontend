import styled from 'styled-components';
import React, { lazy } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const ExampleRootPage = lazy(
  () => import(/* webpackChunkName: "Homepage" */ '../pages/ExampleRootPage')
);

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<ExampleRootPage />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </StyledApp>
  );
}

export default App;
