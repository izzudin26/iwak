import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, } from 'react-native';
// import NetworkConnectionHelper from '../../utils/network-connection-helper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = ({ navigation }) => {

    // useEffect(async () => {
    //     if (await NetworkConnectionHelper.checkConnection({ exit: true })) {
    //         setTimeout(() => {
    //             navigation.replace('Login');
    //         }, 3000)
    //     }
    // }, [navigation]);

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 3000)
    }, [navigation]);

    return (
        <View style={styles.background}>
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/Logo.png')}
                    style={styles.logo}
                />
                <View
                    style={{
                        flexDirection: 'column',
                        width: 250,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                    <Text style={styles.teksSatu}>The Best Platform For Your Need About Your Fish</Text>
                </View>
            </View>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#043C88'
    },
    logo: {
        alignSelf: 'center',
    },
    teksSatu: {
        fontSize: 16,
        textAlign: 'center',
        color: '#F0C341'
    },
})
