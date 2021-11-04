import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Account = ({ navigation }) => {
    return (
        <ScrollView>
            <View style={{ paddingHorizontal: 50 }}>
                <View style={styles.SectionStyle}>
                    <Image
                        source={require('../../assets/images/fotoUser.jpg')}
                        style={styles.Image}
                    />
                    <TouchableOpacity
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
                        <FontAwesome5
                            name="pen"
                            solid
                            size={15}
                            color="#000"
                            onPress={() => navigation.navigate('Login')} />
                    </TouchableOpacity>
                </View>
                <Text style={{ height: 70, width: wp('57.5%'), fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'left', marginVertical: 20 }}>Your{'\n'}Personal Account</Text>
                <View style={styles.containerData}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Name</Text>
                        <Text style={{ color: 'black', fontSize: 18 }}>Lordfish</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 50,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#043C88'
                        }}
                        onPress={() => navigation.navigate('EditName')}>
                        <FontAwesome5
                            name="pen"
                            solid
                            size={12}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerData}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Email Address</Text>
                        <Text style={{ color: 'black', fontSize: 18 }}>dummy@mail.com</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 50,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#043C88'
                        }}
                        onPress={() => navigation.navigate('EditEmail')}>
                        <FontAwesome5
                            name="pen"
                            solid
                            size={12}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerData}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Password</Text>
                        <Text style={{ color: 'black', fontSize: 18 }}>********</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 50,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#043C88'
                        }}
                        onPress={() => navigation.navigate('EditPassword')}>
                        <FontAwesome5
                            name="pen"
                            solid
                            size={12}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerData}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Store</Text>
                        {/* <Text style={{ color: 'black', fontSize: 18 }}>Lordfish</Text> */}
                    </View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 50,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#043C88'
                        }}>
                        <FontAwesome5
                            name="store-alt"
                            solid
                            size={12}
                            color="#fff"
                            onPress={() => navigation.navigate('MyStore')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#043C88',
                        marginVertical: 20,
                        height: 40,
                        width: wp('50%'),
                        borderRadius: 10,
                        alignSelf: 'center'
                    }}>
                    <FontAwesome5
                        name="sign-out-alt"
                        solid
                        size={22}
                        color="#F0C341"
                        onPress={() => navigation.navigate('Login')} />
                    <Text style={{ color: '#F0C341', marginLeft: 5, fontSize: 17 }}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Account

const styles = StyleSheet.create({
    SectionStyle: {
        width: wp('75%'),
        height: 250,
        backgroundColor: '#F0C341',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center'
    },
    Image: {
        width: 200,
        height: 200,
        borderRadius: 70
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
})
