import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {openToko} from '../../webservice/buyer.service';

const CreateStore = ({navigation}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bank, setBank] = useState('');
  const [rekening, setRekening] = useState('');
  const [image, setImage] = useState(null);

  const changeImage = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
      forceJpg: true,
    }).then(async res => {
      if (res.width != res.height) {
        alert('Mohon Pilih Rasio Gambar 1:1');
      } else {
        setImage(res);
      }
    });
  };

  const doCreate = async () => {
    const formData = new FormData();
    formData.append('namatoko', name);
    formData.append('bank', bank);
    formData.append('nomor_rekening', rekening);
    formData.append('image', {
      name: `${image.filename}.jpeg`,
      type: image.mime,
      uri: image.path,
    });
    try {
      await openToko({formdata: formData});
      navigation.navigate('Account');
    } catch (error) {
      alert(error);
    }
  };

  const ImageProfile = () => {
    return (
      <Image
        source={{uri: image.path}}
        style={{borderRadius: 20, width: wp('25%'), height: wp('25%')}}></Image>
    );
  };

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 50}}>
        <Text
          style={{
            marginTop: 50,
            height: 70,
            width: wp('57.5%'),
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
            marginVertical: 20,
          }}>
          Make your {'\n'}own store
        </Text>
        <View style={styles.containerImagePicker}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                width: wp('25%'),
                height: wp('25%'),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
              onPress={() => changeImage()}>
              {image != null ? (
                <ImageProfile />
              ) : (
                <FontAwesome5 name="plus" solid size={20} color="black" />
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                marginLeft: 20,
              }}>
              Choice Your Picture
            </Text>
          </View>
        </View>
        <View style={styles.SectionStyle}>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Name
          </Text>
          <TextInput
            style={styles.inputStyle}
            value={name}
            onChangeText={userState => setName(userState)}
            placeholder="Nama Toko"
            placeholderTextColor="#000"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            // onSubmitEditing={() => doUpdate()}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Location
          </Text>
          <TextInput
            style={styles.inputStyle}
            value={location}
            onChangeText={userState => setLocation(userState)}
            placeholder="Lokasi Toko"
            placeholderTextColor="#000"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            // onSubmitEditing={() => doUpdate()}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Rekening
          </Text>
          <TextInput
            style={styles.inputStyle}
            value={rekening}
            onChangeText={value => setRekening(value)}
            placeholder="Nomor Rekening"
            placeholderTextColor="#000"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            // onSubmitEditing={() => doUpdate()}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Bank
          </Text>
          <TextInput
            style={styles.inputStyle}
            value={bank}
            onChangeText={value => setBank(value)}
            placeholder="Nama Bank"
            placeholderTextColor="#000"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            // onSubmitEditing={() => doUpdate()}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
        </View>
        <TouchableOpacity
          style={{
            width: 150,
            height: 40,
            backgroundColor: '#043C88',
            marginVertical: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={doCreate}>
          <Text style={{color: '#F0C341', fontWeight: 'bold'}}>DONE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateStore;

const styles = StyleSheet.create({
  SectionStyle: {
    width: wp('75%'),
    padding: '5%',
    backgroundColor: '#F0C341',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  Image: {
    width: 200,
    height: 200,
    borderRadius: 70,
  },
  containerData: {
    flexDirection: 'row',
    width: wp('75%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  containerImagePicker: {
    flexDirection: 'row',
    width: wp('75%'),
    height: wp('30%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 30,
    backgroundColor: '#FAC93D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputStyle: {
    color: 'black',
    backgroundColor: '#fff',
    width: wp('60%'),
    height: 50,
    paddingLeft: 20,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
