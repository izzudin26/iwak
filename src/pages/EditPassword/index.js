import React, {useState, createRef} from 'react';
import Storage from '../../storage';
import {updateProfile} from '../../webservice/user.service';
import {getMyProfile} from '../../webservice/buyer.service';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

const EditPassword = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordInputRef = createRef();
  const confirmInputRef = createRef();

  const doUpdate = async () => {
    const currentData = await (await getMyProfile()).body.data;
    currentData.password = password;
    currentData.confirm_password = confirmPassword;
    let updateData = {
      id_account: currentData.id_account,
      fullname: currentData.fullname,
      password: currentData.password,
      password_confirmation: currentData.confirm_password,
      phone: currentData.phone,
      address: currentData.address,
      norek: currentData.nomor_rekening,
      bank: currentData.bank,
    };
    try {
      if (password != confirmPassword) {
        throw new Error('Password tidak sama');
      }
      const res = await updateProfile(updateData, 'json');
      if (res.body.code != 200) {
        throw Error(res.body.message);
      }
      navigation.replace('MainApp');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
      <View>
        <Text
          style={{
            height: 70,
            width: 280,
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
          }}>
          Edit Your{'\n'}New Password Account.
        </Text>
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
          New Password
        </Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={UserPassword => setpassword(UserPassword)}
          underlineColorAndroid="#f000"
          placeholder="Password"
          placeholderTextColor="#000"
          ref={passwordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={() => doUpdate()}
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
          Confirm New Password
        </Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={UserConfirm => setConfirmPassword(UserConfirm)}
          underlineColorAndroid="#f000"
          placeholder="Verify Password"
          placeholderTextColor="#000"
          ref={confirmInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={Keyboard.dismiss}
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
        onPress={() => doUpdate()}>
        <Text style={{color: '#F0C341', fontWeight: 'bold'}}>DONE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPassword;

const styles = StyleSheet.create({
  SectionStyle: {
    width: 300,
    height: 250,
    backgroundColor: '#F0C341',
    borderRadius: 20,
    marginVertical: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    color: 'black',
    backgroundColor: '#fff',
    width: 250,
    height: 50,
    paddingLeft: 20,
    borderRadius: 30,
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
