import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';
import { Container } from '@freelance/components';
import ChooseRole from '@pages/ChooseRolePage';
import FindJobs from '@pages/FindJobs';
import FreelancerPageInfo from '@pages/FreelancerPageInfo';
import JobDetailsPage from '@pages/JobDetailsPage';
import JobOwnerDashboard from '@pages/JobOwnerDashboard';
import { JobPostFirstPage, JobPostSecondPage } from '@pages/JobPostPage';
import PasswordReset from '@pages/PasswordReset';
import PasswordResetRequest from '@pages/PasswordResetRequest';
import { ProfileQuestions1, ProfileQuestions2 } from '@pages/ProfileQuestions';
import ProposalsList from '@pages/ProposalsList';
import TalentListPage from '@pages/TalentListPage/index';
import WelcomePage from '@pages/WelcomePage';
import PrivateRoute from 'src/Routes/PrivateRoute';
import PublicRoute from 'src/Routes/PublicRoute';

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

const LoginPage = lazy(
  () => import(/* webpackChunkName: "ExampleRootPage" */ '../pages/LoginPage'),
);
const SignupPage = lazy(
  () => import(/* webpackChunkName: "ExampleRootPage" */ '../pages/SignupPage'),
);

export function App() {
  const { t } = useTranslation();

  return (
    <Container>
      <Routes>
        <Route path="/" element={<ExampleRootPage />} />
        <Route
          path="/owner-profile"
          element={
            <PrivateRoute>
              <OwnerProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner-profile/job-post"
          element={
            <PrivateRoute>
              <JobPostFirstPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner-profile/job-post"
          element={
            <PrivateRoute>
              <JobPostSecondPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/page-2"
          element={<Link to="/">{t('router.toRoot')}</Link>}
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/googleAuth" element={<SignInGoogle />} />
        <Route path="/login/conditions" element={<ConditionsPage />} />
        <Route
          path="/profile-questions-1"
          element={
            <PrivateRoute>
              <ProfileQuestions1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile-questions-2"
          element={
            <PrivateRoute>
              <ProfileQuestions2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/freelancer-info"
          element={
            <PrivateRoute>
              <FreelancerPageInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/talents"
          element={
            <PrivateRoute>
              <TalentListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/passwordreset"
          element={
            <PublicRoute>
              <PasswordResetRequest />
            </PublicRoute>
          }
        />
        <Route
          path="/passwordreset/:key"
          element={
            <PublicRoute>
              <PasswordReset />
            </PublicRoute>
          }
        />
        <Route
          path="/jobownerdashboard"
          element={
            <PrivateRoute>
              <JobOwnerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/role"
          element={
            <PrivateRoute>
              <ChooseRole />
            </PrivateRoute>
          }
        />
        <Route
          path="/findjobs"
          element={
            <PrivateRoute>
              <FindJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/job/:id/proposals"
          element={
            <PrivateRoute>
              <ProposalsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobdetails"
          element={
            <PrivateRoute>
              <JobDetailsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
