export const routes = {
  // Public Routes
  welcome: '/welcome',
  login: '/login',
  signup: '/signup',
  passwordreset: '/passwordreset',
  passwordresetKey: '/passwordreset/:key',
  googleAuth: '/googleAuth',
  conditions: '/login/conditions',
  // Protected Routes
  role: '/role',
  //Freelancer Routes
  profileQuestions1: '/profile-questions-1',
  profileQuestions2: '/profile-questions-2',
  findJobs: '/findjobs',
  jobDetails: '/jobdetails',
  proposalsList: '/job/:id/proposals',
  //Job Owner Routes
  jobOwnerDashboard: '/jobownerdashboard',
  jobPost: '/owner-profile/job-post',
  ownerProfile: '/owner-profile',
  talents: '/talents',
};
export const proFileQuestions = {
  profileQuestions2: '/profile-questions-2',
};
