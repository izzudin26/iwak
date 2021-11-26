import React, {useState} from 'react';
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

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const IncomingOrder = () => {
  const [find, setFind] = useState('');
  const [isShowModal, setShowModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [isShowTransactionModal, setTransactionModal] = useState(false);
  const [orders, setOrders] = useState([
    {
      producName: 'Oranda',
      date: '12/12/2021',
      nameBuyer: 'Radit',
      type: 'COD',
      address:
        'Jl. Lidah Wetan, Lidah Wetan, Kec. Lakarsantri, Kota SBY, Jawa Timur 60213',
    },
    {
      producName: 'Obat Biru',
      date: '12/12/2021',
      nameBuyer: 'Radit',
      type: 'Transfer',
      address:
        'Jl. Lidah Wetan, Lidah Wetan, Kec. Lakarsantri, Kota SBY, Jawa Timur 60213',
    },
  ]);

  const SearchBar = () => {
    const [findProduct, seFindProduct] = useState('');
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

  const _showModalTransaction = () => {
    setTransactionModal(true);
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
          New Order
        </Text>
        <Text style={{color: 'black', marginVertical: 2}}>{order.date}</Text>
        <Text
          style={{
            color: 'black',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: w * 0.78,
          }}>
          {order.nameBuyer}
        </Text>
        <View style={css.productDetail}>
          <View style={css.imageContainer}>
            <Image
              source={require('../../assets/images/obat.png')}
              style={css.image}></Image>
          </View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 15,
              fontSize: 18,
              marginTop: 15,
            }}>
            {order.producName}
          </Text>
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
            {order.type == 'Transfer' && (
              <TouchableOpacity
                style={css.detailbtn}
                onPress={_showModalTransaction}>
                <Text style={{color: '#043C88'}}>Check Transfer</Text>
              </TouchableOpacity>
            )}
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
              onPress={() => _setModal(order.address)}>
              <Text style={{color: '#043C88'}}>Check Detail</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#043C88',
              marginVertical: 20,
              borderRadius: 15,
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignSelf: 'flex-end',
            }}>
            <Text style={{color: '#F5C63F', fontSize: 15}}>Accept Order</Text>
          </TouchableOpacity>
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

  const ModalTransaction = () => {
    return (
      <View>
        <Modal
          onBackdropPress={_closeModal}
          isVisible={isShowTransactionModal}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={css.modalCard}>
            <Image
              source={require('../../assets/images/bcaexample.png')}
              style={css.imageTransaction}></Image>
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
      <SearchBar />
      <ModalAddress />
      <ModalTransaction />
      <ScrollView>
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
    maxHeight: h * 0.9,
    alignSelf: 'center',
  },
});
