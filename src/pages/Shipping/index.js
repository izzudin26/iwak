import React, { useState, createRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Shipping = ({ navigation }) => {
    const [userState, setUserState] = useState('');
    const [userStreet, setUserStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const streetRef = createRef();
    const postalCodeRef = createRef();

    return (
        <ScrollView>
            <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1, marginVertical: 20 }}>
                <View>
                    <Text style={{ height: 75, width: wp('75%'), fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'left' }}>Input your{"\n"}Address in down below. </Text>
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(userState) =>
                            setUserState(userState)
                        }
                        placeholder="State"
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        keyboardType='default'
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            streetRef.current &&
                            streetRef.current.focus()
                        }
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(userStreet) =>
                            setUserStreet(userStreet)
                        }
                        placeholder="Street"
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        keyboardType='default'
                        returnKeyType="next"
                        ref={streetRef}
                        onSubmitEditing={() =>
                            postalCodeRef.current &&
                            postalCodeRef.current.focus()
                        }
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(postalCode) =>
                            setPostalCode(postalCode)
                        }
                        placeholder="Postal Code"
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        keyboardType='number-pad'
                        returnKeyType="next"
                        ref={postalCodeRef}
                        onSubmitEditing={Keyboard.dismiss}
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        width: wp('37.5%'),
                        height: 40,
                        backgroundColor: '#043C88',
                        marginVertical: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}
                    onPress={() => navigation.navigate('Payment')}>
                    <Text style={{ color: '#F0C341', fontWeight: 'bold' }}> Next </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Shipping

const styles = StyleSheet.create({
    SectionStyle: {
        width: wp('75%'),
        height: 350,
        backgroundColor: '#F0C341',
        borderRadius: 20,
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    inputStyle: {
        backgroundColor: '#fff',
        width: wp('62.5%'),
        height: 50,
        paddingLeft: 20,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})
