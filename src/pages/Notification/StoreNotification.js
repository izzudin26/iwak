import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const StoreNotification = () => {
  const [histories, setHistory] = useState([
    {
      status: 'success',
      productName: 'Oranda',
      date: '12/12/2021',
      paymentDate: '11/12/2021',
      qty: 2,
      paymentMethod: 'Transfer',
      totalPayment: 600000,
    },
    {
      status: 'success',
      productName: 'Oranda',
      date: '12/12/2021',
      paymentDate: '11/12/2021',
      qty: 2,
      paymentMethod: 'Transfer',
      totalPayment: 600000,
    },
  ]);

  const HistoryView = () => {
    return histories.map((history, i) => (
      <View style={style.containerHistory} key={i}>
        <View style={style.headerHistory}>
          <View style={style.statusHistory}>
            <Text style={{fontSize: 13, color: 'black'}}>Purchase History</Text>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Congrats, Your Payment is Successfull
            </Text>
          </View>
          <Text style={{fontSize: 16, color: 'black'}}>{history.date}</Text>
        </View>
        <View style={style.productContainer}>
          <Image
            style={style.productImage}
            source={require('../../assets/images/MainImage.png')}></Image>
          <Text style={{fontSize: 20, color: 'black'}}>
            {history.productName}
          </Text>
        </View>
        <View style={style.BottomContainer}>
          <Text style={{fontSize: 15, color: 'black'}}>See Details</Text>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView>
      <HistoryView />
    </ScrollView>
  );
};

export default StoreNotification;

const style = StyleSheet.create({
  containerHistory: {
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
  headerHistory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  statusHistory: {
    flexDirection: 'column',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    marginVertical: 15,
    marginHorizontal: 20,
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 10,
  },
  BottomContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
