import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductForAuction = () => {
  const startTime = '09.00';
  const endTime = '21.00';
  const [datas, setData] = useState([
    {name: 'Oranda', price: '600000', stock: 10},
    {name: 'Obat Biru Auction', price: '20000', stock: 100},
    {name: 'Obat Biru Auction', price: '20000', stock: 100},
    {name: 'Obat Biru Auction', price: '20000', stock: 100},
    {name: 'Obat Biru Auction', price: '20000', stock: 100},
    {name: 'Obat Biru Auction', price: '20000', stock: 100},
    {name: 'Obat Biru Auction', price: '20000', stock: 100},
    {name: 'Obat Biru Auction', price: '20000', stock: 100},
  ]);

  return (
    <View style={style.container}>
      {datas.map((data, i) => (
        <TouchableOpacity activeOpacity={0.6} style={style.product} key={i}>
          <View style={style.photoContainer}>
            <Image
              style={style.photo}
              source={require('../../assets/images/agaru.png')}></Image>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: wp('60%'),
            }}>
            <View style={style.productDetail}>
              <Text style={{color: 'black', fontSize: 15}}>{data.name}</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                Rp. {data.price}
              </Text>
              <Text style={{color: 'black', fontSize: 15}}>
                Stock : {data.stock}
              </Text>
              <Text style={{color: 'black', fontSize: 15}}>
                {startTime} - {endTime}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#043C88',
                marginVertical: 20,
                height: 40,
                width: wp('20%'),
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              <Text
                style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 17}}>
                DONE
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductForAuction;

const style = StyleSheet.create({
  container: {
    padding: 20,
    width: wp('90%'),
  },
  product: {
    flexDirection: 'row',
    padding: 20,
    width: wp('90%'),
    borderBottomWidth: 2,
    borderColor: '#707070',
    alignItems: 'center',
  },
  productDetail: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 20,
  },
  photoContainer: {
    borderRadius: 20,
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
  },
  photo: {
    width: 80,
    height: 80,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
