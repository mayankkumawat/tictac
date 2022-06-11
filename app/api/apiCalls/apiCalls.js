import ApiUrl from '../axios/url';
import fireApi from '../axios/fireApi';

export const ApiService = {
  profileDetails: async () => {
    return fireApi({
      method: 'GET',
      authToken: true,
      URL: `${ApiUrl.profileDetails}`,
    });
  },
  imagesUpload: async payload => {
    return fireApi({
      method: 'POST',
      data: payload,
      authToken: true,
      URL: `${ApiUrl.imagesUpload}`,
    });
  },
  videosUpload: async payload => {
    return fireApi({
      method: 'POST',
      data: payload,
      authToken: true,
      URL: `${ApiUrl.videosUpload}`,
    });
  },
  profileUpdate: async payload => {
    return fireApi({
      method: 'PUT',
      data: payload,
      authToken: true,
      URL: `${ApiUrl.profileUpdate}`,
    });
  },
};
