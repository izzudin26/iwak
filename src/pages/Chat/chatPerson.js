import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ChatPerson = () => {
  const [opponentName, setOpponentName] = useState('Opponent Name');
  const msgRef = useRef();
  const [chats, setChats] = useState([
    {
      label: 'self',
      message: 'Hallo Selamat Siang',
      time: '10:20',
    },
    {
      label: 'opponent',
      message: 'Hallo juga Selamat Siang',
      time: '10:20',
    },
    {
      label: 'self',
      message: 'Bagaimana Kabar Anda',
      time: '10:20',
    },
    {
      label: 'opponent',
      message: 'Baik Sekali',
      time: '10:20',
    },
    {
      label: 'opponent',
      message: 'Bagaimana juga kabar anda',
      time: '10:20',
    },
    {
      label: 'self',
      message: 'Saya sangat sehat',
      time: '10:20',
    },
    {
      label: 'self',
      message: 'Hallo Selamat Siang',
      time: '10:20',
    },
    {
      label: 'opponent',
      message: 'Hallo juga Selamat Siang',
      time: '10:20',
    },
  ]);

  const NavbarComponent = () => {
    return (
      <View style={style.navbar}>
        <Image
          style={style.profileIcon}
          source={require('../../assets/images/fotoUser.jpg')}></Image>
        <Text style={style.profileName}>{opponentName}</Text>
      </View>
    );
  };

  const ChatComponent = () => {
    return (
      <View style={style.chatContainer}>
        <ScrollView focusable={false}>
          {chats.map((chat, i) => (
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                padding: 13,
                backgroundColor: chat.label == 'self' ? '#FFD96E' : '#E4E4E4',
                borderRadius: 15,
                maxwidth: width * 0.7,
                alignSelf: chat.label == 'self' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
              }}
              key={i}>
              <Text style={style.chatText}>{chat.message}</Text>
              <Text style={style.chatTime}>{chat.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const ChatTextInput = () => {
    const [messageInput, setMessage] = useState('');

    return (
      <View style={style.chatInputBox}>
        <TextInput
          value={messageInput}
          onChangeText={val => {
            setMessage(val);
          }}
          style={style.textInput}
          placeholder="Tulis pesan"
          placeholderTextColor="black"></TextInput>
        <TouchableOpacity style={style.btnSend}>
          <FontAwesome5 name="plus" size={20} solid color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const ChatInput = () => (
    <KeyboardAvoidingView behavior="height">
      <View style={style.chatInputContainer}>
        <ChatTextInput />
        <TouchableOpacity style={style.btnSend}>
          <FontAwesome5 name="paper-plane" size={20} solid color="#EBC043" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavbarComponent />
      <ChatComponent />
      <ChatInput />
    </SafeAreaView>
  );
};

export default ChatPerson;

const style = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    width: width,
    height: height * 0.13,
    backgroundColor: '#043C88',
    padding: 20,
  },
  profileIcon: {
    width: width * 0.15,
    height: width * 0.15,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  profileName: {
    color: '#EBC043',
    fontSize: 20,
    marginHorizontal: 10,
  },
  chatContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    width: width,
    height: height * 0.796,
    backgroundColor: '#FFFFF',
    padding: 20,
  },
  chatText: {
    color: 'black',
    fontSize: 19,
  },
  chatTime: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  chatInputContainer: {
    width: width,
    height: height * 0.13,
    flexDirection: 'row',
    backgroundColor: '#043C88',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  chatInputBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
    borderRadius: 100,
    flexDirection: 'row',
    width: width * 0.75,
  },
  textInput: {
    paddingHorizontal: 20,
    width: width * 0.6,
    color: 'black',
  },
  btnSend: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 10,
  },
});
