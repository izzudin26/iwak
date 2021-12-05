import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Storage from '../../storage/index';
import {addCart} from '../../webservice/buyer.service';

const Wishlist = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [doFetch, setFetch] = useState(true);
  const [datas, setDatas] = useState([]);

  const filterData = () => {
    return datas.filter(data =>
      data.productname.toLowerCase().includes(search.toLowerCase()),
    );
  };

  useEffect(() => {
    if (doFetch) {
      Storage.getAllDataForKey('wishlist')
        .then(res => {
          setDatas(res);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      setFetch(false);
    }
  });

  const topBar = () => {
    return (
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/icons/search.png')}></Image>
          <TextInput
            value={search}
            onChangeText={val => setSearch(val)}
            placeholder="Find Product"
            placeholderTextColor="#000"
            style={{
              color: 'black',
              width: wp('60%'),
              marginLeft: 10,
            }}></TextInput>
        </View>
      </View>
    );
  };

  const stars = n =>
    Array(n)
      .fill(0)
      .map(() => (
        <FontAwesome5
          onPress={() => {}}
          name="star"
          size={10}
          color="#f1c40f"
          solid={true}
        />
      ));

  const unstar = n => {
    let stars = [];

    for (let i = 0; i < n; i++) {
      stars.push(
        <FontAwesome5
          onPress={() => {}}
          name="star"
          size={10}
          color="#f1c40f"
          key={i}
        />,
      );
    }
    return stars;
  };

  const doAddCart = async index => {
    try {
      console.log(datas[index].idproduct);
      await addCart({idProduct: datas[index].idproduct});
      remove(index);
      alert('Berhasil ditambahkan ke keranjang');
    } catch (error) {
      alert(error.message);
    }
  };

  const remove = index => {
    Storage.remove({key: 'wishlist', id: datas[index].idproduct});
    setDatas(oldData =>
      oldData.filter(data => data.idproduct != datas[index].idproduct),
    );
  };

  const dataView = () => (
    <View style={styles.containerCard}>
      <View style={styles.containerCard}>
        {filterData().map((data, i) => (
          <View style={styles.cardBody} key={i}>
            <View style={styles.productSection}>
              <View style={styles.ContainerImage}>
                <Image
                  style={styles.productImage}
                  source={{uri: data.productImage}}></Image>
              </View>
              <View style={styles.productDetail}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                  }}>
                  {data.productname}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Rp. {data.price}
                </Text>
                <View style={styles.starsRow}>
                  {stars(data.productStar)}
                  {unstar(5 - data.productStar)}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                    }}
                    source={require('../../assets/icons/location.png')}></Image>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                    }}>
                    {data.address}
                  </Text>
                </View>
              </View>
            </View>
            <Buttons stock={data.stock} indexItem={i} />
          </View>
        ))}
      </View>
    </View>
  );

  const Buttons = ({stock, indexItem}) => {
    return (
      <View style={styles.cardBottom}>
        <TouchableOpacity
          style={styles.trashBtn}
          onPress={() => remove(indexItem)}>
          <Image
            source={require('../../assets/icons/delete.png')}
            style={{width: 30, height: 30}}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={stock <= 0}
          style={{
            marginLeft: 20,
            width: wp('67%'),
            padding: 5,
            backgroundColor: stock > 0 ? '#043C88' : '#C3C3C3',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => doAddCart(indexItem)}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>
            {stock > 0 ? '+ Cart' : 'Out of stock'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View>{topBar()}</View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            paddingHorizontal: 30,
          }}>
          {datas.length} Items
        </Text>
      </View>
      <View>{dataView()}</View>
    </ScrollView>
  );
};

export default Wishlist;

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
    width: wp('90%'),
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
  containerCard: {
    flexDirection: 'column',
    width: wp('95%'),
    padding: 10,
    alignSelf: 'center',
  },
  cardBody: {
    padding: 30,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 15,
  },
  productSection: {
    flexDirection: 'row',
  },
  productDetail: {
    flexDirection: 'column',
    marginLeft: 25,
    justifyContent: 'center',
  },
  ContainerImage: {
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
  },
  productImage: {
    width: 70,
    height: 70,
    padding: 10,
  },
  starsRow: {
    paddingVertical: 3,
    flexDirection: 'row',
  },
  cardBottom: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 5,
    width: wp('80%'),
  },
  trashBtn: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 5,
  },
});
