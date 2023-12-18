import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context } from "../../App";
import { LinearGradient } from "expo-linear-gradient";

export default function Fail({ navigation, route }) {
    const { money, item, currentDate, currentTimeLong } = route.params;
    const { user, setUser } = useContext(Context);
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(user.balance);
    const formattedMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(money);
    return (
        <LinearGradient colors={['#bf1b72', '#ee70ab', '#f0afcd', '#fff',
            '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']} style={styles.container}>
            <View style={styles.header}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Kết quả giao dịch</Text>
            </View>
            <View style={[styles.row, { height: 40, borderWidth: 2, borderColor: '#f0f0f0', borderRadius: 5 }]}>
                <Text style={styles.txt_left}>Số dư ví</Text>
                <Text style={styles.txt_right}>{formattedAmount}</Text>
            </View>
            <View style={[styles.row, { height: 50, borderWidth: 2, borderColor: '#f0f0f0', borderRadius: 10 }]}>
                <Text style={styles.txt_left}>Tổng tiền</Text>
                <Text style={styles.txt_right}>{formattedMoney}</Text>
            </View>
            <View style={{
                justifyContent: 'center', alignItems: 'center', padding: 20, borderWidth: 2, borderColor: "#f0f0f0", width: 400,
                marginTop: 40, borderStyle: "solid", borderRadius: 10
            }}>
                <Image source={require("../imgs/icon/fail.png")} style={{ width: 50, height: 50, marginBottom: 10 }}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Giao dịch thất bại</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{formattedMoney}</Text>
                <View style={{
                    width: 350, height: 50, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: '#fff7fa', marginTop: 20, borderRadius: 10
                }}>
                    <Text>Chuyển không thành công {formattedMoney} cho {item.fullName}</Text>
                </View>
                <View style={[styles.row, styles.boder_row]}>
                    <Text style={styles.txt_left}>Thời gian thanh toán</Text>
                    <Text style={styles.txt_right}>{currentDate.getHours() + ":" + currentDate.getMinutes() + " - "
                        + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + (currentDate.getYear() + 1900)}</Text>
                </View>
                <View style={[styles.row, styles.boder_row]}>
                    <Text style={styles.txt_left}>Mã giao dịch</Text>
                    <Text style={styles.txt_right}>{currentTimeLong}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.txt_left}>Dịch vụ</Text>
                    <Text style={styles.txt_right}>Chuyển tiền</Text>
                </View>
            </View>
            <View style={{width: '105%', marginTop: 20, alignItems: 'center', justifyContent: 'space-around', height: 200}}>
                <TouchableOpacity style={[styles.btn_bottom, {borderWidth: 2, borderColor: '#f0f0f0', borderRadius: 20}]}>
                    <Text style={[styles.txt_size, {color: '#0670d5'}]}>Bấm để nhận email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn_bottom, {borderWidth: 2, borderColor: '#bf1b72', borderRadius: 20}]} onPress={() => navigation.navigate('ChuyenTien')}>
                    
                    <Text style={[styles.txt_size, {color: '#bf1b72'}]}>+ Tạo giao dịch mới</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn_bottom, {backgroundColor: '#bf1b72', borderRadius: 20}]}
                    onPress={() => navigation.navigate("HomeScreen")}
                >
                    <Text style={[styles.txt_size, {color: 'white'}]}>Màn hình chính</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 40

    },
    header: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 390,
        paddingHorizontal: 15,
        marginTop: 15,
        backgroundColor: '#fff'
    },
    boder_row: {
        borderBottomWidth: 2,
        borderColor: '#f0f0f0',
        paddingBottom: 20
    },
    txt_left: {
        color: 'gray'
    },
    txt_right: {
        fontWeight: 'bold'
    },
    btn_bottom: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt_size: {
        fontSize: 17,
        fontWeight: 'bold'
    }
})