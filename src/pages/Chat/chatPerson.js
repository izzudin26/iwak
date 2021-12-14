import React, {useState, useRef, useEffect} from 'react';
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
import ImagePicker from 'react-native-image-crop-picker';
import {listChat, getProfile, sendChat} from '../../webservice/buyer.service';
import {url} from '../../webservice/url';
import {getCurrentIdAccount} from '../../webservice/user.service';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ChatPerson = ({route}) => {
  const [opponentName, setOpponentName] = useState('');
  const [opponentImage, setOpponentImage] = useState(null);
  const msgRef = useRef();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getOppponentProfile();
    getLisfOfChat();
  }, []);

  const getLisfOfChat = async () => {
    if (route.params.idRoom) {
      try {
        const idAccount = await getCurrentIdAccount();
        const chatData = await listChat({id_room: route.params.idRoom});
        setChats([]);
        for (let chat of chatData.body) {
          const messageAccountId = chat.account.substr(0, 2);
          const pushData = {
            label: messageAccountId.includes(idAccount.toString())
              ? 'self'
              : 'opponent',
            message: chat.message,
            time: chat.created_at,
            image: chat.photourl,
          };
          setChats(prevChat => [...prevChat, pushData]);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const sendImage = async () => {
    const img = await ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
      forceJpg: true,
    });
    console.log(img);
  };

  const getOppponentProfile = async () => {
    const {idOpponent} = route.params;
    try {
      const res = await getProfile({userid: idOpponent});
      setOpponentName(res.body.data.fullname);
      setOpponentImage(res.body.data.profile_picture);
    } catch (error) {
      alert(error);
    }
  };

  const doSendChat = async message => {
    try {
      await sendChat({
        id_room: route.params.idRoom,
        message,
        receiver: route.params.idOpponent,
      });
      getLisfOfChat();
    } catch (error) {
      alert(error);
    }
  };

  const NavbarComponent = () => {
    return (
      <View style={style.navbar}>
        <Image
          style={style.profileIcon}
          source={
            opponentImage != null
              ? {uri: `${url}/${opponentImage}`}
              : require('../../assets/images/fotoUser.jpg')
          }></Image>
        <Text style={style.profileName}>{opponentName}</Text>
      </View>
    );
  };

  const ChatComponent = () => {
    let scrollref = useRef();
    return (
      <View style={style.chatContainer}>
        <ScrollView
          focusable={false}
          ref={scrollref}
          onContentSizeChange={() =>
            scrollref.current.scrollToEnd({animated: true})
          }>
          {chats.map((chat, i) => (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
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

  const ChatInput = () => {
    const [messageInput, setMessage] = useState('');

    return (
      <KeyboardAvoidingView behavior="height">
        <View style={style.chatInputContainer}>
          <View style={style.chatInputBox}>
            <TextInput
              value={messageInput}
              onChangeText={val => {
                setMessage(val);
              }}
              style={style.textInput}
              placeholder="Tulis pesan"
              placeholderTextColor="black"></TextInput>
            <TouchableOpacity style={style.btnSend} onPress={sendImage}>
              <FontAwesome5 name="plus" size={20} solid color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={style.btnSend}
            onPress={() => {
              doSendChat(messageInput);
              setMessage('');
            }}>
            <FontAwesome5 name="paper-plane" size={20} solid color="#EBC043" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };

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
