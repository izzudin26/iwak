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

function AddProduct({navigation}) {
  const header = () => {
    return (
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        fill in your product information in down below.
      </Text>
    );
  };

  const form = () => {
    return (
      <View>
        <TextInput
          style={styles.form}
          placeholder="Nama Produk"
          placeholderTextColor="#707070"></TextInput>
        <TextInput
          style={styles.form}
          placeholder="Categories"
          placeholderTextColor="#707070"></TextInput>
        <TextInput
          style={styles.form}
          placeholder="Detail Produk"
          multiline={true}
          numberOfLines={5}
          placeholderTextColor="#707070"></TextInput>
        <TextInput
          style={styles.form}
          placeholder="Price"
          keyboardType="number-pad"
          placeholderTextColor="#707070"></TextInput>
        <TextInput
          style={styles.form}
          placeholder="Stok"
          keyboardType="numeric"
          placeholderTextColor="#707070"></TextInput>
      </View>
    );
  };

  const photos = () => {
    return (
      <ScrollView horizontal={true}>
        <TouchableOpacity style={styles.imageAddButton}>
          <Image
            style={styles.image}
            source={require('../../assets/icons/add.png')}></Image>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const photoProduct = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            padding: 30,
            fontSize: 22,
            color: 'black',
            fontWeight: 'bold',
          }}>
          Photo Product
        </Text>
        <View style={styles.scrollImage}>{photos()}</View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          padding: 25,
          justifyContent: 'center',
        }}>
        {header()}
      </View>
      <View style={styles.containerForm}>{form()}</View>
      <View>{photoProduct()}</View>
    </ScrollView>
  );
}

export default AddProduct;

const styles = StyleSheet.create({
  containerForm: {
    alignContent: 'center',
    alignItems: 'center',
  },
  form: {
    color: 'black',
    flexDirection: 'row',
    width: wp('80%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginVertical: 10,
  },
  imageAddButton: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
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
  scrollImage: {
    width: wp('100%'),
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    padding: 30,
    width: 10,
    height: 10,
  },
});
