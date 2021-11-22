import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const TokoChat = () => {
  const [chats, setChats] = useState([
    {
      name: 'Opponent 1 Toko',
      shortDesc: 'Blablabla Opponent 1 Toko',
      image: require('../../assets/images/fotoUser.jpg'),
    },
    {
      name: 'Opponent 2 Toko',
      shortDesc: 'Blablabla Opponent 2 Toko',
      image: require('../../assets/images/fotoUser.jpg'),
    },
    {
      name: 'Opponent 3 Toko',
      shortDesc: 'Blablabla Opponent 3 Toko',
      image: require('../../assets/images/fotoUser.jpg'),
    },
    {
      name: 'Opponent 4 Toko',
      shortDesc: 'Blablabla Opponent 4 Toko',
      image: require('../../assets/images/fotoUser.jpg'),
    },
  ]);

  return (
    <ScrollView style={style.chatList}>
      {chats.map((chat, i) => (
        <TouchableOpacity key={i} style={style.chatContainer}>
          <Image source={chat.image} style={style.chatImage}></Image>
          <View style={style.chatDetail}>
            <Text style={style.textTitle}>{chat.name}</Text>
            <Text style={style.textDesc}>{chat.shortDesc}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TokoChat;

const style = StyleSheet.create({
  chatList: {
    padding: 30,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  chatDetail: {
    height: height * 0.1,
    width: width * 0.8,
    marginHorizontal: 25,
    flexDirection: 'column',
    borderBottomColor: '#00000',
    borderBottomWidth: 1,
  },
  chatImage: {
    padding: 10,
    borderRadius: 20,
    width: width * 0.15,
    height: width * 0.15,
  },
  textTitle: {
    marginVertical: 10,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  textDesc: {
    fontSize: 17,
    color: 'black',
  },
});
