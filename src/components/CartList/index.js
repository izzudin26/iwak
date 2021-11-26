import React, {useState, useContext, createContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

let JumlahHarga = createContext();

const JumlahHargaProvider = ({children}) => {
  const [listTotal, setListTotal] = useState({});

  return (
    <JumlahHarga.Provider value={[listTotal, setListTotal]}>
      {children}
    </JumlahHarga.Provider>
  );
};

const CartList = ({harga, satuan, listTotal, setListTotal, setEndTotal}) => {
  const [click, setClick] = useState(satuan);
  const [price, setPrice] = useState(harga);
  const [total, setTotal] = useState(harga);

  const placeholder = {
    label: JSON.stringify(parseInt(satuan)),
    value: 0,
    color: '#000',
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical: 15,
        width: wp('90%'),
      }}>
      <View style={styles.ContainerSmallImage}>
        <Image
          source={require('../../assets/images/MainImage.png')}
          style={styles.ImageSmall}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: 70,
        }}>
        <Text
          style={{
            height: 35,
            width: wp('37.5%'),
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Nama Product
        </Text>
        <Text
          style={{
            height: 20,
            width: wp('37.5%'),
            fontSize: 15,
            color: 'black',
          }}>
          Ini adalah keterangan product
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          height: 70,
          marginTop: 5,
        }}>
        <Text style={{height: 20, fontSize: 15, color: 'black'}}>
          Rp. {total}
        </Text>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            placeholder: {
              color: '#333',
              fontSize: 14,
              fontWeight: 'normal',
            },
            iconContainer: {
              top: 8,
              left: 28,
            },
          }}
          Icon={() => {
            return <Chevron size={1} color="#333" />;
          }}
          useNativeAndroidPickerStyle={false}
          onValueChange={value => {
            setTotal(value + price);
            setEndTotal(value + price);

            listTotal = total;
            setListTotal(listTotal);

            // let total2 = 0;
            // for (const index in listTotal) {
            //     total2 += listTotal[index];
            // }
            // setEndTotal(total2);
          }}
          placeholder={placeholder}
          items={[
            {label: '2', value: price},
            {label: '3', value: price * 2},
            {label: '4', value: price * 3},
          ]}
        />
      </View>
    </View>
  );
};

const TotalView = ({JumlahTotal}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('75%'),
        justifyContent: 'space-around',
      }}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 40}}>
        Total
      </Text>
      <Text style={{color: 'black', fontSize: 40}}>{JumlahTotal}</Text>
    </View>
  );
};

export {CartList, JumlahHarga, JumlahHargaProvider, TotalView};

const styles = StyleSheet.create({
  ContainerSmallImage: {
    width: wp('25%'),
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
  ImageSmall: {
    width: wp('17.5%'),
    height: 70,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    width: wp('12.5%'),
    height: 25,
    color: '#333',
    backgroundColor: '#cacaca',
    paddingHorizontal: 13,
    paddingVertical: 2,
    borderRadius: 50,
  },
});
