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
  chat: '/chat',
  jobs: '/jobs',
  //Freelancer Routes
  profileQuestions: '/profile-questions',
  freelancerProfile: '/my-profile',
  jobDetails: '/job/:id/details',
  proposalsList: '/job/:id/proposals',
  //Job Owner Routes
  jobPost: '/owner-profile/job-post',
  talents: '/talents',
  freelancerInfo: '/:id/freelancer-info',
};
