
import React from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Text, StatusBar } from 'react-native'

import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const TabView = ({ navigation, notifyEmpty }) => {
    return (
        <>

            <View style={styles.tabView}>
                <TouchableOpacity onPress={() => { navigation.navigate('MapScreen2') }}>
                    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="home-outline" size={30} color="#18567F" style={{}} />
                    </IconComponentProvider>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate('List') }}>
                    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="clipboard-text-outline" size={25} color="#18567F" style={{}} />
                    </IconComponentProvider>
                </TouchableOpacity>

                <TouchableOpacity style={styles.newCar} onPress={() => { navigation.navigate('Add_vehicle') }}>
                    <Text style={{ fontSize: 25, fontWeight: '300', color: 'white', alignSelf: 'center' }}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate('Notifications') }}>
                    {!notifyEmpty ? <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="bell-badge-outline" size={25} color="#18567F" style={{}} />
                    </IconComponentProvider> :
                        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                            <Icon family="MaterialCommunityIcons" name="bell-outline" size={25} color="#18567F" style={{}} />
                        </IconComponentProvider>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="account-circle" size={25} color="#18567F" style={{}} />
                    </IconComponentProvider>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default TabView;
const styles = StyleSheet.create({
    newCar: {
        width: 40,
        height: 40,
        alignItems: 'center',
        backgroundColor: '#18567F',
        justifyContent: 'center',
        borderRadius: 15,
        alignSelf: 'center',
        elevation: 10,
        zIndex: 100,
        marginBottom: hp('9%'),
    },
    tabView: {
        width: '100%',
        height: hp('7%'),
        alignSelf: 'center',
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        paddingHorizontal: 0,
        position: 'absolute',
        top: hp('90%'),
        zIndex: 99
    },
})