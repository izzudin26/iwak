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
    rate: 5.0,
    avgRate: 10.0,
    message: '100% Buyer Happy with this item',
  });

  const [reviews, setReviews] = useState([
    {
      rate: 5,
      date: '10/12/2021',
      name: 'Nama Pembeli',
      description: 'Kondisi Ikan sehat dan sempurna mantap mantap penjualn',
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

  return (
    <View>
      <Header />
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
});
