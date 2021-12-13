import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  listOrder,
  getDetailOrder,
  paymentImage,
  deliverOrder,
  approveOrder,
  cancelOrder,
  deleteOrder,
  getAddressListOrder,
} from '../../webservice/seller.service';
import {url} from '../../webservice/url';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const IncomingOrder = () => {
  const [find, setFind] = useState('');
  const [isShowModal, setShowModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [isShowTransactionModal, setTransactionModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [doFetch, setFetch] = useState(true);
  const [paymentImages, setPaymentImage] = useState([]);
  const [findProduct, seFindProduct] = useState('');

  useEffect(() => {
    if (doFetch) {
      getData();
      setFetch(false);
    }
  });

  const doAcceptOrder = async index => {
    try {
      await approveOrder({id_transaction: orders[index].id_transaction});
      setOrders(oldOrder =>
        oldOrder.map((e, i) =>
          i == index
            ? {
                id_transaction: e.id_transaction,
                subtotal: e.subtotal,
                pay: 'Y',
                deliver: e.deliver,
                cancelled: e.cancelled,
                created_at: e.created_at,
                fullname: e.fullname,
                nota: e.nota,
                items: e.items,
              }
            : e,
        ),
      );
    } catch (error) {
      alert(error);
    }
  };

  const dodeleteOrder = async index => {
    try {
      await deleteOrder({id_transaction: orders[index].id_transaction});
      setOrders(oldOrder => oldOrder.filter((e, i) => i != index));
    } catch (error) {
      alert(error);
    }
  };

  const doDeliverOrder = async index => {
    try {
      await deliverOrder({id_transaction: orders[index].id_transaction});
      setOrders(oldOrder =>
        oldOrder.map((e, i) =>
          i == index
            ? {
                id_transaction: e.id_transaction,
                subtotal: e.subtotal,
                pay: e.pay,
                deliver: e.deliver,
                cancelled: e.cancelled,
                created_at: e.created_at,
                fullname: e.fullname,
                nota: e.nota,
                items: e.items,
              }
            : e,
        ),
      );
    } catch (error) {
      alert(error);
    }
  };

  const doCancelOrder = async index => {
    try {
      await cancelOrder({id_transaction: orders[index].id_transaction});
      setOrders(oldOrder =>
        oldOrder.map((e, i) =>
          i == index
            ? {
                id_transaction: e.id_transaction,
                subtotal: e.subtotal,
                pay: e.pay,
                deliver: e.deliver,
                cancelled: 'Y',
                created_at: e.created_at,
                fullname: e.fullname,
                nota: e.nota,
                items: e.items,
              }
            : e,
        ),
      );
    } catch (error) {
      alert(error);
    }
  };

  const filteredData = () => {
    return orders.filter(
      order => order.fullname.includes(find) || order.nota.includes(find),
    );
  };

  const getData = async () => {
    try {
      const req = await listOrder();
      const {data} = req.body;
      const joinDetail = await Promise.all(
        data.map(async transaction => {
          const items = await getDetailOrder({
            id_transaction: transaction.id_transaction,
          });
          transaction.items = items.body;
          return transaction;
        }),
      );
      console.log(joinDetail);
      setOrders(await joinDetail);
    } catch (error) {
      alert(error.message);
    }
  };

  const SearchBar = () => {
    return (
      <View style={css.searchBar}>
        <FontAwesome
          name="search"
          color="black"
          style={{marginHorizontal: 10}}
          size={15}
          solid></FontAwesome>
        <TextInput
          value={findProduct}
          onChangeText={val => seFindProduct(val)}
          onSubmitEditing={() => setFind(findProduct)}
          style={css.input}
          placeholder="Find Product"
          placeholderTextColor="#020202"></TextInput>
      </View>
    );
  };

  const _setModal = message => {
    setShowModal(true);
    setMessageModal(message);
  };

  const _showModalTransaction = async index => {
    try {
      const res = await paymentImage({
        id_transaction: orders[index].id_transaction,
      });
      console.log(res.body.data);
      setPaymentImage(res.body.data);
      setTransactionModal(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const _closeModal = () => {
    setShowModal(false);
    setMessageModal('');
    setTransactionModal(false);
  };

  const ListViewData = () => {
    return orders.map((order, i) => (
      <View style={css.cardOrder} key={i}>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          {order.nota}
        </Text>
        <Text style={{color: 'black', marginVertical: 2}}>
          {order.created_at.substr(0, 10)}
        </Text>
        <Text
          style={{
            color: 'black',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: w * 0.78,
          }}>
          {order.fullname}
        </Text>
        <View style={css.productDetail}>
          {/* <View style={css.imageContainer}>
            <Image
              source={require('../../assets/images/obat.png')}
              style={css.image}></Image>
          </View> */}
          <View style={{flexDirection: 'column'}}>
            {order.items.map((item, indexItem) => {
              return (
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginLeft: 15,
                    fontSize: 18,
                    marginTop: 2,
                  }}>
                  {item.qty} {item.name}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={css.additionalInformation}>
          <View style={css.additionalInformationColumn}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="truck" size={10} color="#707070"></FontAwesome>
              <Text style={{color: '#707070', marginLeft: 5}}>
                {order.type == 'COD'
                  ? 'Cash On Delivery'
                  : 'Transfer - Courier'}
              </Text>
            </View>
            <TouchableOpacity
              style={css.detailbtn}
              onPress={() => _showModalTransaction(i)}>
              <Text style={{color: '#043C88'}}>Check Transfer</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome
                name="map-marker-alt"
                size={12}
                color="#707070"></FontAwesome>
              <Text style={{color: '#707070', marginLeft: 5}}>
                Lokasi Pembeli
              </Text>
            </View>
            <TouchableOpacity
              style={css.detailbtn}
              onPress={() => getAddress(i)}>
              <Text style={{color: '#043C88'}}>Check Detail</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column'}}>
            {order.pay == 'N' && order.cancelled == 'N' && (
              <TouchableOpacity
                onPress={() => doAcceptOrder(i)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#043C88',
                  borderRadius: 15,
                  marginVertical: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignSelf: 'flex-end',
                }}>
                <Text style={{color: '#F5C63F', fontSize: 15}}>
                  Accept Order
                </Text>
              </TouchableOpacity>
            )}
            {order.deliver != 'P' && order.pay == 'Y' && (
              <TouchableOpacity
                onPress={() => doDeliverOrder(i)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#043C88',
                  borderRadius: 15,
                  marginVertical: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignSelf: 'flex-end',
                }}>
                <Text style={{color: '#F5C63F', fontSize: 15}}>
                  Deliver Order
                </Text>
              </TouchableOpacity>
            )}
            {
              (order.deliver = 'P' && order.pay == 'Y' && (
                <TouchableOpacity
                  onPress={() => doDeliverOrder(i)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#043C88',
                    borderRadius: 15,
                    marginVertical: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    alignSelf: 'flex-end',
                  }}>
                  <Text style={{color: '#F5C63F', fontSize: 15}}>
                    Done Deliver
                  </Text>
                </TouchableOpacity>
              ))
            }
            {order.cancelled != 'Y' ? (
              <TouchableOpacity
                onPress={() => doCancelOrder(i)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#043C88',
                  borderRadius: 15,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignSelf: 'flex-end',
                }}>
                <Text style={{color: '#F5C63F', fontSize: 15}}>
                  Cancel Order
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => dodeleteOrder(i)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#043C88',
                  borderRadius: 15,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignSelf: 'flex-end',
                }}>
                <Text style={{color: '#F5C63F', fontSize: 15}}>
                  Delete Order
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#043C88',
                borderRadius: 15,
                marginTop: 5,
                width: w * 0.28,
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignSelf: 'flex-end',
              }}>
              <Text style={{color: '#F5C63F', fontSize: 15}}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  const ModalAddress = () => {
    return (
      <View>
        <Modal
          onBackdropPress={_closeModal}
          isVisible={isShowModal}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={css.modalCard}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {messageModal}
            </Text>
            <TouchableOpacity style={css.btnCloseModal} onPress={_closeModal}>
              <FontAwesome name="times" color="black" size={20}></FontAwesome>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  const getAddress = async index => {
    try {
      const address = await getAddressListOrder({
        id_transaction: orders[index].id_transaction,
      });
      console.log(address);
      setMessageModal(address);
      setShowModal(true);
    } catch (error) {
      alert(error);
    }
  };

  const ModalTransaction = () => {
    return (
      <View>
        <Modal
          onBackdropPress={_closeModal}
          isVisible={isShowTransactionModal}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={css.modalCard}>
            {paymentImages.length != 0 ? (
              <Image
                resizeMode="contain"
                source={{uri: `${url}/${paymentImages[0].image}`}}
                style={css.imageTransaction}></Image>
            ) : null}

            <TouchableOpacity style={css.btnCloseModal} onPress={_closeModal}>
              <FontAwesome name="times" color="black" size={20}></FontAwesome>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View>
      <View style={css.searchBar}>
        <FontAwesome
          name="search"
          color="black"
          style={{marginHorizontal: 10}}
          size={15}
          solid></FontAwesome>
        <TextInput
          value={findProduct}
          onChangeText={val => seFindProduct(val)}
          onSubmitEditing={() => setFind(findProduct)}
          style={css.input}
          placeholder="Find Product"
          placeholderTextColor="#020202"></TextInput>
      </View>
      <ModalAddress />
      <ModalTransaction />
      <ScrollView style={{marginBottom: 130}}>
        <ListViewData />
      </ScrollView>
    </View>
  );
};

export default IncomingOrder;

const css = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  input: {
    color: 'black',
    marginLeft: 10,
    padding: 3,
    width: w * 0.7,
  },
  cardOrder: {
    flexDirection: 'column',
    marginHorizontal: 30,
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  productDetail: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imageContainer: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  additionalInformation: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: w * 0.8,
  },
  additionalInformationColumn: {
    flexDirection: 'column',
  },
  detailbtn: {
    marginVertical: 3,
    paddingHorizontal: 15,
  },
  modalCard: {
    backgroundColor: '#FFFF',
    borderRadius: 20,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: w * 0.8,
    padding: 15,
    elevation: 7,
  },
  btnCloseModal: {
    height: 40,
    width: 40,
    backgroundColor: '#FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 300,
    marginBottom: -40,
  },
  imageTransaction: {
    width: w * 0.7,
    height: h * 0.7,
    // maxHeight: h * 0.9,
    alignSelf: 'center',
    marginTop: 10,
  },
});
