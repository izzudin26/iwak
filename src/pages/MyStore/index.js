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
import {getToko, getReport} from '../../webservice/seller.service';
import {url} from '../../webservice/url';

const MyStore = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [toko, setToko] = useState('');
  const [location, setLocation] = useState('');
  const [omset, setOmset] = useState(0);
  const [fetch, setIsFetch] = useState(true);

  useEffect(() => {
    getToko().then(res => {
      setToko(res.body.data.namatoko);
      setLocation(res.body.data.address);
      setImage(`${url}/${res.body.data.profile_toko}`);
    });
    getReport().then(res => {
      setOmset(res.body.omset);
    });
    setIsFetch(false);
  }, [fetch]);

  return (
    <ScrollView>
      <View>
        <View style={styles.rowSection}>
          <View style={styles.storeSection}>
            <Image
              source={
                image != null
                  ? {uri: image}
                  : require('../../assets/images/fotoUser.jpg')
              }
              style={styles.Image}
            />
            <View style={{flexDirection: 'column', paddingLeft: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'left',
                }}>
                {toko}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'left',
                }}>
                {location}
              </Text>
            </View>
          </View>
          <View style={styles.omsetSection}>
            <Text
              style={{
                fontSize: 13,
                color: 'white',
                textAlign: 'left',
              }}>
              Omset
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'left',
                marginVertical: 15,
              }}>
              Rp. {omset}
            </Text>
          </View>
        </View>
        <View style={styles.containerMenu}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'left',
            }}>
            Your Personal Store
          </Text>
          <View style={styles.containerData}>
            <TouchableOpacity
              style={styles.containerBody}
              onPress={() => navigation.navigate('IncomingOrder')}>
              <Text style={{fontSize: 18, color: 'black'}}>Incoming Order</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerData}>
            <TouchableOpacity
              style={styles.containerBody}
              onPress={() => navigation.navigate('ListProduct')}>
              <Text style={{fontSize: 18, color: 'black'}}>List Product</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerData}>
            <TouchableOpacity
              style={styles.containerBody}
              onPress={() => navigation.navigate('IncomingOrder')}>
              <Text style={{fontSize: 18, color: 'black'}}>
                Review & Rating
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerData}>
            <TouchableOpacity
              style={styles.containerBody}
              onPress={() => navigation.navigate('SettingStore')}>
              <Text style={{fontSize: 18, color: 'black'}}>Setting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyStore;

const styles = StyleSheet.create({
  rowSection: {
    paddingTop: 30,
    flexDirection: 'row',
    height: hp('18%'),
    width: wp('100%'),
  },
  storeSection: {
    backgroundColor: '#FAC93D',
    flexDirection: 'row',
    width: wp('65%'),
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    padding: 10,
  },
  omsetSection: {
    width: wp('30%'),
    backgroundColor: '#043C88',
    marginLeft: 25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
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
    width: 80,
    height: 80,
    borderRadius: 20,
    shadowOpacity: 10,
  },
  containerData: {
    marginVertical: 40,
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
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  containerMenu: {
    padding: 30,
  },
  containerBody: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: wp('75%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    height: hp('5%'),
  },
});
