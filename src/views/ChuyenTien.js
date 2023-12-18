import { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Context } from "../../App";
import { LinearGradient } from 'expo-linear-gradient';

const DATA = [
    {
        title: 'Dịch vụ chuyển tiền',
        data: [
            { key: 1, src: require('../imgs/icon/den-vi-momo.png'), text: 'Đến ví MoMo' },
            { key: 2, src: require('../imgs/icon/chuyen-tien-2.png'), text: 'Đến Ngân hàng' },
            { key: 3, src: require('../imgs/icon/li-xi.png'), text: 'Lì xì' },
            { key: 4, src: require('../imgs/icon/diem-nap-rut.png'), text: 'Điểm nạp rút' },
        ]
    },
    {
        title: 'Dịch vụ nhận - thu tiền',
        data: [
            { key: 5, src: require('../imgs/icon/chia-tien.png'), text: 'Chia tiền' },
            { key: 6, src: require('../imgs/icon/nhac-tra-tien.png'), text: 'Nhắc trả tiền' },
            { key: 7, src: require('../imgs/icon/quy-nhom.png'), text: 'Quỹ nhóm' },
            { key: 8, src: require('../imgs/icon/link-nhan-tien.png'), text: 'Link nhận tiền' },
        ]
    }
]

export default function ChuyenTien({navigation}) {
    const { user, setUser } = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://654b36785b38a59f28eeae64.mockapi.io/User')
            .then(resp => {
                if (resp.ok)
                    return resp.json();
            })
            .then(json => {
                setUsers(json);
            })
    }, [])
    return (
        <LinearGradient colors={['#bf1b72', '#ee70ab', '#f0afcd', '#f0f0f0',
            '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0']} style={styles.container}>

            <View

                style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../imgs/icon/back.png")} style={{ width: 20, height: 20, borderRadius: 50 }}></Image></TouchableOpacity>
                
                <View style={styles.search_view}>
                    <Image source={require('../imgs/icon/kinh-lup.png')} style={{ width: 25, height: 25 }}></Image>
                    <TextInput placeholder="Tìm số điện thoại" style={{ width: '80%', padding: 5 }} placeholderTextColor={'gray'}></TextInput>
                </View>
                <Image source={require("../imgs/icon/mic.png")} style={{ width: 30, height: 30, borderRadius: 5 }}></Image>
                <Image source={{ uri: user.avatar }} style={{ width: 35, height: 35, borderRadius: 15, marginLeft: 10 }}></Image>
            </View>
            <View style={{ marginTop: 15, width: '95%' }}>
                <View style={styles.view_box}>
                    <View style={styles.view_box_child}>
                        <Text style={{ fontWeight: 'bold' }}>Đề xuất</Text>
                    </View>
                    <FlatList
                        style={{ width: '100%', marginTop: 10 }}
                        contentContainerStyle={{
                            alignItems: 'flex-start',
                        }}
                        data={users}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={{ marginLeft: 20, alignItems: 'center' }} onPress={() => {
                                    navigation.navigate('ChuyenTien2', {item});
                                }}>
                                    <Image source={{ uri: item.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }}></Image>
                                    <Text>{item.name}</Text> 
                                </TouchableOpacity>
                            );
                        }}
                        numColumns={4}
                    />
                </View>
                <View style={styles.view_box}>
                    <FlatList
                        style={{width: '100%'}}
                        data={DATA}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text style={{marginBottom: 5, fontWeight: 'bold', marginLeft: 15}}>{item.title}</Text>
                                    <FlatList
                                        data={item.data}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity style={{alignItems: 'center', width: 80, justifyContent: 'center', marginLeft: 10}}>
                                                    <Image source={item.src} style={{ width: 35, height: 35, borderRadius: 20 }}></Image>
                                                    <Text style={{height: 40, textAlign: 'center', fontWeight: 'bold', fontSize: 12}}>{item.text}</Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                        numColumns={4}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.view_box_2}>
                    <Image source={require('../imgs/icon/thong-ke.png')} style={{width: 30, height: 30}}></Image>
                    <View style={{marginLeft: 15}}>
                        <Text style={{fontWeight: 'bold'}}>Thống kê chuyển nhận tiền</Text>
                        <Text style={{fontSize: 11, color: 'gray'}}>Xem tổng số tiền bạn đã chuyển nhận trong tháng</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', height: 300, marginTop: 25}}>
                    <Image source={require('../imgs/image/chuyen-tien.png')} style={{width: '100%', height: 100, borderRadius: 15}}></Image>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 40
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        //backgroundColor: '#cd2d82',
        width: '100%',
        height: 50,
        alignItems: 'center',
        marginTop: 5
    },
    search_view: {
        flexDirection: 'row',
        width: '68%',
        height: '60%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    view_box: {
        width: '100%',
        backgroundColor: '#ffffff',
        height: 200,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    view_box_child: {
        width: '90%',
        borderBottomWidth: 2,
        borderColor: '#e8e8e8',
        height: 40,
        justifyContent: 'center',
    },
    view_box_2: {
        width: '100%',
        backgroundColor: '#ffffff',
        height: 60,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
        //justifyContent: 'center',
    }
})