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
export const getToko = async () => {
  let idAccount = await getCurrentIdAccount();
  console.log(idAccount);
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
export const saveProduct = photoFormData => {
  photoFormData.append('id_account', getCurrentIdAccount());
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

/**
 * Product view
 *  @param {number} idProduct
 * @returns {Promise<response>}
 */
export const getProduct = idProduct => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/produk/view`, {id: idProduct})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Remove Image Product
 * @param {number} idProduct
 * @param {number} idImage
 * @returns {Promise<response>}
 */
export const removeImage = (idProduct, idImage) => {
  let idAccount = getCurrentIdAccount();
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/produk`, {
        id_account: idAccount,
        id_produk: idProduct,
        id_image: idImage,
      })
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

export const updateToko = form => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/toko/simpan`, form, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Remove Product
 * Delete product with product id
 * @param {number} productId
 * @returns {Promise<response>}
 */
export const deleteProduct = productId => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/produk/hapus`, {id: productId})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

export const lelang = () => {
  let idAccount = getCurrentIdAccount();
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/lelang`, {id_account: idAccount})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * ListBid
 * @param {number} idLelang
 * @returns {Promise<response>}
 */
export const listBidLelang = idLelang => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/api/penjual/lelang/${idLelang}`)
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Remove lelang
 * @param {number} idLelang
 * @returns {Promise<response>}
 */
export const removeLelang = idLelang => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/lelang/hapus`, {id: idLelang})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Get Active Lelang
 * @param {number} idLelang
 * @returns {Promise<response>}
 */
export const getActiveLelang = idLelang => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/lelang/aktif`, {id: idLelang})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Get NonActive lelang
 * @param {number} idLelang
 * @returns {Promise<response>}
 */
export const nonActiveLelang = idLelang => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/lelang/nonaktif`, {id: idLelang})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Lelang View
 * @param {number} idLelang
 * @return {Promise<response>}
 */
export const getLelang = idLelang => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/lelang/view`, {id: idLelang})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

export const saveLelang = (
  {id_produk, id_account, price} = {id_account: getCurrentIdAccount()},
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/lelang/simpan`, {id_produk, id_account, price})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

/**
 * Update Lelang
 * @param {number} idLelang
 * @param {number} price
 * @returns {Promise<response>}
 */
export const updateLelang = (idLelang, price) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/lelang/update`, {id_lelang: idLelang, price})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};

export const getPemenangLelang = idLelang => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/penjual/pemenang`, {id: idLelang})
      .then(res => resolve({status: res.status, body: res.data}))
      .catch(err => reject(err));
  });
};
