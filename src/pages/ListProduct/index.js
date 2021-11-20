import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getToko, getReport} from '../../webservice/seller.service';
import {url} from '../../webservice/url';
import ProductForSale from './productForSale';
import ProductForAuction from './productForAuction';

const ListProduct = ({navigation}) => {
  const [togglePageIndex, setTogglePageIndex] = useState(0);

  const topBar = () => {
    return (
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/icons/search.png')}></Image>
          <TextInput
            placeholder="Find Product"
            placeholderTextColor="#000"
            style={{
              color: 'black',
              width: wp('60%'),
              marginLeft: 10,
            }}></TextInput>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct')}>
          <Image
            style={{width: 15, height: 15}}
            source={require('../../assets/icons/add.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const toggleComponent = () => {
    return (
      <View style={styles.containerToggle}>
        <TouchableOpacity
          onPress={() => {
            setTogglePageIndex(0);
            console.log(togglePageIndex);
          }}
          style={{
            backgroundColor: togglePageIndex == 0 ? '#36629F' : '#FFF',
            width: wp('50%'),
            height: hp('6%'),
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: togglePageIndex == 0 ? 'white' : 'black',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Product For Sale
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTogglePageIndex(1);
            console.log(togglePageIndex);
          }}
          style={{
            backgroundColor: togglePageIndex == 1 ? '#36629F' : '#FFFF',
            width: wp('50%'),
            height: hp('6%'),
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: togglePageIndex == 1 ? 'white' : 'black',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Product For Auction
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View>{topBar()}</View>
      <View>{toggleComponent()}</View>
      <View>
        {togglePageIndex == 0 ? <ProductForSale /> : <ProductForAuction />}
      </View>
    </ScrollView>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  topBar: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    elevation: 6,
    width: wp('75%'),
    height: hp('5%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
    marginLeft: 15,
    width: wp('10%'),
    height: hp('5%'),
  },
  containerToggle: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
