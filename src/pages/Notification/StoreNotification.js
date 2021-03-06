import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {listOrder} from '../../webservice/seller.service';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const StoreNotification = ({navigation}) => {
  const [notifications, setNotif] = useState([]);

  const getNotif = async () => {
    try {
      const res = await listOrder();
      const {body} = res;
      setNotif(body.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getNotif();
  }, []);

  return (
    <ScrollView>
      {notifications.map((notif, i) => (
        <View style={style.card}>
          <View style={style.header}>
            <Text style={{color: 'black'}}>Purchase History</Text>
            <Text style={{color: 'black'}}>{notif.date}</Text>
          </View>
          <View style={style.subHeader}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              You got new incoming order !
            </Text>
            <Text
              style={{
                color: 'black',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              {notif.fullname}
            </Text>
          </View>
          <View style={style.product}>
            {/* <View style={style.imageCard}>
              <Image
                source={require('../../assets/images/MainImage.png')}
                style={style.image}></Image>
            </View> */}
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                marginHorizontal: 15,
              }}>
              {notif.nota}
            </Text>
          </View>
          <TouchableOpacity
            style={style.btnShowDetails}
            onPress={() => navigation.navigate('IncomingOrder')}>
            <Text style={{color: '#F5C63F'}}>View Detail</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default StoreNotification;

const style = StyleSheet.create({
  card: {
    margin: 10,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  subHeader: {
    padding: 10,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    alignContent: 'flex-start',
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
  },
  imageCard: {
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 15,
  },
  btnShowDetails: {
    backgroundColor: '#043C88',
    paddingVertical: 10,
    margin: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});
