import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getProduct, getToko} from '../../webservice/seller.service';
import {url} from '../../webservice/url';

const DetailProductStore = ({navigation, route}) => {
  const [click, setClick] = useState(1);
  const [indexImage, setIndexImage] = useState(0);
  const [stock, setStock] = useState(10);
  const [price, setPrice] = useState(200000);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStar] = useState(0);
  const [toko, setToko] = useState('');
  const [tokoImg, setTokoImg] = useState(null);
  const [tokoAddress, setTokoAddress] = useState('');
  const [idCategory, setIdCategory] = useState(null);
  const [isDiskon, setIsDiskon] = useState(null);
  const [diskon, setDiskon] = useState(null);
  const [images, setImages] = useState([
    {
      url: require('../../assets/images/agaru.png'),
    },
    {
      url: require('../../assets/images/Auction.png'),
    },
    {
      url: require('../../assets/images/agaru.png'),
    },
    {
      url: require('../../assets/images/Auction.png'),
    },
    {
      url: require('../../assets/images/agaru.png'),
    },
  ]);
  const [isFetch, setFetch] = useState(true);
  const {productId} = route.params;

  useEffect(() => {
    if (isFetch) {
      getProduct(productId)
        .then(res => {
          setName(res.body.product.name);
          setPrice(res.body.product.price);
          setStock(res.body.product.stock);
          setDescription(res.body.product.description);
          setDiskon(res.body.product.diskon);
          setIsDiskon(res.body.product.isdiskon);
          setIdCategory(res.body.product.category);
        })
        .catch(err => alert(err));

      getToko()
        .then(res => {
          const {data} = res.body;
          setToko(data.namatoko);
          setTokoImg(`${url}/${data.profile_toko}`);
          setTokoAddress(data.address);
        })
        .catch(err => alert(err));
      setFetch(false);
    }
  });

  const PressedPlus = () => {
    setClick(click + 1);
  };

  const PressedMinus = () => {
    setClick(click - 1);
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

  return (
    <ScrollView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.ContainerMainImage}>
          <Image source={images[indexImage].url} style={styles.MainImage} />
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
            {images.map((image, i) => (
              <TouchableOpacity
                onPress={() => setIndexImage(i)}
                style={styles.ContainerSmallImage}
                key={i}>
                <Image source={image.url} style={styles.ImageSmall} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{width: wp('75%'), marginVertical: 20}}>
          <Text style={{color: 'black', fontSize: 18}}>{description}</Text>
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
                {/* Ini adalah keterangan product */}
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                {star(stars)}
              </View>
              <View style={{marginVertical: 5}}>
                <Text style={{fontSize: 15, color: 'black'}}>
                  Stock : {stock}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Image
                source={{uri: tokoImg}}
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
                {toko}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  width: 120,
                  textAlign: 'center',
                }}>
                {tokoAddress}
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
              <TouchableOpacity
                style={{marginVertical: 5}}
                onPress={() =>
                  navigation.navigate('OpenBidding', {
                    productId,
                  })
                }>
                <Text
                  style={{fontSize: 20, color: '#043C88', fontWeight: 'bold'}}>
                  ADD TO BID
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: 150,
                height: 40,
                backgroundColor: '#043C88',
                marginVertical: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() =>
                navigation.navigate('EditProduct', {
                  product: {
                    id: productId,
                    name: name,
                    description: description,
                    price: price,
                    stock: stock,
                    category: idCategory,
                    isDiskon: isDiskon,
                    diskon: diskon,
                  },
                })
              }>
              <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                Edit Product
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailProductStore;

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
});
