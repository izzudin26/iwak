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
  let res = await axios.post(`${url}/api/pembeli/addcart`, data);
  if (res.data.code != 200 && res.data.status != 1) {
    throw res.data.message;
  }
};

export const changeTokocart = async ({idProduct} = {}) => {
  const idAccount = await getCurrentIdAccount();
  const data = {
    id: idProduct,
    id_account: idAccount,
  };
  let res = await axios.post(`${url}/api/pembeli/changetoko`, data);
  console.log(res.data);
  if (res.data != 'sukses') {
    throw res.data.message;
  }
};

export const deleteCart = async ({idcart}) => {
  const data = {
    id: idcart,
  };
  let res = await axios.post(`${url}/api/pembeli/deletecart`, data);
  if (res.data.code != 200) {
    throw res.data.message;
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
  if (res.data.code == 200) {
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

export const addBidding = async ({id_lelang, price} = {}) => {
  const data = {
    id: id_lelang,
    price,
    id_account: await getCurrentIdAccount(),
  };
  let res = await axios.post(`${url}/api/addbid`, data);
  console.log(data);
  if (res.data.code == 200) {
    return {status: res.data.code, body: res.data};
  } else {
    throw res.data.message;
  }
};

export const checkOut = async ({formdata} = {}) => {
  formdata.append('id_account', await getCurrentIdAccount());
  const res = await fetch(`${url}/api/pembeli/checkout`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
    method: 'POST',
  });
  const jsonBody = await res.json();
  if (jsonBody.code != 200) {
    throw res.data.message;
  }
};

export const getHistory = async () => {
  try {
    const account = await getCurrentIdAccount();
    const res = await axios.get(
      `${url}/api/pembeli/history?id_account=${account}`,
    );
    if (res.data.code == 200) {
      return {status: res.data.code, body: res.data};
    } else {
      throw res.data.message;
    }
  } catch (error) {
    console.log(error);
    throw 'Terjadi Kesalahan Mengambil data';
  }
};

export const getMyProfile = async () => {
  const account = await getCurrentIdAccount();
  const res = await axios.get(`${url}/api/profile?id_account=${account}`);
  if (res.data.code == 200) {
    return {status: res.data.code, body: res.data};
  } else {
    throw res.data.message;
  }
};

export const getLatestBid = async ({idLelang} = {}) => {
  try {
    const res = await axios.get(
      `https://iwakstore.my.id/api/updateprice?id_lelang=${idLelang}`,
    );
    return {body: res.data};
  } catch (error) {
    throw 'INTERNAL SERVER ERROR';
  }
};

export const listroomChat = async () => {
  const account = await getCurrentIdAccount();
  try {
    const res = await axios.get(
      `${url}/api/chat/listroom?id_account=${account}`,
    );
    return {body: res.data, status: res.status};
  } catch (error) {
    console.log(error);
    throw 'INTERNAL SERVER ERROR';
  }
};

export const listChat = async ({id_room} = {}) => {
  const account = await getCurrentIdAccount();
  try {
    const res = await axios.get(
      `${url}/api/chat/listchat?id_account=${account}&id=${id_room}`,
    );
    return {body: res.data, status: res.status};
  } catch (error) {
    console.log(error);
    throw 'INTERNAL SERVER ERROR';
  }
};

export const sendChat = async ({id_room, receiver, message} = {}) => {
  const account = await getCurrentIdAccount();
  const data = {
    id: id_room,
    id_account: account,
    penerima: receiver,
    message: message,
  };
  try {
    await axios.post(`${url}/api/chat/sendchat`, data);
  } catch (error) {
    console.log(error);
    throw 'INTERNAL SERVER ERROR';
  }
};

export const newChat = async ({receiver, message} = {}) => {
  const account = await getCurrentIdAccount();
  const data = {
    idtoko: receiver,
    id_account: account,
    message,
  };
  try {
    await axios.post(`${url}/api/chat/newchat`, data);
  } catch (error) {
    console.log(error);
    throw 'INTERNAL SERVER ERROR';
  }
};

export const sendImageChat = async ({formdata} = {}) => {
  formdata.append('id_account', await getCurrentIdAccount());
  const res = await fetch(`${url}/api/chat/sendimgchat`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
    method: 'POST',
  });
  const jsonBody = await res.json();
  if (jsonBody.code != 200) {
    throw res.data.message;
  }
};
