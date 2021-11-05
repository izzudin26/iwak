import axios from 'axios';
import {url} from './url';
import {getCurrentIdAccount} from './user.service';
/**
 * Report Seller
 * @typedef {Object} response
 * @property {number} status
 * @property {Object} body
 * @returns {Promise<response>}
 */
export const getReport = () => {
  let idAccount = getCurrentIdAccount();
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/laporan`, {id_account: idAccount})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Toko /api/penjual/toko
 * @typedef {Object} response
 * @property {number} status
 * @property {Object} body
 * @returns {Promise<response>}
 */
export const getToko = () => {
  let idAccount = getCurrentIdAccount();
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/toko`, {id_account: idAccount})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Save Toko
 * @param {FormData} data
 * @returns {Promise<response>}
 */
export const saveToko = data => {
  let idAccount = getCurrentIdAccount();
  data.append('id_account', idAccount);
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/penjual/toko/simpan`, data)
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Get Feed Penjual
 * @returns {Promise<response>}
 */
export const getFeed = () => {
  let idAccount = getCurrentIdAccount();
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/feed`, {id_account: idAccount})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * get product collection
 * @returns {Promise<response>}
 */
export const getProducts = () => {
  let idAccount = getCurrentIdAccount();
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/produk`, {id_account: idAccount})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Save or Store Product
 * save if product id exist
 * @typedef {Object} productData
 * @property {?number} idProduct
 * @property {string} productName
 * @property {number} productCategory
 * @property {number} price
 * @property {number} stock
 * @property {number} discount
 * @property {boolean} isDiscount
 * @property {string} description
 * @param {!FormData} photoFormData
 * @param {!productData} productData
 * @returns {Promise<response>}
 */
export const saveProduct = (
  photoFormData,
  {
    idProduct,
    productName,
    productCategory,
    price,
    stock,
    discount,
    isDiscount,
    description,
  } = {idProduct: null},
) => {
  photoFormData.append('id_account', getCurrentIdAccount());
  photoFormData.append('id', idProduct);
  photoFormData.append('name', productName);
  photoFormData.append('id_category', productCategory);
  photoFormData.append('price', price);
  photoFormData.append('stock', stock);
  photoFormData.append('diskon', discount);
  photoFormData.append('isdiskon', isDiscount);
  photoFormData.append('description', description);
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/produk/simpan`, photoFormData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};
