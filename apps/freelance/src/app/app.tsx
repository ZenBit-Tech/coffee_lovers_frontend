import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Container } from '@freelance/components';
import ChooseRole from '@pages/ChooseRolePage';
import FindJobs from '@pages/FindJobs';
import JobDetailsPage from '@pages/JobDetailsPage';
import JobOwnerDashboard from '@pages/JobOwnerDashboard';
import { JobPostFirstPage, JobPostSecondPage } from '@pages/JobPostPage';
import PasswordReset from '@pages/PasswordReset';
import PasswordResetRequest from '@pages/PasswordResetRequest';
import { ProfileQuestions1, ProfileQuestions2 } from '@pages/ProfileQuestions';
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
        <Route path="/" element={<Outlet />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/googleAuth" element={<SignInGoogle />} />
          <Route path="/login/conditions" element={<ConditionsPage />} />

          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<ExampleRootPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/passwordreset" element={<PasswordResetRequest />} />
            <Route path="/passwordreset/:key" element={<PasswordReset />} />
          </Route>

          {/* Protected routes */}
          <Route element={<PrivateRoute allowedRoles={null} />}>
            <Route path="/role" element={<ChooseRole />} />
          </Route>

          {/* Freelancer's routes */}
          <Route element={<PrivateRoute allowedRoles={'Freelancer'} />}>
            <Route path="/owner-profile" element={<OwnerProfilePage />} />
            <Route
              path="/owner-profile/job-post"
              element={<JobPostFirstPage />}
            />
            <Route
              path="/owner-profile/job-post"
              element={<JobPostSecondPage />}
            />
            <Route path="/findjobs" element={<FindJobs />} />
            <Route path="/jobdetails" element={<JobDetailsPage />} />
          </Route>

          {/* Job Owner's routes */}
          <Route element={<PrivateRoute allowedRoles={'JobOwner'} />}>
            <Route
              path="/profile-questions-1"
              element={<ProfileQuestions1 />}
            />
            <Route
              path="/profile-questions-2"
              element={<ProfileQuestions2 />}
            />
            <Route path="/jobownerdashboard" element={<JobOwnerDashboard />} />
          </Route>

          <Route
            path="/page-2"
            element={<Link to="/">{t('router.toRoot')}</Link>}
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
