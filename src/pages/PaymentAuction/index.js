import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {checkOutAuction} from '../../webservice/buyer.service';
import {url} from '../../webservice/url';
import ImageCropPicker from 'react-native-image-crop-picker';

import Modal from 'react-native-modal';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const PaymentAuction = ({route, navigation}) => {
  const placeholder = {
    label: 'Method Payment',
    value: null,
    color: '#007bff',
  };

  const [isShowCardSelect, setShow] = useState(false);
  const [selectItems, setSelectItem] = useState(['Transfer']);
  const {items} = route.params;
  const {bank, nomor_rekening} = items[0];
  const [imagepay, setImagePay] = useState(null);

  const [userPayment, setUserPayment] = useState(selectItems[0]);

  console.log(route.params);

  const handlerImage = () => {
    ImageCropPicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
      forceJpg: true,
    })
      .then(res => {
        setImagePay(res);
      })
      .catch(err => console.log(err));
  };

  const getTotal = () => {
    let total = 0;
    items.map(item => {
      total += item.qty * item.price;
    });
    return total;
  };

  const doCheckout = () => {
    let fd = new FormData();
    for (let i in items) {
      fd.append(`arridproduk[${i}]`, items[i].id_produk);
      fd.append(`arrqty[${i}]`, items[i].qty);
      fd.append(`arrprice[${i}]`, items[i].price);
    }
    fd.append('id_penjual', items[0].id_account);
    fd.append('subtotal', getTotal());
    fd.append('image', {
      uri: imagepay.path,
      type: imagepay.mime,
      name: imagepay.path.split('/').join(''),
    });
    checkOutAuction({formdata: fd})
      .then(() => {
        alert('Berhasil melakukan checkout');
        navigation.pop();
      })
      .catch(err => alert(err));
  };

  const CardSelect = () => {
    return (
      <Modal
        isVisible={isShowCardSelect}
        onBackdropPress={() => setShow(false)}>
        <View style={styles.cardModal}>
          {selectItems.map((item, i) => (
            <TouchableOpacity
              style={styles.selectBtn}
              key={i}
              onPress={() => {
                setUserPayment(item);
                setShow(false);
              }}>
              <Text style={{color: 'black'}}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  };

  const CartComponent = () => {
    return items.map((cart, i) => (
      <View style={styles.cartCard} key={i}>
        <View style={styles.containerImage}>
          <Image
            source={{uri: `${cart.image}`}}
            style={{
              width: w * 0.12,
              height: w * 0.12,
              borderRadius: 10,
            }}></Image>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: w * 0.4,
            marginTop: 15,
            marginLeft: 5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            {cart.name}
          </Text>
          <Text style={{color: 'black', fontSize: 10}}>{cart.description}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 5,
            alignItems: 'flex-end',
            marginTop: 15,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Rp. {cart.price * cart.qty}
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
      <View>
        <Text
          style={{
            height: 70,
            width: wp('57.5%'),
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
          }}>
          Choice the method payment.
        </Text>
      </View>
      <View style={styles.SectionStyle}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <TextInput
            editable={false}
            value={`${userPayment} ${bank} - ${nomor_rekening}`}
            style={styles.inputStyle}
            placeholderTextColor="#000"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => {}}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
        </TouchableOpacity>
        {userPayment == 'Transfer' && (
          <View style={styles.addImageSection}>
            <TouchableOpacity style={styles.addImageBtn} onPress={handlerImage}>
              {imagepay == null ? (
                <FontAwesome name="plus" size={20} color="black"></FontAwesome>
              ) : (
                <Image
                  style={{width: w * 0.15, height: w * 0.15, borderRadius: 10}}
                  source={{uri: imagepay.path}}></Image>
              )}
            </TouchableOpacity>
            <Text style={{color: 'black'}}>Upload evidence of transfer</Text>
          </View>
        )}
      </View>
      <View style={styles.containerItems}>
        <ScrollView>
          <CartComponent />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Total
        </Text>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          {getTotal()}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: wp('37.5%'),
          height: 40,
          backgroundColor: '#043C88',
          marginVertical: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        onPress={doCheckout}>
        <Text style={{color: '#F0C341', fontWeight: 'bold'}}> Procceed </Text>
      </TouchableOpacity>
      <CardSelect />
    </View>
  );
};

export default PaymentAuction;

const styles = StyleSheet.create({
  SectionStyle: {
    width: wp('75%'),
    height: h * 0.25,
    backgroundColor: '#F0C341',
    borderRadius: 20,
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  inputStyle: {
    color: 'black',
    backgroundColor: '#fff',
    width: w * 0.65,
    height: 50,
    paddingLeft: 20,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  containerItems: {
    height: h * 0.3,
  },
  containerImage: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 15,
    borderRadius: 15,
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
  cardModal: {
    backgroundColor: '#FFFF',
    width: w * 0.8,
    padding: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  selectBtn: {
    padding: 5,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: w * 0.3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addImageBtn: {
    borderRadius: 20,
    width: w * 0.15,
    height: w * 0.15,
    marginRight: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: '#fff',
    width: wp('62.5%'),
    height: 50,
    paddingLeft: 20,
    paddingRight: 30,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
