import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {url} from '../../webservice/url';
import {getProductSegment, addCart} from '../../webservice/buyer.service';

const DetailProductAuction = ({navigation, route}) => {
  const [click, setClick] = useState(1);
  const [indexImage, setIndexImage] = useState(null);
  const [stock, setStock] = useState(10);
  const [price, setPrice] = useState(200000);
  const [total, setTotal] = useState(0);
  const [idProduct, setIdProduct] = useState(null);
  const [name, setName] = useState('');
  const [tokoName, setTokoName] = useState('');
  const [profileToko, setProfileToko] = useState('');
  const [productStar, setStar] = useState(0);
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');
  const [doFetch, setFetch] = useState(true);
  const [images, setImages] = useState([]);
  const [bidPrice, setBidPrice] = useState(0);

  const {urlSegment} = route.params;
  useEffect(() => {
    if (doFetch) {
      getProductSegment({urlSegment: urlSegment})
        .then(res => {
          const {data, image} = res.body;
          setName(data[0].name);
          setIdProduct(data[0].id_produk);
          setPrice(data[0].price);
          setDetail(data[0].description);
          setStock(data[0].stock);
          setTokoName(data[0].namatoko);
          setProfileToko(`${url}/${data[0].profile_toko}`);
          setStar(parseInt(data[0].star));
          image.map(i => {
            const listImage = images;
            listImage.push(`${url}/${i.image}`);
            setImages([...listImage]);
          });
          setIndexImage(0);
          console.log(images);
        })
        .catch(err => alert(err));
      setFetch(false);
    }
  });

  const addtoCart = async () => {
    try {
      await addCart({idProduct: idProduct});
      alert('Produk Berhasil ditambahkan ke keranjang');
      navigation.pop();
    } catch (error) {
      alert(error.message);
    }
  };

  const PressedPlus = () => {
    if (total < stock) setTotal(prevTotal => total + 1);
  };

  const PressedMinus = () => {
    if (total > 0) setTotal(prevTotal => total - 1);
  };

  const star = n => {
    let stars = [];

    for (let i = 0; i < n; i++) {
      stars.push(
        <FontAwesome5
          onPress={() => {}}
          name="star"
          size={15}
          color="#f1c40f"
          solid={true}
          key={i}
        />,
      );
    }
    return stars;
  };

  const unstar = n => {
    let stars = [];

    for (let i = 0; i < n; i++) {
      stars.push(
        <FontAwesome5
          onPress={() => {}}
          name="star"
          size={15}
          color="#f1c40f"
          key={i}
        />,
      );
    }
    return stars;
  };

  const Many = () => {
    return (
      <View style={styles.contaienrValue}>
        {/* <TouchableOpacity>
          <FontAwesome5
            name="minus"
            size={15}
            color="black"
            onPress={PressedMinus}></FontAwesome5>
        </TouchableOpacity> */}
        <Text style={{color: 'black', marginHorizontal: 20}}>1</Text>
        {/* <TouchableOpacity>
          <FontAwesome5
            name="plus"
            size={15}
            color="black"
            onPress={PressedPlus}></FontAwesome5>
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.ContainerMainImage}>
          <Image
            source={{uri: indexImage != null ? images[indexImage] : null}}
            style={styles.MainImage}
          />
        </View>

        <View
          style={{
            width: wp('80%'),
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
            height: hp('15%'),
          }}>
          <ScrollView horizontal={true}>
            {images.length > 0 &&
              images.map((image, i) => (
                <TouchableOpacity
                  onPress={() => setIndexImage(i)}
                  style={styles.ContainerSmallImage}
                  key={i}>
                  <Image source={{uri: image}} style={styles.ImageSmall} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <View style={{width: wp('75%'), marginVertical: 20}}>
          <Text style={{color: 'black', fontSize: 18}}>{detail}</Text>
        </View>

        <View style={styles.ContainerBottom}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  height: 35,
                  width: 200,
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  width: wp('60%'),
                  fontSize: 15,
                  color: 'black',
                }}>
                Ini adalah keterangan product
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                {star(productStar)}
                {unstar(5 - productStar)}
              </View>
              <View style={{marginVertical: 5}}>
                <Text style={{fontSize: 15, color: 'black'}}>
                  Stock : {stock}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Image
                source={{uri: profileToko}}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  width: 120,
                  textAlign: 'center',
                }}>
                {tokoName}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  width: 120,
                  textAlign: 'center',
                }}>
                {/* {address.slice(0, 20)}... */}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              padding: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
                Rp. {price}
              </Text>
            </View>
            {/* <Many /> */}
            <TouchableOpacity
              style={{
                height: 40,
                width: wp('20%'),
                backgroundColor: '#043C88',
                marginVertical: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={addtoCart}>
              <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                Add Bidding
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailProductAuction;

const styles = StyleSheet.create({
  ContainerMainImage: {
    width: wp('70%'),
    height: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ContainerSmallImage: {
    alignContent: 'center',
    width: 90,
    height: 90,
    marginHorizontal: 5,
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
  ContainerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
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
  ContainerBottom: {
    width: '102%',
    height: hp('30%'),
    overflow: 'hidden',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 20,
  },
  ContainerButtonCart: {
    flexDirection: 'row',
    height: 30,
    width: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
    borderWidth: 1,
  },
  MainImage: {
    height: wp('50%'),
    width: wp('50%'),
  },
  ImageSmall: {
    width: 50,
    height: 50,
  },
  contaienrValue: {
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
  },
});
