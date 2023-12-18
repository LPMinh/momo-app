import { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, SectionList } from "react-native";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Context } from "../../App";
import { LinearGradient } from "expo-linear-gradient";

export default function ChuyenTien3({ navigation, route }) {
    const { item, money, message } = route.params;
    const { user, setUser } = useContext(Context);
    const [balance, setBalance] = useState(user.balance);
    const [modalVisible, setModalVisible] = useState(false);
    const [pass, setPass] = useState('');
    const [err, setErr] = useState('');
    var currentTimeLong = new Date().getTime().toString();
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(balance);
    const formattedMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(money);
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const pay = () => {
        if (pass == '') {
            setErr('Vui lòng nhập password');
            return;
        }
        if (pass != user.password) {
            setErr('Password không chính xác')
            return;
        }
        setErr('');
        const newBalance = Number(balance) - Number(money);
        if (newBalance < 0) {
            var currentDate = new Date();

            const data = {
                transactionId: currentTimeLong,
                type: true,
                amount: money,
                date: currentDate,
                sender: user.fullName,
                receiver: item.fullName,
                senderId: user.id,
                receiverId: item.id,
                newBalance: balance,
                message: message,
                status: false
            }
            fetch('https://654b36785b38a59f28eeae64.mockapi.io/User/' + user.id + '/Transaction', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            }).then(resp => {
                if (resp.ok)
                    navigation.navigate('Fail', { money, item, currentDate, currentTimeLong });
            })
        } else {
            fetch('https://654b36785b38a59f28eeae64.mockapi.io/User/' + user.id, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ balance: newBalance })
            }).then(res => {
                if (res.ok) {
                    var currentDate = new Date();

                    const data = {
                        transactionId: currentTimeLong,
                        type: true,
                        amount: money,
                        date: currentDate,
                        sender: user.fullName,
                        receiver: item.fullName,
                        senderId: user.id,
                        receiverId: item.id,
                        newBalance: newBalance,
                        message: message,
                        status: true
                    }
                    fetch('https://654b36785b38a59f28eeae64.mockapi.io/User/' + user.id + '/Transaction', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(data)
                    }).then(res => {
                        if (res.ok) {
                            const balance_receiver = Number(item.balance) + Number(money);
                            fetch('https://654b36785b38a59f28eeae64.mockapi.io/User/' + item.id, {
                                method: 'PUT',
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify({ balance: balance_receiver })
                            }).then(res => {
                                if (res.ok) {
                                    var currentDate = new Date();


                                    const data = {
                                        transactionId: currentTimeLong,
                                        type: false,
                                        amount: money,
                                        date: currentDate,
                                        sender: user.fullName,
                                        receiver: item.fullName,
                                        senderId: user.id,
                                        receiverId: item.id,
                                        newBalance: balance_receiver,
                                        message: message,
                                        status: true
                                    }
                                    fetch('https://654b36785b38a59f28eeae64.mockapi.io/User/' + item.id + '/Transaction', {
                                        method: 'POST',
                                        headers: { 'content-type': 'application/json' },
                                        body: JSON.stringify(data)
                                    }).then(res => {
                                        if (res.ok) {
                                            user.balance = newBalance;
                                            setUser(user);
                                            console.log(user.balance);
                                            navigation.navigate('Success', { money, item, currentDate, currentTimeLong });
                                        }
                                    })
                                }
                            }).catch(err => console.log(err))

                        }
                    })
                        .catch(err => console.log(err))
                }
                // handle error
            }).catch(error => {
                // handle error
                console.log(error)
            })
        }

    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={{ fontWeight: 'bold' }}>x</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold' }}>Nhập mật khẩu</Text>
                            <View></View>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <TextInput
                                keyboardType="numeric"
                                maxLength={6}
                                style={[styles.input]}
                                secureTextEntry={true}
                                onChangeText={setPass}
                            ></TextInput>
                            <Text style={{ fontSize: 10, color: 'red' }}>{err}</Text>
                            <Text style={[styles.txt_model, { color: '#bc4182' }]}>Xác thực bằng vân tay</Text>
                            <Text style={[styles.txt_model, { color: '#4c79a2' }]}>Quên mật khẩu</Text>
                            <TouchableOpacity style={{ width: '70%', height: 50, marginTop: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bc4182', borderRadius: 10 }}
                                onPress={pay}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Thanh toán</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <LinearGradient colors={['#bf1b72', '#ee70ab', '#f0afcd']} style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={styles.btn_back}>
                    <Image source={require('../imgs/icon/left.png')} style={{ width: 20, height: 20 }}></Image>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Thanh toán an toàn</Text>
                <View></View>
            </LinearGradient>
            <View style={styles.center}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Tài khoản/Thẻ</Text>
                        <Image source={require('../imgs/icon/eye.png')} style={{ width: 20, height: 20, marginLeft: 15 }}></Image>
                    </View>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', color: '#bf1b72' }}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, width: '100%', marginTop: 15 }}>
                    <View style={styles.box}>
                        <Image source={require("../imgs/icon/momo.png")} style={{ width: 30, height: 30, borderRadius: 10 }}></Image>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Ví MoMo</Text>
                            <Text style={{ color: 'gray' }}>{formattedAmount}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 15, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 17 }}>CHI TIẾT GIAO DỊCH</Text>
                    <View style={styles.box_center}>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Chuyển tiền đến</Text>
                            <Text style={styles.txt_value}>{item.fullName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Tên danh bạ</Text>
                            <Text style={styles.txt_value}>{item.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Số điện thoại</Text>
                            <Text style={styles.txt_value}>{item.phoneNumber}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Số tiền</Text>
                            <Text style={styles.txt_value}>{formattedMoney}</Text>
                        </View>
                        <View style={styles.box_center_child}>
                            <View style={styles.row}>
                                <Text style={styles.txt}>Phí giao dịch</Text>
                                <Text style={styles.txt_value}>Miễn phí</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.txt}>Mã tham chiếu</Text>
                                <Text style={styles.txt_value}>{currentTimeLong}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', marginTop: 5 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>ƯU ĐÃI</Text>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#bf1b72' }}> + Chọn thẻ quà tặng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginTop: 20 }}>
                        <Image source={require("../imgs/image/sercurity.png")} style={{ width: 120, height: 60 }} resizeMode="contain"></Image>
                        <Text style={{ color: 'gray', width: 250, fontSize: 16 }}>Bảo mật SSL/TLS, mọi thông tin giao dịch đều được mã hóa an toàn.</Text>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 10, height: 200 }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, color: 'gray' }}>Tổng tiền</Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{formattedMoney}</Text>
                </View>
                <TouchableOpacity style={{
                    width: '100%', height: 50, justifyContent: 'center', alignItems: 'center',
                    flexDirection: 'row', backgroundColor: '#d82d8b', borderRadius: 10, marginTop: 20
                }}
                    onPress={openModal}
                >
                    <Image source={require("../imgs/icon/lock-white.png")} style={{ width: 25, height: 25 }}></Image>
                    <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 10 }}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flext: 1,
        backgroundColor: '#fff',
        marginTop: 40
    },
    header: {
        width: '100%',
        height: 60,
        //backgroundColor: '#bf1b72',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    btn_back: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        height: 600,
        borderBottomWidth: 1,
        borderColor: 'gray',
        alignItems: 'center'
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150, height: 60,
        borderWidth: 1,
        borderColor: '#bf1b72',
        borderRadius: 10,
        backgroundColor: '#fff7fa'
    },
    box_center: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#f0f0f0',
        borderRadius: 10,
        height: 320,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10
    },
    txt: {
        fontSize: 16, color: 'gray'
    },
    txt_value: {
        fontSize: 16, fontWeight: 'bold'
    },
    box_center_child: {
        width: '100%',
        paddingVertical: 10,
        borderTopWidth: 2,
        borderColor: '#f0f0f0',
    },
    btn: {
        width: '100%', height: 50,
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'dashed',
        borderColor: '#bf1b72',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: '50%',
        width: '100%',
        backgroundColor: '#edefee',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    txt_model: {
        width: '40%',
        textAlign: 'center',
        marginTop: 15
    }
})