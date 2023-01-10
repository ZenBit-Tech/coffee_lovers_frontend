import { ApiRoutes } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import { InviteParams } from 'redux/types/invitation.types';

const serviceRoute = ApiRoutes.INVITE;

const invitationApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getInvitationDetails: builder.query({
      query: (body: InviteParams) => serviceRoute + `/${body.frId}`,
    }),
  }),
});

export const { useGetInvitationDetailsQuery } = invitationApi;
