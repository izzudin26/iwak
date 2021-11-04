import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AboutUs = () => {
    return (
        <ScrollView>
            <View>
                <View style={{ width: wp('100%'), height: 170, backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
                    <Image
                        source={require('../../assets/images/Oranda2.png')}
                        style={{ opacity: 0.8, marginLeft: -50, position: 'relative' }}
                    />
                    <Image
                        source={require('../../assets/images/MainImage.png')}
                        style={{ opacity: 0.8, width: wp('30%'), height: 140, position: 'relative' }}
                    />
                    <Text style={{ position: 'absolute', right: 100, fontSize: 30, fontWeight: '600', color: 'black' }}>A B O U T  U S</Text>
                </View>
                <View style={{ flexDirection: 'column', width: wp('87.5%'), height: 200, justifyContent: 'space-between', alignSelf: 'center', marginVertical: 20 }}>
                    <Text style={{ fontSize: 40, color: 'black' }}>iWAK</Text>
                    <Text style={{ fontSize: 20, color: 'black' }}>iWAK is a web-based and mobile application buying, selling and auction service. With this iWAK services, it is hoped that users can realize and get what they want about fish</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'column', width: wp('87.5%'), height: 50, justifyContent: 'space-between', alignSelf: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Address</Text>
                        <Text style={{ fontSize: 15, color: 'black' }}>Jl. gang buntu 1222</Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: wp('87.5%'), height: 50, justifyContent: 'space-between', alignSelf: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Phone</Text>
                        <Text style={{ fontSize: 15, color: 'black' }}>081234567890</Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: wp('87.5%'), height: 50, justifyContent: 'space-between', alignSelf: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Email</Text>
                        <Text style={{ fontSize: 15, color: 'black' }}>Dummy@mail.com</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AboutUs

const styles = StyleSheet.create({})
