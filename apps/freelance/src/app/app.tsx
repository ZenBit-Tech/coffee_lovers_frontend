import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';

import { Wrapper } from './styles';

const ExampleRootPage = lazy(
  () =>
    import(
      /* webpackChunkName: "ExampleRootPage" */ '../pages/ExampleRootPage'
    ),
);

const OwnerProfilePage = lazy(
  () =>
    import(
      /* webpackChunkName: "ExampleRootPage" */ '../pages/OwnerProfilePage'
    ),
);

export function App() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<ExampleRootPage />} />
        <Route path="/owner-profile" element={<OwnerProfilePage />} />
        <Route
          path="/page-2"
          element={
            <Wrapper>
              <Link to="/">{t('router.toRoot')}</Link>
            </Wrapper>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
