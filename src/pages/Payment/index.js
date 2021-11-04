import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Payment = () => {
    const [userPayment, setUserPayment] = useState('');
    const placeholder = {
        label: 'Method Payment',
        value: null,
        color: '#007bff',
    };

    return (
        <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
            <View>
                <Text style={{ height: 70, width: wp('57.5%'), fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'left' }}>Choice the method payment.</Text>
            </View>
            <View style={styles.SectionStyle}>
                <RNPickerSelect
                    style={{
                        ...pickerSelectStyles,
                        placeholder: {
                            color: 'black',
                            fontSize: 14,
                            fontWeight: 'normal',
                            paddingLeft: 15
                        },
                        iconContainer: {
                            top: 20,
                            right: 25,
                        },
                    }}
                    Icon={() => {
                        return <Chevron size={1.5} color="gray" />;
                    }}
                    useNativeAndroidPickerStyle={false}
                    placeholder={placeholder}
                    onValueChange={(userPayment) => setUserPayment(userPayment)}
                    returnKeyType="next"
                    items={[
                        { label: 'Transfer', value: 'Transfer' },
                        { label: 'Cash On Delivery', value: 'Cash On Delivery' },
                    ]}
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
                onPress={() => {}}>
                <Text style={{ color: '#F0C341', fontWeight: 'bold' }}> Next </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    SectionStyle: {
        width: wp('75%'),
        height: 200,
        backgroundColor: '#F0C341',
        borderRadius: 20,
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        backgroundColor: '#fff',
        width: wp('62.5%'),
        height: 50,
        paddingLeft: 20,
        paddingRight: 30,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
});
