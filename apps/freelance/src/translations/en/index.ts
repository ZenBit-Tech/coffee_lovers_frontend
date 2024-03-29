import ratingModal from './translation/addRatingModal';
import appBar from './translation/appBar';
import chat from './translation/chat';
import chooseRole from './translation/chooseRole';
import contracts from './translation/contracts';
import description from './translation/description';
import errors from './translation/errors';
import filters from './translation/filters';
import findJobs from './translation/findJobs';
import general from './translation/general';
import jobCard from './translation/jobCard';
import jobDetails from './translation/jobDetails';
import jobOwnerDashboard from './translation/jobOwnerDashboard';
import jobPostPage from './translation/jobPostPage';
import loginPage from './translation/loginPage';
import modals from './translation/modals';
import notFoundPage from './translation/notFoundPage';
import notifications from './translation/notifications';
import offers from './translation/offers';
import postedJobDetails from './translation/postedJobDetails';
import postedJobs from './translation/postedJobs';
import proposalsList from './translation/proposalsList';
import resetPassword from './translation/resetPassword';
import talent from './translation/talent';
import textVisibility from './translation/textVisibility';
import uploadImage from './translation/uploadImage';
import validation from './translation/validation';
import welcome from './translation/welcome';

export default {
  translation: {
    ...contracts,
    ...loginPage,
    ...filters,
    ...description,
    ...resetPassword,
    ...uploadImage,
    ...jobOwnerDashboard,
    ...appBar,
    ...chooseRole,
    ...jobPostPage,
    ...validation,
    ...general,
    ...welcome,
    ...talent,
    ...findJobs,
    ...jobCard,
    ...jobDetails,
    ...proposalsList,
    ...textVisibility,
    ...modals,
    ...chat,
    ...postedJobs,
    ...offers,
    ...errors,
    ...postedJobDetails,
    ...notFoundPage,
    ...notifications,
    ...ratingModal,
  },
};
