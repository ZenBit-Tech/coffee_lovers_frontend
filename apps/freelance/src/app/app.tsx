import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Container, NavigationBar, roles } from '@freelance/components';
import { routes } from '@freelance/components';
import ChatPage from '@pages/ChatPage';
import ChooseRole from '@pages/ChooseRolePage';
import ContractsList from '@pages/ContractsPage';
import FreelancerProfile from '@pages/FreelancerEditProfile';
import FreelancerPageInfo from '@pages/FreelancerPageInfo';
import JobDetailsPage from '@pages/JobDetailsPage';
import JobsPage from '@pages/JobsPage';
import OffersPage from '@pages/OffersPage';
import PasswordReset from '@pages/PasswordReset';
import PasswordResetRequest from '@pages/PasswordResetRequest';
import PostedJobDetails from '@pages/PostedJobDetailsPage';
import ProfileQuestions from '@pages/ProfileQuestions';
import ProposalsList from '@pages/ProposalsList';
import TalentListPage from '@pages/TalentListPage/index';
import WelcomePage from '@pages/WelcomePage';
import { selectRole } from 'redux/auth/auth-slice';
import { Role } from 'redux/types/user.types';
import PrivateRoute from 'src/Routes/PrivateRoute';
import PublicRoute from 'src/Routes/PublicRoute';

import { RoutesWrapper } from './styles';

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
const JobUpdatePage = lazy(
  () =>
    import(/* webpackChunkName: "JobUpdatePage" */ '../pages/JobUpdatePage'),
);

export function App() {
  const role: Role = useSelector(selectRole);

  return (
    <Container>
      {role !== roles.visitor && <NavigationBar />}
      <RoutesWrapper isAppBar={role !== roles.visitor}>
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
              <Route
                path={routes.passwordresetKey}
                element={<PasswordReset />}
              />
            </Route>

            {/* Protected routes */}
            <Route
              element={
                <PrivateRoute
                  allowedRoles={[roles.freelancer, roles.jobOwner]}
                />
              }
            >
              <Route path={routes.contracts} element={<ContractsList />} />
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
              <Route path={routes.offers} element={<OffersPage />} />
            </Route>

            {/* Job Owner's routes */}
            <Route element={<PrivateRoute allowedRoles={[roles.jobOwner]} />}>
              <Route
                path={routes.freelancerInfo}
                element={<FreelancerPageInfo />}
              />
              <Route path={routes.jobPost} element={<JobPostPage />} />
              <Route path={routes.jobUpdate} element={<JobUpdatePage />} />
              <Route path={routes.talents} element={<TalentListPage />} />
              <Route path={routes.proposalsList} element={<ProposalsList />} />
              <Route path={routes.postedJob} element={<PostedJobDetails />} />
            </Route>
          </Route>
        </Routes>
      </RoutesWrapper>
    </Container>
  );
}

export default App;
