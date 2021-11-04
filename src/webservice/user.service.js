import {url} from './url';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

/**
 * Login user will response {
 *  status: response status
 *  body: response body
 * }
 * @param {string} username
 * @param {string} password
 * @returns {Promise} will return object from response server endpoint login
 */
export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/login`, {
        username,
        password,
      })
      .then(res =>
        resolve({
          status: res.status,
          body: res.data,
        }),
      )
      .catch(err => reject(err));
  });
};

/**
 * Registration user
 * @param {string} fullname
 * @param {string} email
 * @param {string} password
 * @returns {Promise} return object promise {
 *  status: response status
 *  body: response body
 * }
 */
export const registration = (fullname, username, password) => {
  const data = {
    fullname,
    username,
    password,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/register`, data)
      .then(res =>
        resolve({
          status: res.status,
          body: res.data,
        }),
      )
      .catch(err => reject(err));
  });
};

/**
 * Get AccountID
 * @returns {string} accountId
 */
export const getCurrentIdAccount = async () => {
  return await AsyncStorage.getItem('account_id');
};

/**
 * Logout
 * Logout user by sending id_account
 */
export const logout = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/logout`, {
        id_account: getCurrentIdAccount(),
      })
      .then(res =>
        resolve({
          status: 200,
          body: res.data,
        }),
      )
      .catch(err => reject(err));
  });
};

/**
 * Get Current Profile Account
 * @returns {Promise} return promise which have data and status
 */
export const getCurrentProfile = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/profile`, {
        id_account: getCurrentIdAccount(),
      })
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};
