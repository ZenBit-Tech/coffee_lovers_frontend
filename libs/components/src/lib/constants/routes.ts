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
  profileQuestions: '/profile-questions',
  freelancerProfile: '/:id/my-profile',
  findJobs: '/findjobs',
  jobDetails: '/jobdetails',
  proposalsList: '/job/:id/proposals',
  //Job Owner Routes
  jobOwnerDashboard: '/jobownerdashboard',
  jobPost: '/owner-profile/job-post',
  ownerProfile: '/owner-profile',
  talents: '/talents',
  freelancerInfo: '/freelancer-info',
};
