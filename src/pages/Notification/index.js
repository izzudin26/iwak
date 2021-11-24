import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StoreNotification from './StoreNotification';

const height = Dimensions.get('window').height

const Notification = () => {
  const [navState, setNavState] = useState(0);

  const Navbar = () => (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: navState == 0 ? '#FFFF' : '#EBEBEB',
          justifyContent: 'center',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        onPress={() => setNavState(0)}>
        <FontAwesome5 name="user" size={20} solid color="#EBC043" />
        <Text style={styles.textHeader}>Username</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: navState == 1 ? '#FFFF' : '#EBEBEB',
          justifyContent: 'center',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        onPress={() => setNavState(1)}>
        <FontAwesome5 name="store" size={20} solid color="#EBC043" />
        <Text style={styles.textHeader}>Toko name</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Navbar />
      <View style={{padding: 20, marginVertical: 20, height: height * 0.82}}>
        <StoreNotification />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  textHeader: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
});
