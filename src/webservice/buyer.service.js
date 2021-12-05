import {url} from './url';
import axios from 'axios';
import {getCurrentIdAccount} from './user.service';

export const getProduct = async (
  {sort, sortfield, category, keyword} = {sort: 'DESC'},
) => {
  const idAccount = await getCurrentIdAccount();
  const data = {
    id_account: idAccount,
    sort,
    sortfield,
    category,
    keyword,
  };

  try {
    const res = await axios.post(`${url}/api/pembeli/product`, data);
    return {
      status: res.data.code,
      body: res.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getProductLelang = async (
  {sort, sortfield, category, keyword} = {sort: 'DESC'},
) => {
  const idAccount = await getCurrentIdAccount();
  const data = {
    id_account: idAccount,
    sort,
    sortfield,
    category,
    keyword,
  };

  try {
    const res = await axios.post(`${url}/api/pembeli/lelang`, data);
    return {
      status: res.data.code,
      body: res.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getProductSegment = async ({urlSegment}) => {
  try {
    const res = await axios.get(
      `${url}/api/pembeli/product/detail/${urlSegment}`,
    );
    return {
      status: res.data.code,
      body: res.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getLelangSegment = async ({urlSegment}) => {
  try {
    const res = await axios.get(
      `${url}/api/pembeli/lelang/detail/${urlSegment}`,
    );
    return {
      status: res.data.code,
      body: res.data,
    };
  } catch (error) {
    throw error;
  }
};

export const openToko = async ({formdata}) => {
  const idAccount = await getCurrentIdAccount();
  formdata.append('id', idAccount);
  const res = await axios.post(`${url}/api/pembeli/bukatoko`, formdata, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  if (res.data.code != 200) {
    throw res.data.message;
  } else {
    return {status: res.data.code, body: res.data};
  }
};

export const addCart = async ({idProduct} = {}) => {
  const idAccount = await getCurrentIdAccount();
  const data = {
    id: idProduct,
    id_account: idAccount,
  };
  try {
    let res = await axios.post(`${url}/api/pembeli/addcart`, data);
    if (res.data.code != 200) {
      throw res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getCart = async () => {
  const data = {
    id_account: await getCurrentIdAccount(),
  };
  try {
    let res = await axios.post(`${url}/api/pembeli/opencart`, data);
    return {status: res.data.code, body: res.data};
  } catch (error) {
    throw error;
  }
};

export const getProfile = async ({userid} = {}) => {
  const res = await axios.get(`${url}/api/profile?id_account=${userid}`);
  if (res.data.status == 200) {
    return {status: res.data.status == 200, body: res.data};
  } else {
    throw res.data.message;
  }
};

export const getCartView = async () => {
  const data = {
    id_account: await getCurrentIdAccount(),
  };
  try {
    let res = await axios.post(`${url}/api/pembeli/viewcart`, data);
    return {status: res.data.code, body: res.data};
  } catch (error) {
    throw error;
  }
};
