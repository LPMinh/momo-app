import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, FlatList, SectionList, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect } from 'react';

export default function MyGift({ navigation, route }) {
    const id = route.params?.id;
    const [data, setData] = React.useState([]);
    const [MyDiscount, setMyDiscount] = React.useState([]);
    useEffect(() => {
        fetch("https://6554f19563cafc694fe73d69.mockapi.io/MyDiscount/" + id + "")
            .then(response =>
                response.json())
            .then(data => {
                setData(data);
                console.log(data, 'data');

            });
    }, []);

    return (
        <View style={styles.container}>

            <ImageBackground source={require('../imgs/image/background_me.png')} style={{ width: '100%', height:100, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '100%', height: '50%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} onPress={() => navigation.navigate("discount")}>
                        <Image source={require('../imgs/icon/left.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', width: '50%', alignSelf: 'center', textAlign: 'center' }}>Quà của tôi</Text>
                    <TouchableOpacity style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} onPress={() => navigation.navigate("discount")}>
                        <Image source={require('../imgs/icon/forder.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}></Image>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
           
                <FlatList
                    style={{ width: '100%', height: '90%', marginTop: 10 }}
                    data={data.discounts}
                    keyExtractor={(dataItem) => dataItem.id}
                    horizontal={false}
                    renderItem={({ item: dataItem }) => (
                        <TouchableOpacity
                        onPress={() => navigation.push('Detail', { 'id': dataItem.id })}
                            style={{
                                width: '90%',
                                height: 100,
                                flexDirection: 'row',
                                alignSelf: 'center',
                                borderWidth: 1, 
                                borderColor: '#E0E0E0', 
                                borderRadius: 10, 
                                overflow: 'hidden',
                                elevation: 5, 
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.3, 
                                shadowRadius: 5, 
                                 padding: 10,
                                 marginVertical: 10,
                                 backgroundColor:'white'
                            }}
                        >
                            <View style={{
                                width: '30%',
                                height: '100%',
                                flexDirection: 'column',
                                borderRadius: 10,
                                overflow: 'hidden',
                                elevation: 5,
                                backgroundColor:'white'
                            }}>
                                <Image source={{ uri: dataItem.icon }} style={{ height: '50%', width: '100%', resizeMode: 'contain' }} />
                                <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>{dataItem.name}</Text>
                            </View>
                            <View style={{
                                width: '70%',
                                height: '100%',
                                flexDirection: 'column',
                                borderRadius: 10,
                                overflow: 'hidden',
                                elevation: 5, 
                                backgroundColor:'white'
                            }}>
                                <Text style={{ width: '100%', fontWeight: 'bold' }}>{dataItem.name}</Text>
                                <Text style={{ width: '100%' }}>{dataItem.des}</Text>
                                <TouchableOpacity style={{ borderColor: '#EE4EAC', padding: 5, borderWidth: 1, alignSelf: 'flex-end', marginRight: 10,borderRadius:5 }}>
                                    <Text style={{ color: '#eb2d9d', fontWeight: 'bold'}}>Dùng ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                    )}
                />
        </View>
    )



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F1F1F3',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',



    }

});

