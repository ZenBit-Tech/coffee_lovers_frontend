import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';

import ProfileQuestions1 from '@pages/ProfileQuestions1';
import ProfileQuestions2 from '@pages/ProfileQuestions2';
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

const LoginPage = lazy(
  () =>
    import(/* webpackChunkName: "ExampleRootPage" */ '../pages/LoginPage')
);
const SignupPage = lazy(
  () =>
    import(/* webpackChunkName: "ExampleRootPage" */ '../pages/SignupPage')
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
        <Route path="/profile-questions-1" element={<ProfileQuestions1 />} />
        <Route path="/profile-questions-2" element={<ProfileQuestions2 />} />
        <Route
          path="signup"
          element={
            <SignupPage />
          }
        />
        <Route
          path="login"
          element={
            <LoginPage />
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
