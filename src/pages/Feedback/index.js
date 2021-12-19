import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {getFeed} from '../../webservice/seller.service';
import {url} from '../../webservice/url';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Feedback = ({navigation}) => {
  const [feeds, setFeeds] = useState([
    {
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
    },
  ]);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await getFeed();
      setFeeds(res.body.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={style.container}>
      <ScrollView>
        {feeds.map((feed, i) => (
          <TouchableOpacity
            style={style.productCard}
            key={i}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('ProductFeedback', {
                data: feed,
              });
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {feed.image != null && (
                <View style={style.containerImage}>
                  <Image
                    source={feed.image != null && {uri: `${url}`}}
                    style={style.image}></Image>
                </View>
              )}
              <View style={style.details}>
                <Text
                  style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                  {feed.nota}
                </Text>
                {/* <Text style={style.productName}>{feed.akun.fullname}</Text> */}
              </View>
              <View style={{flexDirection: 'row'}}>
                {[1, 2, 3, 4, 5].map((n, i) => (
                  <FontAwesome5Icon
                    key={i}
                    name="star"
                    color={feed.star <= i ? '#707070' : '#EBC043'}
                    solid
                    style={{marginHorizontal: 3, alignSelf: 'center'}}
                    size={20}></FontAwesome5Icon>
                ))}
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              {/* <View style={style.additionalInformation}>
                <FontAwesome5Icon
                  name="star"
                  color="#EBC043"
                  solid
                  size={20}></FontAwesome5Icon>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    marginLeft: 5,
                    fontWeight: 'bold',
                  }}>
                  {feed.starsAvg}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 20,
                  }}>
                  ({feed.stars})
                </Text>
              </View>
              <View style={style.additionalInformation}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    marginLeft: 5,
                    fontWeight: 'bold',
                  }}>
                  Review
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 20,
                  }}>
                  ({feed.reviewCounts})
                </Text>
              </View> */}
              {/* <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginTop: 5,
                  marginHorizontal: 15,
                  flexWrap: 'wrap',
                }}>
                {feed.feedback}
              </Text> */}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default Feedback;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  productCard: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'column',
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
  containerImage: {
    padding: 15,
    margin: 10,
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
    elevation: 6,
  },
  image: {
    width: w * 0.12,
    height: w * 0.12,
  },
  productName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
  },
  details: {
    flexDirection: 'column',
    margin: 10,
  },
  additionalInformation: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 4,
  },
});
