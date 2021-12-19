import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const ProductFeedback = () => {
  const [feedback, setFeedback] = useState({
    star: 5,
    image: null,
    nota: 'PO-004/1221',
    id_feedback: 8,
    akun: {
      id_account: 15,
      fullname: 'upin',
      email: 'upin@mail.com',
      password: '123123',
      confirm_password: '123123',
      role: 'member',
      phone: '',
      address: '',
      gender: 'P',
      profile_picture: 'image/uploads/User/15/2021121639427014.jpeg',
      profile_toko: null,
      namatoko: null,
      islogin: 'Y',
      istoko: 'N',
      star: 0,
      nomor_rekening: 'null',
      bank: 'null',
      codeforgot: '',
      created_at: '2021-12-14 03:02:47',
      updated_at: '2021-12-19 04:58:04',
      last_online: '2021-12-19 04:58:04',
    },
    feedback: 'Pengiriman sangat cepat mantap',
    toko: {
      id_account: 7,
      fullname: 'Pak bambang',
      email: 'Pakbambang@mail.com',
      password: '123123',
      confirm_password: '123123',
      role: 'member',
      phone: '08123456789',
      address: 'Jl. Raya Veteran',
      gender: 'P',
      profile_picture: 'image/uploads/User/7/2021121639301696.jpeg',
      profile_toko: 'image/uploads/Toko/7/2021121639398258.jpeg',
      namatoko: 'BambangFish',
      islogin: 'N',
      istoko: 'N',
      star: 0,
      nomor_rekening: '320012200',
      bank: 'BCA',
      codeforgot: '',
      created_at: '2021-12-12 16:32:51',
      updated_at: '2021-12-19 04:57:23',
      last_online: '2021-12-19 04:57:23',
    },
  });

  const [reviews, setReviews] = useState([
    {
      rate: 5,
      date: '10/12/2021',
      name: 'Nama Pembeli',
      description:
        'Kondisi ikan sehat sempurna perfect dan seperti di deskpripsi (emotapi) (emotapi)',
    },
    {
      rate: 6,
      date: '10/12/2021',
      name: 'Nama Pembeli',
      description: 'Kondisi Ikan sehat dan sempurna mantap mantap penjualn',
    },
  ]);

  const Header = () => (
    <View style={css.header}>
      <View style={css.headerContent}>
        <FontAwesome5Icon
          name="star"
          color="#EBC043"
          solid
          size={20}></FontAwesome5Icon>
        <Text style={css.textRate}>{feedback.avgRate}</Text>
        <Text style={{color: 'black'}}>/{feedback.rate}</Text>
      </View>
      <View style={css.contentDetail}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {feedback.message}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>{feedback.rate} rating - </Text>
          <Text style={{color: 'black'}}>{reviews.length} review </Text>
        </View>
      </View>
    </View>
  );

  const stars = n =>
    Array(n)
      .fill(0)
      .map(() => (
        <FontAwesome5Icon
          onPress={() => {}}
          name="star"
          size={15}
          color="#f1c40f"
          solid={true}
        />
      ));

  const Content = () => {
    return (
      <View style={css.contentContainer}>
        <View style={{flexDirection: 'row'}}>
          {stars(feedback.star)}
          {/* <Text style={{color: 'black', marginLeft: 10}}>{review.date}</Text> */}
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            marginVertical: 5,
            fontWeight: 'bold',
          }}>
          {feedback.akun.fullname}
        </Text>
        <View style={css.descriptionBox}>
          <Text style={{color: 'black', fontSize: 17}}>
            {feedback.feedback}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* <Header /> */}
      <Content />
    </View>
  );
};

export default ProductFeedback;

const css = StyleSheet.create({
  header: {
    flexDirection: 'row',
    margin: 25,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentDetail: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxWidth: w * 0.5,
    padding: 5,
  },
  textRate: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    marginTop: 20,
    flexDirection: 'column',
    marginHorizontal: 25,
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  descriptionBox: {
    maxWidth: w * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
