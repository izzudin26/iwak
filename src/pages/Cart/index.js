import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { CartList, JumlahHarga, TotalView, JumlahHargaProvider } from '../../components/CartList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Cart = ({ navigation, route }) => {
    const [listTotal, setListTotal] = useState({});
    // const satuan = JSON.stringify(route.params.qty);
    const [endTotal, setEndTotal] = useState();

    return (
        <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, borderBottomWidth: 1 }}>
                    <CartList harga={600000} satuan={1} listTotal={listTotal} setListTotal={setListTotal} setEndTotal={setEndTotal}/>
                    <CartList harga={50000} satuan={1} listTotal={listTotal} setListTotal={setListTotal} setEndTotal={setEndTotal}/>
                    {/* <CartList idProduk={3} harga={600000} satuan={satuan} listTotal={listTotal} setListTotal={setListTotal} setEndTotal={setEndTotal} />
                    <CartList idProduk={4} harga={50000} satuan={satuan} listTotal={listTotal} setListTotal={setListTotal} setEndTotal={setEndTotal} /> */}
                </View>
                {/* <TotalView JumlahTotal={setEndTotal}></TotalView> */}
                <TotalView JumlahTotal={600000}></TotalView>
                <TouchableOpacity
                    style={{
                        width: wp('37.5%'),
                        height: 40,
                        backgroundColor: '#043C88',
                        marginVertical: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('Shipping')}>
                    <Text style={{ color: '#F0C341', fontWeight: 'bold' }}> Check Out </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Cart

const styles = StyleSheet.create({})



