import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Container } from '@freelance/components';
import { routes } from '@freelance/components';
import ChooseRole from '@pages/ChooseRolePage';
import FindJobs from '@pages/FindJobs';
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
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path={routes.welcome} element={<WelcomePage />} />
          <Route path={routes.googleAuth} element={<SignInGoogle />} />
          <Route path={routes.conditions} element={<ConditionsPage />} />

          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<ExampleRootPage />} />
            <Route path={routes.signup} element={<SignupPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route
              path={routes.passwordreset}
              element={<PasswordResetRequest />}
            />
            <Route path={routes.passwordresetKey} element={<PasswordReset />} />
          </Route>

          {/* Protected routes */}
          <Route element={<PrivateRoute allowedRoles={'Visitor'} />}>
            <Route path={routes.role} element={<ChooseRole />} />
          </Route>

          {/* Freelancer's routes */}
          <Route element={<PrivateRoute allowedRoles={'Freelancer'} />}>
            <Route
              path={routes.profileQuestions1}
              element={<ProfileQuestions1 />}
            />
            <Route
              path={routes.profileQuestions2}
              element={<ProfileQuestions2 />}
            />
            <Route path={routes.findJobs} element={<FindJobs />} />
            <Route path={routes.jobDetails} element={<JobDetailsPage />} />
            <Route path={routes.proposalsList} element={<ProposalsList />} />
          </Route>

          {/* Job Owner's routes */}
          <Route element={<PrivateRoute allowedRoles={'JobOwner'} />}>
            <Route path={routes.ownerProfile} element={<OwnerProfilePage />} />
            <Route path={routes.jobPost} element={<JobPostFirstPage />} />
            <Route path={routes.jobPost} element={<JobPostSecondPage />} />
            <Route
              path={routes.jobOwnerDashboard}
              element={<JobOwnerDashboard />}
            />
            <Route path={routes.talents} element={<TalentListPage />} />
          </Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
