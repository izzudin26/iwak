import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const IncomingOrder = () => {
  return <Text style={{color: 'black'}}>Incoming Order</Text>;
};

export default IncomingOrder;
