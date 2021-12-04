import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {getProduct, saveLelang} from '../../webservice/seller.service';
import {url} from '../../webservice/url';

const OpenBidding = ({navigation, route}) => {
  const [images, setImage] = useState(null);
  const [product, setProduct] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [doFetch, setDoFetch] = useState(true);
  const {productId} = route.params;
  useEffect(() => {
    if (doFetch) {
      getProduct(productId)
        .then(res => {
          const {product, image} = res.body;
          setProduct(product.name);
          setStock(product.stock);
          setImage(image[0].image);
        })
        .catch(err => alert(err));

      setDoFetch(false);
    }
  });

  const processLelang = async () => {
    try {
      await saveLelang({id_produk: productId, price});
      navigation.pop();
    } catch (error) {
      alert(error.message);
    }
  };

  const showModal = () => (
    <Modal
      isVisible={visibleModal}
      onBackdropPress={() => setVisibleModal(!visibleModal)}>
      <View style={styles.modalCard}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          Konfirmasi Lelang !
        </Text>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'normal'}}>
          Setelah melakukan konfirmasi lelang tidak dapat dirubah
        </Text>
        <View style={styles.modalButtonSection}>
          <TouchableOpacity
            onPress={() => setVisibleModal(!visibleModal)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F33030',
              marginVertical: 20,
              height: 30,
              width: wp('25%'),
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#FFFF', fontWeight: 'bold', fontSize: 17}}>
              Batal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              processLelang();
              setVisibleModal(!visibleModal);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#48C42F',
              marginVertical: 20,
              height: 30,
              width: wp('25%'),
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#FFFF', fontWeight: 'bold', fontSize: 17}}>
              Ya
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={{height: hp('95%')}}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          fill in your product information in down below.
        </Text>
      </View>
      <View style={styles.containerProduct}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: images != null ? `${url}/${images}` : null}}
            style={styles.image}></Image>
        </View>
        <View style={styles.containerDetail}>
          <Text style={styles.text}>{product}</Text>
          <Text style={styles.text}>Stock : {stock}</Text>
        </View>
      </View>
      <View style={styles.sectionMenu}>
        <View style={styles.form}>
          <Text style={{color: 'black', alignSelf: 'center'}}>Rp. </Text>
          <TextInput
            placeholderTextColor="#707070"
            keyboardType={'number-pad'}
            placeholder="Buka Harga Lelang"
            style={{color: 'black', width: wp('75%')}}
            onChangeText={val => setPrice(val)}
            value={price}></TextInput>
        </View>
        {/* <View style={styles.form}>
          <TextInput
            placeholderTextColor="#707070"
            placeholder="Waktu Lelang"
            style={{color: 'black'}}
            value={price}></TextInput>
        </View> */}
      </View>
      <View>{showModal()}</View>
      <TouchableOpacity
        onPress={() => setVisibleModal(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#043C88',
          marginVertical: 20,
          height: 40,
          width: wp('50%'),
          borderRadius: 10,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          elevation: 0,
        }}>
        <Text style={{color: '#F0C341', marginLeft: 5, fontSize: 17}}>
          DONE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OpenBidding;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  containerProduct: {
    justifyContent: 'center',
    width: wp('80%'),
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  containerDetail: {
    paddingVertical: 20,
    marginLeft: 25,
    flexDirection: 'column',
  },
  image: {
    borderRadius: 20,
    width: wp('25%'),
    height: wp('25%'),
  },
  imageContainer: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  sectionMenu: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  form: {
    flexDirection: 'row',
    marginVertical: 18,
    width: wp('80%'),
    borderRadius: 10,
    height: hp('8%'),
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  modalCard: {
    width: wp('80%'),
    height: hp('15%'),
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  modalButtonSection: {
    flexDirection: 'row',
    marginBottom: -55,
    width: wp('60%'),
    justifyContent: 'space-between',
  },
});
