import {url} from './url';
import axios from 'axios';
import Storage from '../storage';

/**
 * Login user will response {
 *  status: response status
 *  body: response body
 * }
 * @param {string} email
 * @param {string} password
 * @returns {Promise} will return object from response server endpoint login
 */
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/login`, {
        username: email,
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
 * @typedef {Object} registrationObject
 * @property {string} fullname
 * @property {string} email
 * @property {string} password
 * @param {registrationObject}
 * @returns {Promise} return object promise {
 *  status: response status
 *  body: response body
 * }
 */
export const registration = ({fullname, email, password} = {}) => {
  const data = {
    fullname,
    email,
    password,
    password_confirmation: password,
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
export const getCurrentIdAccount = () => {
  return Storage.load({key: 'userId', autoSync: true});
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

/**
 * Update Current Profile
 * @typedef {Object} response
 * @property {number} status
 * @property {Object} body
 * @param {FormData} formData
 * @returns {Promise<response>}
 */
export const updateProfile = formData => {
  let id_account = getCurrentIdAccount();
  formData.append('id_account', id_account);
  const header = {
    'content-type': 'multipart/form-data',
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/editprofile`, formData, {headers: header})
      .then(res =>
        resolve({
          status: res.status,
          body: res.data,
        }),
      )
      .catch(err => reject(err));
  });
};
