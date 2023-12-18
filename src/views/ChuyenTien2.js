import { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Context } from "../../App";
import { LinearGradient } from 'expo-linear-gradient';

const messages = [
    {key: 1, value: 'Trả nợ nha'},
    {key: 2, value: 'Chuyển tiền cà phê'},
    {key: 3, value: 'Chuyển tiền ăn trưa'},
    {key: 4, value: 'Tiền tiêu vặt'}
]


export default function ChuyenTien2({ navigation, route }) {
    const { item } = route.params;
    const { user, setUser } = useContext(Context);
    const [money, setMoney] = useState('');
    const [isMoney, setIsMoney] = useState(false);
    const [message, setMessage] = useState('');
   
    
    const chuyenTien = () => {
        if(isMoney) {
            navigation.navigate('ChuyenTien3', {item, money, message});
        }
    }
    useEffect(() => {
        if(money == '') {
            setIsMoney(false);
        } else 
            setIsMoney(true);
    }, [money])
    return (
        <LinearGradient colors={['#bf1b72', '#ee70ab', '#f0afcd', '#fff',
            '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={styles.btn_back}>
                    <Image source={require('../imgs/icon/left.png')} style={{ width: 20, height: 20 }}></Image>
                </TouchableOpacity>
                <Image source={{ uri: item.avatar }} style={{ width: 35, height: 35, borderRadius: 15, marginLeft: 10 }}></Image>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>{item.phoneNumber}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: '75%', borderBottomWidth: 1, borderColor: 'gray', alignItems: 'center' }}>
                <View style={styles.box}>
                    <TextInput
                        keyboardType="numeric"
                        placeholder="0đ"
                        value={money.toString()}  
                        style={[styles.input]}
                        placeholderTextColor={'gray'}
                        onChangeText={(value) => {
                            setMoney(value);
                        }}
                    ></TextInput>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{
                            flexDirection: 'row', borderWidth: 2, borderColor: '#f0f0f0', alignItems: 'center', width: '80%',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10, borderRadius: 10
                        }}>
                            <TextInput placeholder="Nhập hoặc chọn bên dưới" placeholderTextColor={'gray'} value={message} style={{ height: 60, width: '80%', fontSize: 16 }} onChangeText={setMessage}></TextInput>
                            <Image source={require('../imgs/icon/mic2.png')} style={{ width: 25, height: 25 }}></Image>
                        </View>
                        <View style={{
                            width: 60, height: 60, borderWidth: 2, borderColor: '#f0f0f0',
                            alignItems: 'center', justifyContent: 'center', borderRadius: 10
                        }}>
                            <Image source={require('../imgs/icon/thiep.png')} style={{ width: 25, height: 25 }}></Image>
                            <Text style={{ fontSize: 10, color: '#bf1b72', fontWeight: 'bold' }}>Chọn thiệp</Text>
                        </View>
                    </View>
                    <FlatList style={{width: '100%'}}
                        data={messages}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity style={{padding: 10, backgroundColor: '#f0f0f0', margin: 5, borderRadius: 20}}
                                    onPress={() => {setMessage(item.value)}}
                                >
                                    <Text>{item.value}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={2}
                    ></FlatList>
                    
                </View>
                
            </View>
            <View style={{width: '100%', paddingVertical: 5, paddingHorizontal: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.btn_bottom} onPress={() => setMoney(150000)}>
                        <Text style={styles.txt_bottom}>150.000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_bottom} onPress={() => setMoney(500000)}>
                        <Text style={styles.txt_bottom}>500.000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_bottom} onPress={() => setMoney(1000000)}>
                        <Text style={styles.txt_bottom}>1.000.000</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{backgroundColor: isMoney ? '#bf1b72' : '#f0f0f0', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 10, height:  50}}
                    onPress={chuyenTien}
                >
                    <Text style={{color: isMoney ? 'white' : 'gray', fontWeight: 'bold', fontSize: 18}}>Chuyển tiền</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 5
    },
    btn_back: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: '90%',
        height: 250,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    input: {
        borderBottomWidth: 3,
        borderBottomColor: '#bf1b72',
        width: 'auto',
        textAlign: 'center',
        width: 'auto',
        height: 30,
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'gray'
    },
    container1: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    borderView: {
        height: 2,
        backgroundColor: '#bf1b72',
        marginBottom: 10,
    },
    btn_bottom: {
        width: 120,
        height: 30,
        borderWidth: 1,
        borderColor: '#bf1b72',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 5
    },
    txt_bottom: {
        fontWeight: 'bold',
        color: '#bf1b72'
    }
})