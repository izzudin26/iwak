import React, {useState} from 'react';
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

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Feedback = ({navigation}) => {
  const [feeds, setFeeds] = useState([
    {
      productName: 'Oranda',
      date: '12/12/2021',
      reviewCounts: 2,
      stars: 10,
      starsAvg: 4.7,
    },
    {
      productName: 'Obat Biru',
      date: '12/12/2021',
      reviewCounts: 2,
      stars: 10,
      starsAvg: 4.7,
    },
  ]);

  return (
    <View style={style.container}>
      <ScrollView>
        {feeds.map((feed, i) => (
          <TouchableOpacity
            style={style.productCard}
            key={i}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('ProductFeedback');
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={style.containerImage}>
                <Image
                  source={require('../../assets/images/MainImage.png')}
                  style={style.image}></Image>
              </View>
              <View style={style.details}>
                <Text style={{color: 'black'}}>{feed.date}</Text>
                <Text style={style.productName}>{feed.productName}</Text>
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
