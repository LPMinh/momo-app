import { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, SectionList } from "react-native";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Context } from "../../App";
import { LinearGradient } from "expo-linear-gradient";
export default function Lsgd({navigation}) {
    const { user, setUser } = useContext(Context);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://654b36785b38a59f28eeae64.mockapi.io/User/" + user.id +"/Transaction?sortBy=date&order=desc")
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
            })
            .then(json => setData(json))
    }, [])
    const detail = (item) => {
        let id;
        if(item.senderId == user.id) {
            id = item.receiverId;
        } else {
            id = item.senderId;
        }
        //console.log(id)
        fetch('https://654b36785b38a59f28eeae64.mockapi.io/User/' + id)
        .then(resp => resp.json())
        .then(json => {
            const acc = json;
            const gd = item;
            navigation.navigate('ctgd', {acc, gd});
        })
        
    }
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#bf1b72', '#ee70ab', '#f0afcd']} style={styles.header}>
                <View style={styles.search_view}>
                    <Image source={require('../imgs/icon/kinh-lup.png')} style={{ width: 25, height: 25 }}></Image>
                    <TextInput placeholder="Tìm kiếm giao dịch" style={{ width: '80%', padding: 5 }} placeholderTextColor={'gray'}></TextInput>
                </View>
            </LinearGradient>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        const date = new Date(item.date);
                        const formattedAmount = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(item.newBalance);
                        const formattedAmount2 = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(item.amount);
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: index % 2 != 0 ? '#f7faff' : '#fff', justifyContent: 'space-between', padding: 10 }}
                            onPress={()=> {detail(item)}}>

                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={item.type == true ? require('../imgs/icon/sender.png') : require('../imgs/icon/receiver.png')} style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}></Image>
                                    <View style={{ height: '100%', marginLeft: 10 }}>
                                        <Text style={{ fontWeight: 'bold', width: 200 }}>{item.type == true ? 'Chuyển tiền đến ' + item.receiver : 'Nhận tiền từ ' + item.sender}</Text>
                                        <Text style={{ color: 'gray' }}>{date.getHours() + ':' + date.getMinutes() + ' - ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() + 1900)}</Text>
                                        <Text style={{ color: 'gray' }}>Số dư ví: {formattedAmount}</Text>
                                    </View>
                                </View>

                                <Text style={{ fontWeight: 'bold', color: item.status?'black':'red' }}>{item.type == true ? '-' + formattedAmount2 : '+' + formattedAmount2}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            ) : (<Text>Bạn chưa thực hiện giao dịch nào</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    header: {
        width: '100%',
        height: 50,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    search_view: {
        flexDirection: 'row',
        width: '80%',
        height: '60%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
})