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
  console.log(`${url}/api/pembeli/product/detail/${urlSegment}`);
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
