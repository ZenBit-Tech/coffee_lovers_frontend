import { Role } from 'src/redux/services/types/user.types';

interface IRoles {
  freelancer: Role;
  jobOwner: Role;
  visitor: Role;
}

export const roles: IRoles = {
  freelancer: 'Freelancer',
  jobOwner: 'JobOwner',
  visitor: 'Visitor',
};
