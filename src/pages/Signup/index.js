import React, {useState, createRef, useEffect} from 'react';
import Storage from '../../storage';
import {registration} from '../../webservice/user.service';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Signup = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userConfirm, setUserConfirm] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmInputRef = createRef();

  useEffect(() => {
    Storage.load({key: 'userId', id: 'userId'}).then(data => {
      if (data) {
        navigation.replace('MainApp');
      }
    });
  });

  const handleSubmitButton = async () => {
    try {
      setErrortext('');
      if (!userName) {
        throw 'Mohon isi Nama';
      }
      if (!userEmail) {
        throw 'Mohon isi Email';
      }
      if (!userPassword) {
        throw 'Mohon isi Password';
      }
      if (!userConfirm) {
        throw 'Mohon Konfirmasi Pssword';
      }
      if (userPassword != userConfirm) {
        throw 'Konfirmasi Password tidak sama';
      }
      let res = await registration({
        email: userEmail,
        fullname: userName,
        password: userPassword,
      });
      if (res.body.code != 200) {
        throw res.body.message;
      }
      await Storage.save({
        key: 'userId',
        id: 'user',
        data: res.body.data.id_account,
      });
      await Storage.save({
        key: 'user',
        id: 'user',
        data: res.body.data,
      });
      navigation.replace('MainApp');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <KeyboardAvoidingView>
      <View>
        <ScrollView>
          <View
            style={{
              alignItems: 'flex-start',
              marginTop: 50,
              marginLeft: 10,
              marginBottom: 20,
            }}>
            <Text style={styles.teksSatu}>Create</Text>
            <Text style={styles.teksSatu}>Account</Text>
            <Text style={styles.teksDua}>Create your very own account</Text>
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Name"
              placeholderTextColor="#000"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Email address"
              placeholderTextColor="#000"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#000"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                confirmInputRef.current && confirmInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserConfirm => setUserConfirm(UserConfirm)}
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

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}

          <Button
            title={'Register'}
            titleStyle={{
              color: '#F0C341',
              fontSize: 18,
            }}
            buttonStyle={{
              backgroundColor: '#043C88',
              width: wp('30%'),
              height: 45,
              borderRadius: 50,
              marginTop: 50,
              marginLeft: 10,
            }}
            onPress={handleSubmitButton}
          />

          <View style={{marginLeft: 15, marginTop: 10, marginBottom: 30}}>
            <Text style={{color: '#000'}}>
              are you have an account ?
              <Text style={styles.masuk} onPress={handleSubmitButton}>
                {' '}
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Signup;

const styles = StyleSheet.create({
  teksSatu: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  teksDua: {
    fontSize: 15,
    color: 'gray',
  },
  SectionStyle: {
    alignItems: 'center',
    marginTop: 20,
  },
  inputStyle: {
    backgroundColor: '#F0F0F0',
    width: wp('92.5%'),
    height: 50,
    paddingLeft: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: 'black',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  masuk: {
    color: '#043C88',
    fontWeight: '200',
    fontSize: 14,
  },
});
