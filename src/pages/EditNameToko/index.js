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
  const [isFetch, setIsFetch] = useState(false);
  useEffect(() => {
    if (name == null)
      Storage.load({
        key: 'user',
        id: 'user',
        autoSync: true,
      }).then(data => {
        setName(data.namatoko);
      });
  });

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
          Edit Your{'\n'}Name Account.
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
          Name
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
          onSubmitEditing={() => {}}
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
        onPress={() => {}}>
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
