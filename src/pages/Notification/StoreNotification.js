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
      methodPayment: 'Transfer',
      showDetails: false,
    },
    {
      status: 'success',
      productName: 'Oranda',
      date: '12/12/2021',
      paymentDate: '11/12/2021',
      qty: 2,
      paymentMethod: 'Transfer',
      totalPayment: 600000,
      methodPayment: 'Transfer',
      showDetails: false,
    },
  ]);

  const setShowDetails = index => {
    let currentHistory = [...histories];
    currentHistory[index].showDetails = !currentHistory[index].showDetails;
    setHistory(currentHistory);
  };

  const HistoryView = () => {
    return histories.map((history, i) => {
      return (
        <View>
          <TouchableOpacity
            style={style.containerHistory}
            key={i}
            onPress={() => setShowDetails(i)}>
            <View style={style.headerHistory}>
              <View style={style.statusHistory}>
                <Text style={{fontSize: 13, color: 'black'}}>
                  Purchase History
                </Text>
                <Text
                  style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
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
              <Text style={{fontSize: 15, color: 'black'}}>
                {history.showDetails ? 'Hide Details' : 'Show Detail'}
              </Text>
            </View>
          </TouchableOpacity>
          {history.showDetails ? (
            <View>
              <View style={style.detail}>
                <View style={style.detailRow}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{color: 'black'}}>Status</Text>
                    <Text style={{color: '#043C88'}}>Payment Successfull</Text>
                  </View>
                </View>
                <View style={style.detailRow}>
                  <Text style={{color: 'black'}}>Date</Text>
                  <Text style={{color: 'black', fontSize: 15}}>
                    {history.date}
                  </Text>
                </View>
              </View>
              <View style={style.orderDetail}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}>
                  Order details
                </Text>
                <View style={style.detailColumn}>
                  <Text style={{color: 'black'}}>Name item</Text>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {history.productName}
                  </Text>
                </View>
                <View style={style.detailColumn}>
                  <Text style={{color: 'black'}}>Quantity</Text>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {history.qty}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}>
                  Information Payment
                </Text>
                <View style={style.detailColumn}>
                  <Text style={{color: 'black'}}>Metode</Text>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {history.methodPayment}
                  </Text>
                </View>
                <View style={style.paymentCost}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Total Payment
                  </Text>
                  <Text
                    style={{
                      color: '#043C88',
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}>
                    Rp. {history.totalPayment}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      );
    });
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
  detail: {
    flexDirection: 'column',
    padding: 10,
    width: width * 0.7,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    borderLeftColor: '#00000',
    borderLeftWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderBottomColor: '#00000',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  orderDetail: {
    margin: 10,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    width: width * 0.73,
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
  detailColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  paymentCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
