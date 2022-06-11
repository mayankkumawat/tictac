import ApiUrl from '../axios/url';
import {token} from '../axios/token';
import fireApi from '../axios/fireApi';

export const ApiService = {
  profileDetails: async payload => {
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
      header: {
        headers: {
          Authorization: token,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      },
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
