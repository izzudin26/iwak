import React, { useState, createRef } from 'react'
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, Image, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Login = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Mohon isi Email');
            return;
        }
        if (!userPassword) {
            alert('Mohon isi password');
            return;
        }
        navigation.replace('MainApp');
    };

    return (
        <View style={styles.mainBody}>
            <ScrollView>
                <KeyboardAvoidingView>
                        <View style={{ alignItems: 'flex-start', marginTop: 50, marginLeft: 10, marginBottom: 20 }}>
                            <Text style={styles.teksSatu}>Hey,</Text>
                            <Text style={styles.teksSatu}>Login Now.</Text>
                            <Text style={styles.teksDua}>Welcome back! Sign in to Your Account</Text>
                        </View>

                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder="Email address" //dummy@abc.com
                                placeholderTextColor="#000"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                placeholder="Password" //12345
                                placeholderTextColor="#000"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <Button
                            title={'Login'}
                            titleStyle={{
                                color: '#F0C341',
                                fontSize: 18
                            }}
                            buttonStyle={{
                                backgroundColor: '#043C88',
                                width: wp('30%'),
                                height: 45,
                                borderRadius: 50,
                                marginTop: 50,
                                marginLeft: 10,
                            }}
                            onPress={handleSubmitPress}
                        />

                        <View style={{ marginLeft: 15, marginTop: 10 }}>
                            <Text style={{ color: '#000' }}>don't have an account ?
                                <Text
                                    style={styles.registerTextStyle}
                                    onPress={() => navigation.navigate('Signup')}> Register
                                </Text>
                            </Text>
                        </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default Login;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    teksSatu: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
    },
    teksDua: {
        fontSize: 15,
        color: 'gray',
    },
    SectionStyle: {
        alignItems: 'center',
        marginTop: 20
    },
    inputStyle: {
        backgroundColor: '#F0F0F0',
        width: wp('92.5%'),
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
    registerTextStyle: {
        color: '#043C88',
        fontWeight: '200',
        fontSize: 14,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});