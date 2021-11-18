import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getToko, updateToko} from '../../webservice/seller.service';
import ImagePicker from 'react-native-image-crop-picker';
import {url} from '../../webservice/url';
import Storage from '../../storage';

const MyStore = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [toko, setToko] = useState('');
  const [location, setLocation] = useState('');
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    if (isFetch) {
      getToko().then(res => {
        setToko(res.body.data.namatoko);
        setLocation(res.body.data.address);
        setImage(`${url}/${res.body.data.profile_toko}`);
      });
      setIsFetch(false);
    }
  }, [isFetch]);

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
    form.append('namatoko', data.namatoko);
    form.append('nomor_rekening', data.nomor_rekening);
    form.append('istoko', data.istoko);
    form.append('bank', data.bank);
    form.append('image', {
      name: `${file.filename}.jpeg`,
      type: file.mime,
      uri: file.path,
    });
    doUpload(form);
  };

  const doUpload = async formdata => {
    try {
      let res = await updateToko(formdata);
      console.log(res.body.data.profile_toko);
      setImage(`${url}/${res.body.data.profile_toko}`);
      console.log(image);
      await Storage.remove({key: 'user', id: 'user'});
      await Storage.save({key: 'user', id: 'user', data: res.body.data});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 50}}>
        <View style={styles.SectionStyle}>
          <Image
            source={
              image != null
                ? {uri: image}
                : require('../../assets/images/fotoUser.jpg')
            }
            style={styles.Image}
          />
          <TouchableOpacity
            onPress={changeImage}
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
          Your Personal Store
        </Text>
        <View style={styles.containerData}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 18, color: 'black'}}>Name</Text>
            <Text style={{color: 'black', fontSize: 18}}>{toko}</Text>
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
            onPress={() => navigation.navigate('EditNameToko')}>
            <FontAwesome5 name="pen" solid size={12} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerData}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 18, color: 'black'}}>Location</Text>
            <Text style={{color: 'black', fontSize: 18}}>{location}</Text>
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
      </View>
    </ScrollView>
  );
};

export default MyStore;

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
});
