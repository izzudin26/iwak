import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  getBids,
  getPemenangLelang,
  sendPemenang,
} from '../../webservice/seller.service';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const ListBidAuction = ({navigation, route}) => {
  const [winInformation, setWinInformation] = useState(null);

  const [bids, setBids] = useState([]);
  const [doFetch, setFetch] = useState(true);

  useEffect(() => {
    if (doFetch) {
      getBidsView();
      getDataWin();
      setFetch(false);
    }
  });

  const getDataWin = async () => {
    const {id_lelang} = route.params;
    try {
      let data = await getPemenangLelang(id_lelang);
      console.log(data.body.data);
      setWinInformation(data.body.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const getBidsView = async () => {
    const {id_lelang} = route.params;
    try {
      let data = await getBids({id_lelang});
      setBids(data.body.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const confirmPemenang = async index => {
    const {id_lelang} = route.params;
    const idBid = bids[index].id_lelangbid;
    try {
      await sendPemenang({id_bid: idBid, id_lelang});
      getDataWin();
    } catch (error) {
      alert(error.message);
    }
  };

  const sendMessage = () => {
    navigation.navigate('ChatPerson', {
      idOpponent: winInformation.id_account,
    });
  };

  const ViewBids = () => {
    return bids.map((bid, i) => (
      <View style={css.biddingRow} key={i}>
        <View style={css.biddingCol}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            {bid.fullname}
          </Text>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Rp. {bid.price}
          </Text>
        </View>
        {winInformation != null ? null : (
          <TouchableOpacity
            onPress={() => confirmPemenang(i)}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="check"
              size={w * 0.05}
              color="#043C88"></FontAwesome5>
            <Text style={{color: '#043C88', marginHorizontal: 3}}>
              Terima Pemenang
            </Text>
          </TouchableOpacity>
        )}
      </View>
    ));
  };

  const InformationWinner = () => {
    return (
      <View style={css.sectionMenu}>
        <Text style={css.labelInformation}>Nama Pemenang</Text>
        <View style={css.form}>
          <TextInput
            editable={false}
            value={winInformation.fullname}
            placeholderTextColor="#707070"
            style={{color: 'black', width: w * 0.75}}></TextInput>
        </View>
        <Text style={css.labelInformation}>Email Pemenang</Text>
        <View style={css.form}>
          <TextInput
            editable={false}
            value={winInformation.email}
            placeholderTextColor="#707070"
            style={{color: 'black', width: w * 0.75}}></TextInput>
        </View>
        <Text style={css.labelInformation}>Nomor Telepon</Text>
        <View style={css.form}>
          <TextInput
            editable={false}
            value={winInformation.phone}
            placeholderTextColor="#707070"
            style={{color: 'black', width: w * 0.75}}></TextInput>
        </View>
        <Text style={css.labelInformation}>Alamat</Text>
        <View style={css.form}>
          <TextInput
            editable={false}
            value={winInformation.address}
            placeholderTextColor="#707070"
            style={{color: 'black', width: w * 0.75}}></TextInput>
        </View>
        <TouchableOpacity style={css.buttonChat} onPress={sendMessage}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Chat</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={css.container}>
        {winInformation != null ? <InformationWinner /> : null}
        <View style={css.biddingSection}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 20,
            }}>
            Total {bids.length} Bids
          </Text>
          {bids.length != 0 ? <ViewBids /> : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default ListBidAuction;

export const css = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionMenu: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  form: {
    flexDirection: 'row',
    marginTop: 8,
    alignSelf: 'center',
    width: w * 0.8,
    borderRadius: 10,
    height: h * 0.06,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
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
  labelInformation: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    marginTop: 20,
  },
  biddingSection: {
    margin: 18,
  },
  biddingRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  biddingCol: {
    flexDirection: 'column',
  },
  buttonChat: {
    width: w * 0.8,
    backgroundColor: '#043C88',
    marginTop: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
