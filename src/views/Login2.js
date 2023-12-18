import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Context } from "../../App";
import { useState } from "react";

export default function Login2({navigation}) {
    const {user, setUser} = useContext(Context);
    const [pass, setPass] = useState('');
    const [err, setErr] = useState('');
    const handleLogin = () => {
        if(pass === '')
            setErr('Vui lòng nhập mật khẩu');
        else if(pass !== user.password)
            setErr('Mật khẩu không chính xác');
        else {
            setErr('');
            navigation.navigate('HomeScreen');
        }
    }
    return (
        <View style={styles.container}> 
            <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
                <View style={[styles.txtHeader, {width: '40%'}]}>
                    <Text style={{color: '#fff', fontSize: 20}}>Xin chào!</Text>
                </View>
                <View style={[styles.txtHeader, {width: '60%'}]}>
                    <Text style={{color: '#fff', fontSize: 18}}>{user.fullName}</Text>
                </View>
                <View style={styles.txtHeader}>
                    <Text style={{color: '#fff', fontSize: 17}}>{user.phoneNumber}</Text>
                </View>
                
            </View>
            <View style={styles.view_input}>
                <Image source={require('../imgs/icon/lock.png')} style={{width: "20%", height: '60%'}} resizeMode="contain"></Image>
                <TextInput keyboardType="numeric" maxLength={6} placeholder="Nhập mật khẩu" style={[styles.input]}
                    placeholderTextColor={'gray'} secureTextEntry={true} onChangeText={(value) => { setErr('') ;setPass(value)}}
                ></TextInput>
            </View>
            <Text style={{color: 'red'}}>{err}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{color: '#e2b2d7', fontSize: 22}}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                <Image source={require('../imgs/icon/van-tay.png')} style={{width: 30, height: 30}}></Image>
                <Text style={{fontSize: 15, color: '#fff', marginLeft: 10}}>Mở khóa bằng vân tay</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center', marginTop: 15}}>
                <TouchableOpacity>
                    <Text style={{color: '#fff', fontSize: 18}}>QUÊN MẬT KHẨU</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setUser(''); navigation.goBack()}}>
                    <Text style={{color: '#fff', fontSize: 18}}>THOÁT TÀI KHOẢN</Text>
                </TouchableOpacity>
            </View>
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
        flexDirection: 'row',
        
    },
    input: {
        height: '100%', 
        width: '80%', 
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 70,
        textAlign: 'center'
    },
    txtHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
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