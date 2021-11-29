import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductList = ({
  navigation,
  productname,
  idproduct,
  tokoname,
  price,
  address,
  profileToko,
  productImage,
  urlSegment,
}) => {
  const star = n => {
    let stars = [];

    for (let i = 0; i < n; i++) {
      stars.push(
        <FontAwesome5
          onPress={() => {}}
          name="star"
          size={10}
          color="#f1c40f"
          solid={true}
          key={i}
        />,
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.Container}
      onPress={() =>
        navigation.navigate('DetailProduct', {
          urlSegment,
        })
      }>
      <Image source={{uri: productImage}} style={styles.Gambar} />
      <Text style={{height: 25, fontSize: 20, color: 'black'}}>
        {productname}
      </Text>
      <Text style={{height: 15, fontSize: 10, color: 'black', marginBottom: 2}}>
        Ini adalah keterangan product
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 5}}>{star(5)}</View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 7}}>
        <Image
          source={{uri: profileToko}}
          style={{
            width: wp('6.25%'),
            height: 25,
            borderRadius: 30,
          }}
        />

        <View style={{flexDirection: 'column', marginLeft: 5}}>
          <Text style={{fontSize: 10, color: 'black', width: wp('25%')}}>
            {tokoname}
          </Text>
          <Text style={{fontSize: 10, color: 'black', width: wp('25%')}}>
            {address}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 12, color: 'black', marginLeft: 10}}>
          Rp. {price}
        </Text>
        <FontAwesome5
          onPress={() => {}}
          name="gratipay"
          size={30}
          color="pink"
          solid={true}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  Container: {
    width: wp('37.5%'),
    height: 250,
    borderRadius: 30,
    padding: 10,
    marginVertical: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Gambar: {
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    marginBottom: 15,
    width: wp('35%'),
    height: wp('20%'),
  },
});
