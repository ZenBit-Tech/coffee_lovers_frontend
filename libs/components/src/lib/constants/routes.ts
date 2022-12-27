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
  offers: '/offers',
  //Job Owner Routes
  jobPost: '/owner-profile/job-post',
  jobUpdate: '/owner-profile/job-update',
  talents: '/talents',
  freelancerInfo: '/:id/freelancer-info',
  contracts: '/contracts',
  postedJob: '/postedjob/:id',
};
