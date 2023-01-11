import { ContractsResponse } from 'src/redux/contracts/types';
import { ContractStatus } from 'src/redux/types/contracts.types';
import { Job } from 'src/redux/types/jobs.types';
import { OfferStatus } from 'src/redux/types/request.types';
import { User } from 'src/redux/types/user.types';

export const activeContractsMock: ContractsResponse[] = [
  {
    id: 2,
    created_at: new Date().getDay().toLocaleString(),
    status: ContractStatus.CLOSED,
    end: new Date(),
    offer: {
      id: 2,
      hourly_rate: 20,
      status: OfferStatus.ACCEPTED,
      start: new Date(),
      created_at: new Date().getDay().toLocaleString(),
      freelancer: { id: 5, first_name: 'Roman' } as User,
      job: { id: 3, title: 'Active job title' } as Job,
      job_owner: { id: 3 } as User,
    },
  },
];

export const closedContractsMock: ContractsResponse[] = [
  {
    id: 2,
    created_at: new Date().getDay().toLocaleString(),
    status: ContractStatus.CLOSED,
    end: new Date(),
    offer: {
      id: 2,
      hourly_rate: 20,
      status: OfferStatus.ACCEPTED,
      start: new Date(),
      created_at: new Date().getDay().toLocaleString(),
      freelancer: { id: 5, first_name: 'Ann' } as User,
      job: { id: 3, title: 'Closed job title' } as Job,
      job_owner: { id: 3 } as User,
    },
  },
];
