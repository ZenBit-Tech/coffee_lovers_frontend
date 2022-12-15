import { useSelector } from 'react-redux';
import { roles } from '@freelance/components';
import FindJobs from '@pages/FindJobs';
import JobOwnerDashboard from '@pages/JobOwnerDashboard';
import { selectRole } from 'redux/auth/auth-slice';

export default function JobsPage() {
  const role = useSelector(selectRole);

  return role === roles.freelancer ? <FindJobs /> : <JobOwnerDashboard />;
}
