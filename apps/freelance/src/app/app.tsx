import { lazy } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PasswordResetRequest from '@pages/PasswordResetRequest';
import PasswordReset from '@pages/PasswordReset';
import { Wrapper } from './styles';

const ExampleRootPage = lazy(
  () =>
    import(/* webpackChunkName: "ExampleRootPage" */ '../pages/ExampleRootPage')
);

export function App() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<ExampleRootPage />} />
        <Route
          path="/page-2"
          element={
            <Wrapper>
              <Link to="/">{t('router.toRoot')}</Link>
            </Wrapper>
          }
        />
        <Route path='/passwordreset' element={<PasswordResetRequest />}/>
        <Route path='/passwordreset/:key' element={<PasswordReset/>}/>
      </Routes>
    </Wrapper>
  );
}

export default App;
