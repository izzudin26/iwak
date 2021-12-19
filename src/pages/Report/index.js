import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Report = ({navigation, route}) => {
  const {data} = route.params;

  const [fields, setField] = useState([
    {
      label: 'Turnonver',
      value: `Rp. ${data.omset}`,
    },
    {
      label: 'The Order amount has not been paid',
      value: data.pesananbelomterbayar,
    },
    {
      label: 'Order amount already paid',
      value: data.pesanansudahterbayar,
    },
    {
      label: 'Number of orders not sent',
      value: data.pesananbelomterkirim,
    },
    {
      label: 'Number of Feedback',
      value: data.feedback,
    },
  ]);

  return (
    <ScrollView>
      <View>
        {fields.map((field, i) => (
          <View style={styles.rowSection}>
            <View style={styles.omsetSection}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'left',
                }}>
                {field.label}
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'left',
                  marginVertical: 5,
                }}>
                {field.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({
  rowSection: {
    flexDirection: 'row',
    width: wp('100%'),
    marginVertical: 20,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
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
    height: hp('12%'),
    width: wp('80%'),
    backgroundColor: '#043C88',
    marginLeft: 25,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignSelf: 'flex-end',
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
