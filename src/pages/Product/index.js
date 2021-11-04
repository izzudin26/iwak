import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Product = ({ navigation }) => {
    return (
        <ScrollView>
            <View style={{ alignSelf: 'center', justifyContent: 'center', marginVertical: 30 }}>
                <View style={{ width: wp('85%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.teksSale}>Found it{"\n"}your need item at sale</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Sale')}>
                        <View style={styles.Container}>
                            <Text style={styles.teksDua}>SALE</Text>
                            <Image source={require('../../assets/images/Sale.png')} style={styles.Gambar} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ width: wp('85%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Auction')}>
                        <View style={styles.Container}>
                            <Image source={require('../../assets/images/Auction.png')} style={styles.Gambar} />
                            <Text style={styles.teksDua}>AUCTION</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.teksAuction}>Pay according to the funds you have</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Product

const styles = StyleSheet.create({
    teksSale: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        width: wp('45%'),
    },
    teksAuction: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        width: wp('45%'),
    },
    teksDua: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        marginVertical: 15
    },
    Gambar: {
        borderRadius: 25,
        width: 127
    },
    Container: {
        flexDirection: 'column',
        borderRadius: 25,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
