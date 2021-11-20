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

const OpenBidding = ({navigation}) => {
  const [image, setImage] = useState(
    require('../../assets/images/Oranda2.png'),
  );
  const [product, setProduct] = useState('Oranda Fish');
  const [stock, setStock] = useState(200);
  const [price, setPrice] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = () => (
    <Modal isVisible={visibleModal}>
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
            onPress={() => setVisibleModal(!visibleModal)}
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
          <Image source={image} style={styles.image}></Image>
        </View>
        <View style={styles.containerDetail}>
          <Text style={styles.text}>{product}</Text>
          <Text style={styles.text}>Stock : {stock}</Text>
        </View>
      </View>
      <View style={styles.sectionMenu}>
        <View style={styles.form}>
          <TextInput
            placeholderTextColor="#707070"
            placeholder="Harga Lelang"
            style={{color: 'black'}}
            value={price}></TextInput>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholderTextColor="#707070"
            placeholder="Waktu Lelang"
            style={{color: 'black'}}
            value={price}></TextInput>
        </View>
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
          elevation: 0
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
    width: wp('20%'),
    height: wp('20%'),
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
    marginVertical: 18,
    width: wp('80%'),
    borderRadius: 10,
    height: hp('8%'),
    paddingHorizontal: 20,
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