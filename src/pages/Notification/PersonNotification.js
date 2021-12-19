import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {getHistory} from '../../webservice/buyer.service';
import {getDetailOrder} from '../../webservice/seller.service';
import {url} from '../../webservice/url';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PersonNotification = ({navigation}) => {
  const [histories, setHistory] = useState([]);

  useEffect(() => {
    doFetch();
  }, []);

  const doFetch = async () => {
    try {
      const res = await getHistory();
      const {body} = res;
      body.data.map(async history => {
        const items = await Promise.all(
          (
            await getDetailOrder({id_transaction: history.id_transaction})
          ).body,
        );
        history.items = items;
        setHistory(oldHistory => [...oldHistory, history]);
      });
    } catch (error) {
      alert(error);
    }
  };

  const setShowDetails = index => {
    let currentHistory = [...histories];
    currentHistory[index].showDetails = !currentHistory[index].showDetails;
    setHistory(currentHistory);
  };

  const getStatusOrder = (pay, deliver, cancelled) => {
    if (cancelled == 'Y') {
      return 'Dibatalkan';
    } else if (cancelled != 'Y' && pay == 'Y' && deliver == 'N') {
      return 'Pembayaran Berhasil';
    } else if (pay == 'N' && cancelled == 'N' && deliver == 'N') {
      return 'Menunggu Konfirmasi Penjual';
    } else if (pay == 'Y' && cancelled == 'N' && deliver == 'Y') {
      return 'Deliver Done';
    } else {
      return 'Deliver';
    }
  };

  const countItemPrice = items => {
    let total = 0;
    for (let item of items) {
      total += item.price;
    }
    return total;
  };

  const parseDate = date => {
    const option = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    // const d = new Date(date)
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  };

  const HistoryView = () => {
    return histories.map((history, i) => {
      return (
        <View key={i}>
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
                  {history.nota}
                </Text>
              </View>
              <Text style={{fontSize: 16, color: 'black'}}>{history.date}</Text>
            </View>
            <View style={style.productContainer}>
              <Image
                style={style.productImage}
                source={
                  history.penjual.profile_toko
                    ? {uri: `${url}/${history.penjual.profile_toko}`}
                    : null
                }></Image>
              <Text style={{fontSize: 20, color: 'black'}}>
                {history.productName}
              </Text>
            </View>
            <View style={style.BottomContainer}>
              {history.ulasan == null &&
              getStatusOrder(history.pay, history.deliver, history.cancelled) ==
                'Deliver Done' ? (
                <TouchableOpacity
                  onPress={async () => {
                    navigation.navigate('InputFeedback');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#043C88',
                    height: 40,
                    marginBottom: 5,
                    width: width * 0.22,
                    borderRadius: 10,
                    alignSelf: 'flex-end',
                  }}>
                  <Text style={{color: '#F0C341', fontSize: 15}}>Feedback</Text>
                </TouchableOpacity>
              ) : null}

              <Text style={{fontSize: 15, color: 'black', alignSelf: 'center'}}>
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
                    <Text style={{color: '#043C88'}}>
                      {getStatusOrder(
                        history.pay,
                        history.deliver,
                        history.cancelled,
                      )}
                    </Text>
                  </View>
                </View>
                <View style={style.detailRow}>
                  <Text style={{color: 'black'}}>Date</Text>
                  <Text style={{color: 'black', fontSize: 15}}>
                    {parseDate(history.date)}
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
                {history.items.map((item, indexItem) => (
                  <View key={indexItem}>
                    <View style={style.detailColumn}>
                      <Text style={{color: 'black'}}>Name item</Text>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={style.detailColumn}>
                      <Text style={{color: 'black'}}>Quantity</Text>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>
                        {item.qty}
                      </Text>
                    </View>
                  </View>
                ))}

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
                    {/* {history.methodPayment} */}Transfer
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
                    Rp. {countItemPrice(history.items)}
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

export default PersonNotification;

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
    marginVertical: 10,
    marginHorizontal: 20,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 10,
  },
  BottomContainer: {
    paddingHorizontal: 15,
    flexDirection: 'column',
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
