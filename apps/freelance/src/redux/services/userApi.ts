import { ApiRoutes, apiTags } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import {
  AddEducation,
  AddFavorites,
  AddWorkhistory,
  FreelancerDataById,
  FreelancerQuery,
  FreelancerRatingDataById,
  GetEducation,
  GetFavorites,
  GetUserProposals,
  GetWorkhistory,
  PasswordResetPayload,
  SetFreelancerRating,
  SetProfileImageResponse,
  UpdateUser,
  User,
} from 'redux/types/user.types';
import { FreelancerFavQuery } from 'redux/types/user.types';

const serviceRoute = ApiRoutes.USER;

enum EndpointsRoutes {
  getUserInfo = '/',
  passwordResetRequest = '/passwordresetrequest',
  passwordReset = '/passwordreset',
  passwordResetCheckAvailability = '/passwordreset/',
  getUserProposals = '/proposals',
  setProfileImage = '/setprofileimage',
  updateUserInfo = '/',
  addGetUserEduInfo = '/education-info',
  addGetUserWorkhistoryInfo = '/workhistory-info',
  addGetUserFavoritesInfo = '/favorites',
  freelancer = '/freelancer/',
  freelancerRating = '/freelancerrating/',
}

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: serviceRoute + EndpointsRoutes.getUserInfo,
        method: 'GET',
      }),
      keepUnusedDataFor: 0.0001,
      providesTags: [apiTags.user],
    }),
    getUserWorkInfo: builder.query<GetWorkhistory[], void>({
      query: () => ({
        url: serviceRoute + EndpointsRoutes.addGetUserWorkhistoryInfo,
        method: 'GET',
      }),
      providesTags: [apiTags.workInfo],
    }),
    getUserEducationInfo: builder.query<GetEducation[], void>({
      query: () => ({
        url: serviceRoute + EndpointsRoutes.addGetUserEduInfo,
        method: 'GET',
      }),
      providesTags: [apiTags.eduInfo],
    }),
    passwordResetCheckAvailability: builder.query<boolean, string>({
      query: (key: string) => ({
        url:
          serviceRoute + EndpointsRoutes.passwordResetCheckAvailability + key,
        method: 'GET',
      }),
    }),
    getUserProposals: builder.query<GetUserProposals, void>({
      query: () => ({
        url: serviceRoute + EndpointsRoutes.getUserProposals,
        method: 'GET',
      }),
      providesTags: [apiTags.proposal],
    }),
    getFavorites: builder.query<GetFavorites, FreelancerFavQuery>({
      query: (params: FreelancerFavQuery) => ({
        url: serviceRoute + EndpointsRoutes.addGetUserFavoritesInfo,
        params,
        method: 'GET',
      }),
      providesTags: [apiTags.favorites],
    }),
    passwordResetRequest: builder.mutation({
      query: (email: string) => ({
        url: serviceRoute + EndpointsRoutes.passwordResetRequest,
        method: 'POST',
        body: { email },
      }),
    }),
    passwordReset: builder.mutation({
      query: (payload: PasswordResetPayload) => ({
        url: serviceRoute + EndpointsRoutes.passwordReset,
        method: 'POST',
        body: payload,
      }),
    }),
    setProfileImage: builder.mutation<SetProfileImageResponse, FormData>({
      query: (formData: FormData) => ({
        url: serviceRoute + EndpointsRoutes.setProfileImage,
        method: 'POST',
        body: formData,
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (payload: UpdateUser) => ({
        url: serviceRoute + EndpointsRoutes.updateUserInfo,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: [apiTags.user],
    }),
    addUserEduInfo: builder.mutation({
      query: (payload: AddEducation[]) => ({
        url: serviceRoute + EndpointsRoutes.addGetUserEduInfo,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [apiTags.eduInfo],
    }),
    addUserWorkhistoryInfo: builder.mutation({
      query: (payload: AddWorkhistory[]) => ({
        url: serviceRoute + EndpointsRoutes.addGetUserWorkhistoryInfo,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [apiTags.workInfo],
    }),
    setFavorites: builder.mutation({
      query: (payload: AddFavorites) => ({
        url: serviceRoute + EndpointsRoutes.addGetUserFavoritesInfo,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [apiTags.favorites],
    }),
    getFreelancer: builder.query({
      query: (params: FreelancerQuery) => ({
        url: serviceRoute + EndpointsRoutes.freelancer,
        params,
      }),
      providesTags: [apiTags.favorites],
    }),
    getFreelancerById: builder.query<FreelancerDataById, number>({
      query: (key: number) => ({
        url: serviceRoute + EndpointsRoutes.freelancer + key,
        method: 'GET',
      }),
    }),
    getFreelancerRatingsById: builder.query<FreelancerRatingDataById[], number>(
      {
        query: (key: number) => ({
          url: serviceRoute + EndpointsRoutes.freelancerRating + key,
          method: 'GET',
        }),
      },
    ),
    setFreelancerRating: builder.mutation({
      query: (payload: SetFreelancerRating) => ({
        url: serviceRoute + EndpointsRoutes.freelancerRating,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [apiTags.workInfo],
    }),
  }),
});

export const {
  usePasswordResetRequestMutation,
  usePasswordResetMutation,
  usePasswordResetCheckAvailabilityQuery,
  useSetProfileImageMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useGetUserProposalsQuery,
  useGetUserWorkInfoQuery,
  useGetUserEducationInfoQuery,
  useAddUserWorkhistoryInfoMutation,
  useAddUserEduInfoMutation,
  useUpdateUserInfoMutation,
  useSetFavoritesMutation,
  useGetFavoritesQuery,
  useGetFreelancerQuery,
  useGetFreelancerByIdQuery,
  useSetFreelancerRatingMutation,
  useGetFreelancerRatingsByIdQuery,
} = userApi;
