import React from 'react';
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

const MyStore = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 50}}>
        <View style={styles.SectionStyle}>
          <Image
            source={require('../../assets/images/fotoUser.jpg')}
            style={styles.Image}
          />
          <TouchableOpacity
            onPress={() => {}}
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
            <Text style={{fontSize: 18}}>Name</Text>
            <Text style={{color: 'black', fontSize: 18}}>Store Name</Text>
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
            <Text style={{fontSize: 18}}>Location</Text>
            <Text style={{color: 'black', fontSize: 18}}>
              Email Location Store
            </Text>
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
