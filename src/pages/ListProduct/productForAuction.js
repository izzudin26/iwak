import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  lelang,
  nonActiveLelang,
  nonactiveLelang,
} from '../../webservice/seller.service';
import {url} from '../../webservice/url';

const ProductForAuction = () => {
  const [datas, setData] = useState([]);
  const [doFetch, setFetch] = useState(true);

  useEffect(() => {
    if (doFetch) {
      fetchLelang();
      setFetch(false);
    }
  });

  const fetchLelang = async () => {
    try {
      let lelangs = await lelang();
      console.log(lelangs);
      setData(lelangs.body.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const setNonactiveLelang = async index => {
    setData(
      datas.map((d, i) =>
        i == index
          ? {
              name: d.name,
              image: d.image,
              price: d.price,
              isactive: 'N',
              id_lelang: d.id_lelang,
              iswon: d.iswon,
            }
          : d,
      ),
    );
    try {
      await nonActiveLelang({id_lelang: datas[index].id_lelang});
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={style.container}>
      {datas.map((data, i) => (
        <TouchableOpacity activeOpacity={0.6} style={style.product} key={i}>
          <View style={style.photoContainer}>
            <Image
              style={style.photo}
              source={{uri: `${url}/${data.image}`}}></Image>
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
              {/* <Text style={{color: 'black', fontSize: 15}}>
                Stock : {data.stock}
              </Text> */}
              {/* <Text style={{color: 'black', fontSize: 15}}>
                {startTime} - {endTime}
              </Text> */}
            </View>
            <TouchableOpacity
              onPress={
                data.isactive == 'Y' ? () => setNonactiveLelang(i) : null
              }
              activeOpacity={data.isactive != 'Y' ? 1 : null}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: data.isactive == 'Y' ? '#043C88' : '#E8E8E8',
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
