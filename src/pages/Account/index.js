import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Storage from '../../storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as fs from 'react-native-fs';
import {updateProfile} from '../../webservice/user.service';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {logout} from '../../webservice/user.service';

const Account = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [password, setpassword] = useState('');
  const [toko, setToko] = useState('');

  useEffect(() => {
    if (name == '' || email == '' || password == '')
      Storage.load({key: 'user', id: 'user'}).then(data => {
        if (data) {
          setName(data.fullname);
          setemail(data.email);
          setpassword(data.password);
        }
      });
  });

  const changeImage = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
      forceJpg: true,
    }).then(async res => {
      handleUpload(res);
    });
  };

  const handleUpload = async (file = {}) => {
    let form = new FormData();
    let data = await Storage.load({key: 'user', id: 'user'});
    form.append('id_account', data.id_account);
    form.append('fullname', data.fullname);
    form.append('password', data.password);
    form.append('password_confirmation', data.confirm_password);
    form.append('phone', data.phone);
    form.append('address', data.address);
    form.append('norek', data.nomor_rekening);
    form.append('bank', data.bank);
    form.append('image', {
      name: file.filename,
      type: file.mime,
      uri: file.path,
    });
    console.log(file);
    doUpload(form);
  };

  const doUpload = async formdata => {
    try {
      let res = await updateProfile(formdata, 'form-data');
      console.log(res.body);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 50}}>
        <View style={styles.SectionStyle}>
          <Image
            source={{uri: `data:image/png;base64, ${imagePath}`}}
            style={styles.Image}
          />
          <TouchableOpacity
            onPress={() => changeImage()}
            style={{
              borderRadius: 50,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              position: 'absolute',
              right: 40,
            }}>
            <FontAwesome5 name="pen" solid size={15} color="#000" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            height: 70,
            width: wp('57.5%'),
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
            marginVertical: 20,
          }}>
          Your{'\n'}Personal Account
        </Text>
        <View style={styles.containerData}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 18}}>Name</Text>
            <Text style={{color: 'black', fontSize: 18}}>{name}</Text>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#043C88',
            }}
            onPress={() => navigation.navigate('EditName')}>
            <FontAwesome5 name="pen" solid size={12} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerData}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 18}}>Email Address</Text>
            <Text style={{color: 'black', fontSize: 18}}>{email}</Text>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#043C88',
            }}
            onPress={() => navigation.navigate('EditEmail')}>
            <FontAwesome5 name="pen" solid size={12} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerData}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 18}}>Password</Text>
            <Text style={{color: 'black', fontSize: 18}}>********</Text>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#043C88',
            }}
            onPress={() => navigation.navigate('EditPassword')}>
            <FontAwesome5 name="pen" solid size={12} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerToko}>
          <View style={{flexDirection: 'column'}}>
            {/* <Text style={{fontSize: 18, color: 'black'}}>Store</Text> */}
            <Text style={{color: 'black', fontSize: 18}}>Lordfish</Text>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#043C88',
            }}>
            <FontAwesome5
              name="store-alt"
              solid
              size={12}
              color="#fff"
              onPress={() => navigation.navigate('CreateStore')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={async () => {
            try {
              const idUser = await Storage.load({key: 'userId', id: 'userId'});
              await logout(idUser);
            } catch (error) {
              alert(error.message);
            }
            await Storage.remove({key: 'user', id: 'user'});
            await Storage.remove({key: 'userId', id: 'userId'});
            navigation.navigate('Login');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#043C88',
            marginVertical: 20,
            height: 40,
            width: wp('50%'),
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <FontAwesome5 name="sign-out-alt" solid size={22} color="#F0C341" />
          <Text style={{color: '#F0C341', marginLeft: 5, fontSize: 17}}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  SectionStyle: {
    width: wp('75%'),
    height: 250,
    backgroundColor: '#F0C341',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  containerToko: {
    flexDirection: 'row',
    width: wp('75%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
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
});
