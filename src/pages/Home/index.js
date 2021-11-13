import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Home = () => {
  return (
    <ScrollView>
      <View style={{alignSelf: 'center', marginBottom: 20}}>
        <View style={styles.bigSale}>
          <Image
            source={require('../../assets/images/Oranda.png')}
            style={{
              position: 'absolute',
              zIndex: -2,
              alignSelf: 'flex-end',
              marginVertical: 20,
              opacity: 0.8,
            }}
          />
          <Text style={styles.teksSatu}>SPECIALIST MARKET FISH AND ITEM</Text>
          <Text style={styles.teksAtas}> ORANDA </Text>
          <Text style={styles.teksTengah}> PANCAWARNA </Text>
          <Text style={styles.teksBawah}> ROSETAIL </Text>
          <Text style={styles.teksSatu}>------ SHOP NOW ------</Text>
        </View>

        <View style={styles.promo}>
          <Image
            source={require('../../assets/images/Oranda2.png')}
            style={{
              position: 'absolute',
              zIndex: -2,
              alignSelf: 'flex-start',
              opacity: 0.8,
            }}
          />
          <View style={{width: wp('66.25%')}}>
            <Text style={styles.teksTiga}>Oranda Rosetail</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: wp('20%'),
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: 'red',
                  opacity: 0.2,
                }}></View>
              <Text
                style={{
                  color: 'black',
                  position: 'absolute',
                  zIndex: 2,
                }}>
                -20%
              </Text>
            </View>
            <Text style={styles.teksEmpat}>SHOP NOW</Text>
          </View>
        </View>

        <View style={styles.shopNow}>
          <View style={{flexDirection: 'row', minWidth: wp('68.75%')}}>
            <Image
              source={require('../../assets/images/agaru.png')}
              style={styles.image}
            />
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
                maxWidth: wp('37.5%'),
              }}>
              <Text style={{fontSize: 25, color: 'black'}}>Agaru</Text>
              <Text style={{color: 'black'}}>Rp. 15.000</Text>
            </View>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.teksEmpat}>SHOP NOW</Text>
          </View>
        </View>

        <View style={styles.shopNow}>
          <View style={{flexDirection: 'row', minWidth: wp('68.75%')}}>
            <Image
              source={require('../../assets/images/obat.png')}
              style={styles.image}
            />
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
                maxWidth: wp('37.5%'),
              }}>
              <Text style={{fontSize: 25, color: 'black'}}>Obat Biru</Text>
              <Text style={{color: 'black'}}>Rp. 20.000</Text>
            </View>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.teksEmpat}>SHOP NOW</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  bigSale: {
    backgroundColor: '#eee',
    width: wp('87.5%'),
    height: 180,
    marginTop: 20,
  },
  teksSatu: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black',
    marginTop: 5,
  },
  teksAtas: {
    width: wp('55%'),
    fontSize: 25,
    textAlign: 'center',
    marginTop: 15,
    // marginVertical: 20,
    alignSelf: 'center',
    color: 'black',
  },
  teksBawah: {
    width: wp('55%'),
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
    // marginVertical: 20,
    alignSelf: 'center',
    color: 'black',
  },
  teksTengah: {
    color: '#F0C341',
    fontSize: 30,
    alignSelf: 'center',
    width: wp('65%'),
  },
  teksTiga: {
    width: wp('55%'),
    fontSize: 25,
    marginTop: 5,
    marginLeft: 15,
    color: 'black',
  },
  teksEmpat: {
    fontSize: 12,
    marginVertical: 10,
  },
  promo: {
    backgroundColor: '#eee',
    width: wp('87.5%'),
    height: 120,
    marginTop: 20,
    paddingRight: 5,
    flexDirection: 'row',
  },
  shopNow: {
    backgroundColor: '#eee',
    width: wp('87.5%'),
    height: 120,
    marginTop: 20,
    flexDirection: 'row',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
});
