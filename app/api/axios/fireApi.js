import axios from 'axios';
import CONFIG from './config';
import {token} from './token';

export default function fireApi({method, URL, data, header, authToken}) {
  URL = CONFIG.BASEURL + URL;
  if (method === 'POST') {
    let headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    if (authToken) {
      headers = {
        headers: {
          ...headers.headers,
          Authorization: `${token}`,
        },
      };
    }
    if (header) {
      headers = header;
    }
    return axios.post(URL, data, headers).then(
      res => {
        return res;
      },
      error => {
        return axios.post(URL, data, headers);
      },
    );
  } else if (method === 'GET') {
    let headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    if (authToken) {
      headers = {
        headers: {
          ...headers.headers,
          Authorization: `${token}`,
        },
      };
    }
    if (header) {
      headers = header;
    }
    return axios.get(URL, headers).then(
      res => {
        return res;
      },
      error => {
        return axios.get(URL, headers);
      },
    );
  } else if (method === 'DELETE') {
    let headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    if (authToken) {
      headers = {
        headers: {
          ...headers.headers,
          Authorization: `${token}`,
        },
      };
    }
    if (header) {
      headers = header;
    }
    return axios.delete(URL, headers).then(
      res => {
        return res;
      },
      error => {
        return axios.delete(URL, headers);
      },
    );
  }
}
