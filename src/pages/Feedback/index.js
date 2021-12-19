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
      id_imageproduk: 75,
      id_image: 1,
      id_produk: 5,
      image: 'image/uploads/Product/5/1/2021121639398584.jpg',
      id_account: 7,
      name: 'Ikan Cupang',
      id_category: '1',
      price: 20000,
      description: 'Ikan cupang menarik cocok untuk aquarium',
      stock: 18,
      sold: 2,
      url_segment: 'ikan-cupang',
      diskon: 0,
      isdiskon: 'N',
      star: '5.0000',
      created_at: '2021-12-13 19:29:44',
      feedback: [
        {
          id_detail: 5,
          id_transaction: 4,
          id_produk: 5,
          price: 20000,
          qty: 2,
          id_feedback: 9,
          id_user: 15,
          id_toko: 7,
          star: 5,
          image: null,
          feedback: 'Pengiriman sangat cepat mantap',
          created_at: '2021-12-19 08:19:22',
        },
        {
          id_detail: 5,
          id_transaction: 4,
          id_produk: 5,
          price: 20000,
          qty: 2,
          id_feedback: 8,
          id_user: 15,
          id_toko: 7,
          star: 5,
          image: null,
          feedback: 'Pengiriman sangat cepat mantap',
          created_at: '2021-12-19 08:04:35',
        },
        {
          id_detail: 5,
          id_transaction: 4,
          id_produk: 5,
          price: 20000,
          qty: 2,
          id_feedback: 7,
          id_user: 15,
          id_toko: 7,
          star: 5,
          image: null,
          feedback: 'Mantap Pengiriman sangat cepat',
          created_at: '2021-12-19 08:02:05',
        },
        {
          id_detail: 5,
          id_transaction: 4,
          id_produk: 5,
          price: 20000,
          qty: 2,
          id_feedback: 6,
          id_user: 15,
          id_toko: 7,
          star: 5,
          image: null,
          feedback: 'Mantap Pengiriman sangat cepat',
          created_at: '2021-12-19 08:01:46',
        },
      ],
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

  const countTotalStar = feedback => {
    let totalStar = 0;
    feedback.forEach((f, i) => {
      totalStar += f.star;
    });
    return totalStar;
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
                feedback: feed,
              });
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {feed.image != null && (
                <View style={style.containerImage}>
                  <Image
                    source={feed.image != null && {uri: `${url}/${feed.image}`}}
                    style={style.image}></Image>
                </View>
              )}
              <View style={style.details}>
                <Text
                  style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                  {feed.name}
                </Text>
                {/* <Text style={style.productName}>{feed.akun.fullname}</Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={style.additionalInformation}>
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
                  {feed.star != null &&
                    countTotalStar(feed.feedback) / feed.feedback.length}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 20,
                  }}>
                  ({countTotalStar(feed.feedback)})
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
                  Review ({feed.feedback.length})
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 20,
                  }}></Text>
              </View>
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
    width: w * 0.15,
    height: w * 0.15,
    borderRadius: 10,
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
