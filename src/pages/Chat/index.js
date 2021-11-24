import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TokoChat from './tokoChat';
import UserChat from './userChat';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Chat = ({navigation}) => {
  const [navState, setNavState] = useState(0);

  const navbar = () => (
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
    <View style={{flexDirection: 'column'}}>
      {navbar()}
      <View>
        {navState == 0 ? (
          <UserChat navigation={navigation} />
        ) : (
          <TokoChat navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default Chat;

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
