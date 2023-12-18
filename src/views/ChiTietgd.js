import { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, SectionList } from "react-native";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Context } from "../../App";
import { LinearGradient } from "expo-linear-gradient";

export default function ChiTietgd({ navigation, route }) {
    const { acc, gd } = route.params;
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(gd.amount);
    const date = new Date(gd.date);

    return (
        <LinearGradient colors={['#bf1b72', '#ee70ab', '#f0afcd', '#f0f0f0',
            '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0']} style={styles.container}>
            <View

                style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={styles.btn_back}>
                    <Image source={require('../imgs/icon/left.png')} style={{ width: 20, height: 20 }}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Chi Tiết Giao Dịch</Text>
                <View style={{ width: '10%' }}></View>

            </View>
            <View style={styles.center1}>
                <View style={{ width: '100%', paddingHorizontal: 10, flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Image source={gd.type ? require('../imgs/icon/sender.png') : require('../imgs/icon/receiver.png')} style={{ width: 80, height: 80 }}></Image>
                    <View>
                        <Text style={{ color: 'gray', fontSize: 17 }}>{gd.type ? 'Chuyển tiền' : 'Nhận tiền'}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 5 }}>{gd.type ? '-' + formattedAmount : '+' + formattedAmount}</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Trạng thái</Text>
                    {gd.status ? (
                        <View style={{ paddingHorizontal: 15, paddingVertical: 2, borderRadius: 15, backgroundColor: '#daf7bd' }}>
                            <Text style={{ color: '#62c530', fontWeight: 'bold' }}>Thành công</Text>
                        </View>
                    ) : (
                        <View style={{ paddingHorizontal: 15, paddingVertical: 2, borderRadius: 15, backgroundColor: '#EA9D90' }}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Thất bại</Text>
                        </View>
                    )}
                </View>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Thời gian</Text>
                    <Text style={styles.txt_info_right}>{date.getHours() + ':' + date.getMinutes() + ' - ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() + 1900)}</Text>
                </View>
                <View style={{ width: '90%', borderWidth: 2, marginTop: 10, borderColor: '#f0f0f0', borderStyle: 'dashed' }}></View>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Mã giao dịch</Text>
                    <Text style={styles.txt_info_right}>{gd.transactionId}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Tài khoản/thẻ</Text>
                    <Text style={styles.txt_info_right}>Ví MoMo</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Tổng phí</Text>
                    <Text style={styles.txt_info_right}>Miễn phí</Text>
                </View>
            </View>
            <View style={styles.center2}>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Tên ví MoMo</Text>
                    <Text style={styles.txt_info_right}>{acc.fullName}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Tên danh bạ</Text>
                    <Text style={styles.txt_info_right}>{acc.name}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.txt_info}>Số điện thoại</Text>
                    <Text style={styles.txt_info_right}>{acc.phoneNumber}</Text>
                </View>
            </View>
            {gd.message != '' ? (
                <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>LỜI NHẮN</Text>
                    <View style={{marginTop: 10, width: '100%', height: 'auto', paddingHorizontal: 10, 
                    paddingVertical: 15,backgroundColor: '#fff', borderRadius: 10}}>
                            <Text style={{fontSize: 16}}>{gd.message}</Text>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.btn, {borderRadius: 5, borderColor: '#d82d8b', borderWidth: 2}]}
                onPress={() => {const item = acc ; navigation.navigate('ChuyenTien2', {item})}}
                >
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#d82d8b'}}>Chuyển lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{backgroundColor: '#d82d8b', borderRadius: 5}, styles.btn]}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>Trò chuyện</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 40,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        //backgroundColor: '#cd2d82',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        alignItems: 'center',
        marginTop: 5
    },
    btn_back: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 35,
        height: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center1: {
        width: '95%',
        paddingHorizontal: 10,
        height: 'auto',
        paddingBottom: 15,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    center2: {
        width: '95%',
        paddingHorizontal: 10,
        height: 'auto',
        paddingBottom: 15,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10
    },
    info: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },

    txt_info: {
        fontSize: 16,
        color: 'gray'
    },
    txt_info_right: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    footer: {
        width: '100%',
        height: 100,
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn: {
        width: 180,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }

})