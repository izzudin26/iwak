import React, {useState, useEffect} from 'react';
import Storage from '../../storage';
import {updateToko} from '../../webservice/seller.service';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const EditName = ({navigation}) => {
  const [name, setName] = useState(null);
  const [isFetch, setIsFetch] = useState(true);
  useEffect(() => {
    if (name == null)
      Storage.load({
        key: 'user',
        id: 'user',
        autoSync: true,
      }).then(data => {
        setName(data.namatoko);
        setIsFetch(false);
      });
  }, [isFetch]);

  const handleUpload = async () => {
    let form = new FormData();
    let data = await Storage.load({key: 'user', id: 'user'});
    form.append('id_account', data.id_account);
    form.append('namatoko', name);
    form.append('nomor_rekening', data.nomor_rekening);
    form.append('istoko', data.istoko);
    form.append('bank', data.bank);
    const res = await updateToko(form);
    await Storage.remove({key: 'user', id: 'user'});
    await Storage.save({key: 'user', id: 'user', data: res.body.data});
    navigation.replace('MainApp');
  };

  return (
    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
      <View>
        <Text
          style={{
            height: 70,
            width: 230,
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
          }}>
          Edit Your{'\n'}Store Name.
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
          Nama Toko
        </Text>
        <TextInput
          style={styles.inputStyle}
          value={name}
          onChangeText={userState => setName(userState)}
          // placeholder="State"
          placeholderTextColor="#000"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
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
        onPress={handleUpload}>
        <Text style={{color: '#F0C341', fontWeight: 'bold'}}>DONE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditName;

const styles = StyleSheet.create({
  SectionStyle: {
    width: 300,
    height: 200,
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
    color: 'black',
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
