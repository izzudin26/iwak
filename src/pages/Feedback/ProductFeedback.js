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
    return reviews.map((review, i) => (
      <View style={css.contentContainer}>
        <View style={{flexDirection: 'row'}}>
          {stars(review.rate)}
          <Text style={{color: 'black', marginLeft: 10}}>{review.date}</Text>
        </View>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          {review.name}
        </Text>
        <View style={css.descriptionBox}>
          <Text style={{color: 'black', fontSize: 17}}>
            {review.description}
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <View>
      <Header />
      <ScrollView>
        <Content />
      </ScrollView>
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
