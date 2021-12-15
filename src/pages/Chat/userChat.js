import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {url} from '../../webservice/url';
import {listroomChat} from '../../webservice/buyer.service';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const UserChat = ({navigation}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    doGetListRoom();
  }, []);
  const doGetListRoom = async () => {
    try {
      const req = await listroomChat();
      setChats(req.body);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView style={style.chatList}>
      {chats.map((chat, i) => (
        <TouchableOpacity
          key={i}
          style={style.chatContainer}
          onPress={() => {
            navigation.navigate('ChatPerson', {
              idRoom: chat.id_roomchat,
              idOpponent: chat.account.id_account,
            });
          }}>
          <Image
            source={
              chat.account.profile_picture != null
                ? {uri: `${url}/${chat.account.profile_picture}`}
                : require('../../assets/images/fotoUser.jpg')
            }
            style={style.chatImage}></Image>
          <View style={style.chatDetail}>
            <Text style={style.textTitle}>{chat.account.fullname}</Text>
            <Text style={style.textDesc}>
              {chat.last_message.substr(0, 30)}{' '}
              {chat.last_message.length > 30 ? '...' : ''}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default UserChat;

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
