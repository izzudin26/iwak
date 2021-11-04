import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DetailProduct = ({ navigation }) => {
    const [click, setClick] = useState(1);

    const PressedPlus = () => {
        setClick(click + 1);
    };

    const PressedMinus = () => {
        setClick(click - 1);
    };

    const star = (n) => {
        let stars = []

        for (let i = 0; i < n; i++) {

            stars.push(<FontAwesome5
                onPress={() => { }}
                name='star'
                size={15}
                color='#f1c40f'
                solid={true}
                key={i}
            />)
        }
        return stars
    }

    return (
        <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.ContainerMainImage}>
                    <Image
                        source={require('../../assets/images/MainImage.png')}
                        style={styles.MainImage}
                    />
                </View>

                <View style={{ flexDirection: 'row', width: wp('75%'), alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={styles.ContainerButton}>
                        <FontAwesome5
                            name="arrow-left"
                            solid
                            size={25}
                            color="#F0C341"
                            onPress={() => navigation.navigate('Product')} />
                    </View>
                    <View style={styles.ContainerSmallImage}>
                        <Image
                            source={require('../../assets/images/MainImage.png')}
                            style={styles.ImageSmall}
                        />
                    </View>
                    <View style={styles.ContainerSmallImage}>
                        <Image
                            source={require('../../assets/images/MainImage.png')}
                            style={styles.ImageSmall}
                        />
                    </View>
                    <View style={styles.ContainerSmallImage}>
                        <Image
                            source={require('../../assets/images/MainImage.png')}
                            style={styles.ImageSmall}
                        />
                    </View>
                    <View style={styles.ContainerButton}>
                        <FontAwesome5
                            name="arrow-right"
                            solid
                            size={25}
                            color="#F0C341"
                            onPress={() => navigation.navigate('Product')} />
                    </View>
                </View>

                <View style={{ width: wp('75%'), marginVertical: 20 }}>
                    <Text style={{ color: 'black' }}>Ini adalah keterangan tentang jenis ikan yang akan dijual pada toko ini. Ikan ini merupakan ikan hias oranda berukuran jumbo dengan kualitas premium</Text>
                </View>

                <View style={styles.ContainerBottom}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ height: 35, width: 200, fontSize: 25, fontWeight: 'bold', color: 'black' }}>Nama Product</Text>
                            <Text style={{ height: 20, width: 200, fontSize: 15, color: 'black', marginBottom: 2 }}>Ini adalah keterangan product</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                {star(5)}
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/images/fotoUser.jpg')}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 50,
                                }}
                            />
                            <Text style={{ fontSize: 20, color: 'black', width: 120, textAlign: 'center', }}>Nama Toko</Text>
                            <Text style={{ fontSize: 15, color: 'black', width: 120, textAlign: 'center', }}>Lokasi Toko</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Rp. 600.000</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View style={styles.ContainerButtonCart}>
                                <FontAwesome5
                                    name="minus"
                                    solid
                                    size={15}
                                    color="#000"
                                    onPress={() => PressedMinus()} />
                                <Text style={{ fontSize: 20, color: 'black', fontWeight: '900' }}>{click}</Text>
                                <FontAwesome5
                                    name="plus"
                                    solid
                                    size={15}
                                    color="#000"
                                    onPress={() => PressedPlus()} />
                            </View>

                            <TouchableOpacity
                                style={{
                                    width: 60,
                                    height: 40,
                                    backgroundColor: 'blue',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => navigation.navigate(
                                    'Cart',
                                    // { qty: click }
                                )}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}> CART </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    ContainerMainImage: {
        width: 280,
        height: 280,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ContainerSmallImage: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ContainerButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 10,
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ContainerBottom: {
        width: '102%',
        height: 210,
        overflow: 'hidden',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingVertical: 30,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 30,
        elevation: 20
    },
    ContainerButtonCart: {
        flexDirection: 'row',
        height: 30,
        width: 90,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 50,
        borderWidth: 1
    },
    MainImage: {
        height: 250,
        width: 250,
    },
    ImageSmall: {
        width: 30,
        height: 30
    }
})
