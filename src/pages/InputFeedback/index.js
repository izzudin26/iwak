import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const InputFeedback = ({navigation}) => {
  const [feeds, setFeeds] = useState([
    {
      productName: 'Oranda',
      date: '12/12/2021',
      reviewCounts: 2,
      stars: 10,
      starsAvg: 4.7,
    },
  ]);

  const [starValue, setStar] = useState(2);

  const Star = () => {
    let star = [];
    for (let i in 4) {
      star.push(
        <FontAwesome5Icon
          name="star"
          color="#EBC043"
          solid
          size={20}></FontAwesome5Icon>,
      );
    }
    return star;
  };

  return (
    <View style={style.container}>
      <ScrollView>
        {feeds.map((feed, i) => (
          <View style={style.productCard} key={i}>
            <View style={style.itemProduct}>
              <View style={style.containerImage}>
                <Image
                  source={require('../../assets/images/MainImage.png')}
                  style={style.image}></Image>
              </View>
              <View style={style.details}>
                <Text style={style.productName}>{feed.productName}</Text>
                <View style={{flexDirection: 'row'}}>
                  {[1, 2, 3, 4, 5].map((n, i) => (
                    <FontAwesome5Icon
                      onPress={() => setStar(n)}
                      name="star"
                      color={starValue <= i ? '#707070' : '#EBC043'}
                      solid
                      style={{marginHorizontal: 3}}
                      size={30}></FontAwesome5Icon>
                  ))}
                </View>
              </View>
            </View>
            <Text style={{color: 'black', margin: 15}}>
              What you think this item make you content ?
            </Text>
            <View style={style.cardInput}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                style={{color: 'black'}}></TextInput>
            </View>
            <TouchableOpacity
              onPress={async () => {}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#043C88',
                marginVertical: 20,
                height: 40,
                width: w * 0.5,
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              <Text style={{color: '#F0C341', marginLeft: 5, fontSize: 17}}>
                SEND
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default InputFeedback;

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
  },
  itemProduct: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  cardInput: {
    margin: 10,
    borderRadius: 10,
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
    shadowColor: '#FFF',
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
