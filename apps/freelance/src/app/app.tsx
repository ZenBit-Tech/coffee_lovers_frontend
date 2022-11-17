import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';
import { Container } from '@freelance/components';
import JobOwnerDashboard from '@pages/JobOwnerDashboard';
import PasswordReset from '@pages/PasswordReset';
import PasswordResetRequest from '@pages/PasswordResetRequest';
import ProfileQuestions1 from '@pages/ProfileQuestions1';
import ProfileQuestions2 from '@pages/ProfileQuestions2';
import WelcomePage from '@pages/WelcomePage';

const ExampleRootPage = lazy(
  () =>
    import(
      /* webpackChunkName: "ExampleRootPage" */ '../pages/ExampleRootPage'
    ),
);

const OwnerProfilePage = lazy(
  () =>
    import(
      /* webpackChunkName: "OwnerProfilePage" */ '../pages/OwnerProfilePage'
    ),
);
const SignInGoogle = lazy(() => import('../pages/SignInGoogle'));
const ConditionsPage = lazy(() => import('../pages/ConditionsPage'));

const JobPostPage = lazy(
  () => import(/* webpackChunkName: "JobPostPage" */ '../pages/JobPostPage'),
);

export function App() {
  const { t } = useTranslation();

  return (
    <Container>
      <Routes>
        <Route path="/" element={<ExampleRootPage />} />
        <Route path="/owner-profile" element={<OwnerProfilePage />} />
        <Route path="/owner-profile/job-post" element={<JobPostPage />} />

        <Route
          path="/page-2"
          element={<Link to="/">{t('router.toRoot')}</Link>}
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/googleAuth" element={<SignInGoogle />} />
        <Route path="/login/conditions" element={<ConditionsPage />} />
        <Route path="/profile-questions-1" element={<ProfileQuestions1 />} />
        <Route path="/profile-questions-2" element={<ProfileQuestions2 />} />
        <Route path="/passwordreset" element={<PasswordResetRequest />} />
        <Route path="/passwordreset/:key" element={<PasswordReset />} />
        <Route path="/jobownerdashboard" element={<JobOwnerDashboard />} />
      </Routes>
    </Container>
  );
}

export default App;
