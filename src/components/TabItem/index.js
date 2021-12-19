import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {Badge} from 'react-native-elements';
import {Icon} from 'react-native-elements';
// import CONFIG from '../../global/config';
// import User from '../../data/user';

const TabItem = ({
  isFocused,
  onLongPress,
  onPress,
  label,
  navigation,
  chat_count,
}) => {
  // const [userImage, setUserImage] = useState(null);

  // useEffect(() => {
  //     const unsubscribe = navigation.addListener('state', async (e) => {
  //         try {
  //             if (label === 'Akun') {
  //                 const user = await User.getUser();
  //                 setUserImage(user.image);
  //             }
  //         } catch (error) {
  //             console.log(error.message);
  //         }
  //     });

  //     return unsubscribe;
  // }, [navigation])

  const Icons = () => {
    if (label === 'Home')
      return isFocused ? (
        <Icon name="home" type="font-awesome" color="#F0C341" size={30} />
      ) : (
        <Icon name="home" type="font-awesome" color="#F0C341" size={30} />
      );

    if (label === 'Chat')
      return (
        <View>
          <Icon name="comments" type="font-awesome" color="#F0C341" size={30} />
          {chat_count != 0 && chat_count && (
            <Badge
              containerStyle={{
                position: 'absolute',
                right: 0,
                top: 0,
              }}
              value={chat_count}></Badge>
          )}
        </View>
      );

    if (label === 'Wishlist')
      return isFocused ? (
        <Icon name="heart" type="font-awesome" color="#F0C341" size={30} />
      ) : (
        <Icon name="heart" type="font-awesome" color="#F0C341" size={30} />
      );

    if (label === 'Product')
      return isFocused ? (
        <Icon
          name="shopping-bag"
          type="font-awesome"
          color="#F0C341"
          size={30}
        />
      ) : (
        <Icon
          name="shopping-bag"
          type="font-awesome"
          color="#F0C341"
          size={30}
        />
      );

    if (label === 'Account')
      return isFocused ? (
        <Icon name="user" type="font-awesome" color="#F0C341" size={30} />
      ) : (
        <Icon name="user" type="font-awesome" color="#F0C341" size={30} />
      );

    // if (label === "Akun") return isFocused ?
    //     <Image
    //         source={{
    //             uri: userImage ?
    //                 `${CONFIG.IMAGE_PATH.USER}/${userImage}` :
    //                 `${CONFIG.IMAGE_PATH.USER}/default_user.png`,
    //         }}
    //         style={styles.ImageFocused}
    //     /> :
    //     <Image
    //         source={{
    //             uri: userImage ?
    //                 `${CONFIG.IMAGE_PATH.USER}/${userImage}` :
    //                 `${CONFIG.IMAGE_PATH.USER}/default_user.png`,
    //         }}
    //         style={styles.Image}
    //     />

    return <Icon name="home" type="font-awesome" color="#007bff" size={30} />;
  };
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <Icons size={18} />
      <Text style={styles.title}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  title: {
    color: '#F0C341',
    width: 60,
    textAlign: 'center',
  },
  Image: {
    width: 33,
    height: 33,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  ImageFocused: {
    width: 33,
    height: 33,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007bff',
  },
});
