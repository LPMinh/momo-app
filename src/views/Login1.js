import { useContext } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Context } from "../../App";

export default function Login1({navigation}) {
    const [err, setErr] = useState('');
    const [phone, setPhone] = useState('');
    const {user, setUser} = useContext(Context);
    const handleLogin = () => {
        if(phone === '')
            setErr('Vui lòng nhập số điện thoại')
        else {
        fetch('https://654b36785b38a59f28eeae64.mockapi.io/User?phoneNumber=' + phone)
        .then((resp) => {
            if(resp.ok)
                return resp.json();
        })
        .then((json) => {
            if(json.length <= 0)
                setErr('Số điện thoại không chính xác')
            else {
                setUser(json[0]);
                navigation.navigate('Login2');
            }
                

        })
        .catch((err) => {console.log(err)})}
    }
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../imgs/icon/momo-login.png')} style={{width: 150, height: 150}}></Image>
            </View>
            <View style={styles.view_input}>
                <TextInput keyboardType="numeric" maxLength={10} placeholder="Nhập số điện thoại" style={[styles.input]}
                    placeholderTextColor={'gray'} onChangeText={(value) => { setErr('') ;setPhone(value)}}
                ></TextInput>
            </View>
            <Text style={{color: 'red'}}>{err}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{color: '#e2b2d7', fontSize: 22}}>TIẾP TỤC</Text>
            </TouchableOpacity>
            <Text style={{color: '#e671ba', marginTop: 10}}>Một mã xác thực sẽ được gửi cho bạn</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2026e',
        alignItems: 'center',
        marginTop: 40
    },
    view_input: {
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: '100%', 
        width: '100%', 
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        width: '90%',
        height: 60,
        marginTop: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8a0256'
    }
})