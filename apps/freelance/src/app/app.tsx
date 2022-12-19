import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AppBar, Container, roles } from '@freelance/components';
import { routes } from '@freelance/components';
import ChatPage from '@pages/ChatPage';
import ChooseRole from '@pages/ChooseRolePage';
import FreelancerProfile from '@pages/FreelancerEditProfile';
import FreelancerPageInfo from '@pages/FreelancerPageInfo';
import JobDetailsPage from '@pages/JobDetailsPage';
import JobOwnerDashboard from '@pages/JobOwnerDashboard';
import JobsPage from '@pages/JobsPage';
import PasswordReset from '@pages/PasswordReset';
import PasswordResetRequest from '@pages/PasswordResetRequest';
import ProfileQuestions from '@pages/ProfileQuestions';
import ProposalsList from '@pages/ProposalsList';
import TalentListPage from '@pages/TalentListPage/index';
import WelcomePage from '@pages/WelcomePage';
import { selectRole } from 'redux/auth/auth-slice';
import { Role } from 'redux/types/user.types';
import PrivateRoute from 'src/Routes/PrivateRoute';
import PublicRoute from 'src/Routes/PublicRoute';

const ExampleRootPage = lazy(
  () =>
    import(/* webpackChunkName: "ExampleRootPage" */ '@pages/ExampleRootPage'),
);
const ConditionsPage = lazy(() => import('@pages/ConditionsPage'));
const LoginPage = lazy(
  () => import(/* webpackChunkName: "ExampleRootPage" */ '@pages/LoginPage'),
);
const SignupPage = lazy(
  () => import(/* webpackChunkName: "ExampleRootPage" */ '@pages/SignupPage'),
);
const JobPostPage = lazy(
  () => import(/* webpackChunkName: "JobPostPage" */ '@pages/JobPostPage'),
);

export function App() {
  const role: Role = useSelector(selectRole);

  return (
    <Container>
      {role !== roles.visitor && <AppBar />}
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path={routes.welcome} element={<WelcomePage />} />
          <Route path={routes.conditions} element={<ConditionsPage />} />
          <Route path={routes.role} element={<ChooseRole />} />

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
          <Route
            element={
              <PrivateRoute allowedRoles={[roles.freelancer, roles.jobOwner]} />
            }
          >
            <Route path={routes.chat} element={<ChatPage />} />
            <Route path={routes.jobs} element={<JobsPage />} />
          </Route>

          {/* Freelancer's routes */}
          <Route element={<PrivateRoute allowedRoles={[roles.freelancer]} />}>
            <Route
              path={routes.profileQuestions}
              element={<ProfileQuestions />}
            />
            <Route
              path={routes.freelancerProfile}
              element={<FreelancerProfile />}
            />
            <Route path={routes.jobDetails} element={<JobDetailsPage />} />
            <Route path={routes.proposalsList} element={<ProposalsList />} />
          </Route>

          {/* Job Owner's routes */}
          <Route element={<PrivateRoute allowedRoles={[roles.jobOwner]} />}>
            <Route
              path={routes.freelancerInfo}
              element={<FreelancerPageInfo />}
            />

            <Route path={routes.jobPost} element={<JobPostPage />} />
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
