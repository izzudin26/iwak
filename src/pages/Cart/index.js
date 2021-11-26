import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;
const Cart = ({navigation, route}) => {
  const [carts, setCart] = useState([
    {
      productName: 'Oranda',
      price: 10000,
      qty: 3,
      description: 'Pancawarna Rostail 15 cm',
    },
    {
      productName: 'Pil Biru',
      price: 10000,
      qty: 3,
      description: 'Pancawarna Rostail 15 cm',
    },
    {
      productName: 'Oranda',
      price: 10000,
      qty: 3,
      description: 'Pancawarna Rostail 15 cm',
    },
  ]);

  const _getTotal = () => {
    let total = 0;
    carts.map(c => {
      total += c.price * c.qty;
    });
    return total;
  };

  const Bottom = () => {
    return (
      <View style={css.bottomLayout}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: w * 0.9,
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
            Total
          </Text>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Rp. {_getTotal()}
          </Text>
        </View>
        <TouchableOpacity style={css.checkoutBtn} onPress={() => {}}>
          <Text style={{color: '#F5C63F'}}>Check Out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _incrementItem = index => {
    let currentItem = carts;
    currentItem[index].qty = currentItem[index].qty + 1;
    setCart([...currentItem]);
  };

  const _decrementItem = index => {
    let currentItem = carts;
    if (currentItem[index].qty > 0) {
      currentItem[index].qty = currentItem[index].qty - 1;
      setCart([...currentItem]);
    }
  };

  const CartComponent = () => {
    return carts.map((cart, i) => (
      <View style={css.cartCard} key={i}>
        <View style={css.containerImage}>
          <TouchableOpacity style={css.closeBtn}>
            <FontAwesome
              name="times"
              solid
              size={15}
              color="#F60202"></FontAwesome>
          </TouchableOpacity>
          <Image source={require('../../assets/images/obat.png')}></Image>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: w * 0.4,
            marginTop: 15,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            {cart.productName}
          </Text>
          <Text style={{color: 'black'}}>{cart.description}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 5,
            alignItems: 'flex-end',
            marginTop: 15,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Rp. {cart.price}
          </Text>
          <View style={css.contaienrValue}>
            <TouchableOpacity>
              <FontAwesome
                name="minus"
                size={15}
                color="black"
                onPress={() => _decrementItem(i)}></FontAwesome>
            </TouchableOpacity>
            <Text style={{color: 'black', marginHorizontal: 10}}>
              {cart.qty}
            </Text>
            <TouchableOpacity>
              <FontAwesome
                name="plus"
                size={15}
                color="black"
                onPress={() => _incrementItem(i)}></FontAwesome>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <View style={css.container}>
      <View style={css.containerCart}>
        <ScrollView>
          <CartComponent />
        </ScrollView>
      </View>
      <Bottom />
    </View>
  );
};

export default Cart;

const css = StyleSheet.create({
  container: {
    width: w,
    height: h * 0.9,
    padding: 10,
  },
  bottomLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCart: {
    height: h * 0.75,
    padding: 20,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 15,
    justifyContent: 'space-between',
    padding: 10,
  },
  containerImage: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  closeBtn: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: -15,
    marginLeft: -15,
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
  checkoutBtn: {
    borderRadius: 15,
    marginVertical: 20,
    backgroundColor: '#043C88',
    paddingHorizontal: 50,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contaienrValue: {
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    marginTop: 3,
  },
});
