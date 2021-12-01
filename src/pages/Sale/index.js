import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProductList from '../../components/ProductList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getProduct} from '../../webservice/buyer.service';
import {url} from '../../webservice/url';
import Modal from 'react-native-modal';

const Sale = ({navigation}) => {
  const [datas, setData] = useState([]);
  const [doFetch, setFetch] = useState(true);
  const [isShowModal, setModal] = useState(false);
  const [filter, setFilter] = useState(null);
  const [category, setCategory] = useState(null);
  const [filterMenu] = useState([
    {
      name: 'Lowest Price',
      method: 'ASC',
    },
    {
      name: 'Highest Price',
      method: 'DESC',
    },
  ]);
  useEffect(() => {
    if (doFetch) {
      getProduct()
        .then(res => {
          setData(res.body.data.data);
        })
        .catch(err => alert(err));
    }
    setFetch(false);
  });

  const OptionModal = () => (
    <Modal
      isVisible={isShowModal}
      onBackdropPress={() => setModal(false)}
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <View style={styles.modalBody}>
        <View style={styles.box}></View>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontWeight: 'bold',
              marginBottom: 15,
            }}>
            Filter
          </Text>
          {filterMenu.map((filter, indexFilter) => (
            <TouchableOpacity style={styles.buttonFilter} key={indexFilter}>
              <Text style={{color: 'black'}}>{filter.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView>
      <OptionModal />
      <View style={{marginBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 30,
          }}>
          <SearchBar
            clearIcon={false}
            placeholder="Cari ..."
            containerStyle={{
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            inputContainerStyle={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              borderRadius: 15,
              paddingLeft: 10,
              width: wp('70%'),
              alignSelf: 'flex-start',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}
            lightTheme
            // onChangeText={(search) => setSearch(search)}
            // value={search}
            // ref={searchInputRef}
            searchIcon={() => (
              <FontAwesome5
                onPress={() => {}}
                name="search"
                size={25}
                color="#777"
                solid={false}
              />
            )}
            onSubmitEditing={() => {}}
          />

          <TouchableOpacity
            onPress={() => setModal(true)}
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <FontAwesome5
              name="chart-bar"
              size={25}
              color="#777"
              solid={false}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <Text style={{color: 'black'}}>PROMO</Text>
          <Text style={{color: 'black'}}>PROMO</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <ProductList navigation={navigation} />
          <ProductList navigation={navigation} />
        </View>

        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: wp('100%'),
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              width: wp('37.5%'),
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Found{'\n'}3 Results
          </Text>
          {datas.length > 0 &&
            datas.map((product, i) => (
              <ProductList
                navigation={navigation}
                key={product.id_produk}
                productname={product.name}
                idproduct={product.id_produk}
                tokoname={product.namatoko}
                profileToko={`${url}/${product.profile_toko}`}
                address={`${product.address.slice(0, 15)}...`}
                productImage={`${url}/${product.image}`}
                price={product.price}
                urlSegment={product.url_segment}
                productStar={product.star}
                stock={product.stock}
              />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Sale;

const styles = StyleSheet.create({
  modalBody: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFF',
    width: wp('100%'),
    height: hp('50%'),
    flexDirection: 'column',
    bottom: -20,
    elevation: 30,
  },
  box: {
    alignSelf: 'center',
    width: wp('20%'),
    height: hp('0.8%'),
    backgroundColor: '#747474',
    borderRadius: 100,
  },
  buttonFilter: {
    width: wp('30%'),
    borderColor: '#00000',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginVertical: 6,
  },
});
