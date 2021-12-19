import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {getProfile} from '../../webservice/buyer.service';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const ProductFeedback = ({route}) => {
  const {feedback} = route.params;
  const [totalRate, setTotalRate] = useState(null);
  const [happyCount, setHappy] = useState(null);
  const [feedbacksUser, setFeedbacks] = useState([]);

  useEffect(() => {
    joinFeedbackUser();
  }, []);

  const joinFeedbackUser = async () => {
    let total = 0;
    let happy = 0;
    const newFeeddbacks = await Promise.all(
      feedback.feedback.map(async (f, i) => {
        const userName = await (
          await getProfile({userid: f.id_user})
        ).body.data.fullname;
        f.username = userName;
        if (f.star > 2) happy += 1;
        total += f.star;
        return f;
      }),
    );
    setHappy(happy);
    setTotalRate(total);
    setFeedbacks(await newFeeddbacks);
  };

  const Header = () => (
    <View style={css.header}>
      <View style={css.headerContent}>
        <FontAwesome5Icon
          name="star"
          color="#EBC043"
          solid
          size={20}></FontAwesome5Icon>
        <Text style={css.textRate}>
          {totalRate != null && parseFloat(totalRate / feedbacksUser.length)}
        </Text>
        <Text style={{color: 'black'}}>/5.0</Text>
      </View>
      <View style={css.contentDetail}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {happyCount != null && (happyCount / feedbacksUser.length) * 100}%
          Buyer Happy with this item
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>
            {totalRate != null && parseFloat(totalRate / feedbacksUser.length)}{' '}
            rating -
          </Text>
          <Text style={{color: 'black'}}>{feedbacksUser.length} review </Text>
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

  const unstars = n =>
    Array(n)
      .fill(0)
      .map(() => (
        <FontAwesome5Icon
          onPress={() => {}}
          name="star"
          size={15}
          color="#f1c40f"
        />
      ));

  const Content = ({star, id_user, feedback_description, username}) => {
    return (
      <View style={css.contentContainer}>
        <View style={{flexDirection: 'row'}}>
          {stars(star)}
          {unstars(5 - star)}
          {/* <Text style={{color: 'black', marginLeft: 10}}>{review.date}</Text> */}
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            marginVertical: 5,
            fontWeight: 'bold',
          }}>
          {username}
        </Text>
        <View style={css.descriptionBox}>
          <Text style={{color: 'black', fontSize: 17}}>
            {feedback_description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Header />
      <ScrollView>
        {feedback.feedback.map((f, i) => (
          <Content
            key={i}
            id_user={f.id_user}
            feedback_description={f.feedback}
            star={f.star}
            username={f.username}
          />
        ))}
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
