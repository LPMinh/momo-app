import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, ImageBackground, FlatList, SectionList, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState, useEffect, useRef } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { Platform } from 'react-native';
import { useContext } from 'react';
import { Context } from '../../App';
export default function Detail({ navigation, route }) {
    const id = route.params?.id;
    const { user, setUser } = useContext(Context);
    const [data, setData] = useState({});
    const [MyDiscount, setMyDiscount] = useState();
    const [isCheck, setIsCheck] = useState(false);
    const handleCheckAvalable = (id) => {
        if(MyDiscount!==undefined){
            if (  MyDiscount.discounts !== undefined) {
                return MyDiscount.discounts.some((item) => item.id === id);
                }
               return false;
        }
       
      }
    useEffect(() => {
        fetch("https://654bc03b5b38a59f28efa753.mockapi.io/discount/" + id + "")
            .then(response =>

                response.json())
            .then(data => {
                setData(data);
                console.log(data, 'data');
            });
    }, []);
    useEffect(() => {
        if (user !== null) {      
          var id = user.phoneNumber;
          
          fetch("https://6554f19563cafc694fe73d69.mockapi.io/MyDiscount/" + id)
            .then(response => response.json())
            .then(data => {
              setMyDiscount(data);     
            }).catch((err) => console.log(err));
  
        }
      },[user]);
      const addMyDiscount = () => {
        console.log('data:', data);
        if (user !== null) {
          var id = user.phoneNumber;
          console.log('MyDiscount before:', MyDiscount);
      
          if (handleCheckAvalable(data.id) === false) {
         
           
              const newMyDiscount = { ...MyDiscount };
      
              if (!newMyDiscount.discounts) {
                newMyDiscount.discounts = [];
              }
      
              newMyDiscount.discounts.push(data);
      
              
      
      
            fetch("https://6554f19563cafc694fe73d69.mockapi.io/MyDiscount/" + id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(MyDiscount),
            })
              .then(() => alert('Thêm thành công'))
              .catch((error) => console.error('Lỗi khi thêm ghi chú:', error));
          }
         
        }
      };

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
  
 

    const dataRecommend = [
        {
            id: "1",
            name: "Data 3G/4G",
            icon: "https://res.cloudinary.com/dvwsgyx2y/image/upload/v1699460198/discount/mua-nap-4g.jpg",
            image: "https://res.cloudinary.com/dvwsgyx2y/image/upload/v1699461205/discount/kh_giam50max15.jpg",
            title: "Giảm 50%",
            des: "Tối đa 15.0000đ cho đơn từ 0 đ"
        },
        {
            id: "2",
            name: "Combo Nghe gọi + Data",
            icon: "https://res.cloudinary.com/dvwsgyx2y/image/upload/v1699460924/discount/combo-goi.jpg",
            image: "https://res.cloudinary.com/dvwsgyx2y/image/upload/v1699461177/discount/kh_giam20max30.jpg",
            title: "Giảm 20%",
            des: "Tối đa 30.0000đ cho đơn từ 0 đ"
        },
        {
            id: "3",
            name: "Sim Vinaphone",
            icon: "https://res.cloudinary.com/dvwsgyx2y/image/upload/v1699460538/discount/viettel.jpg",
            image: "https://res.cloudinary.com/dvwsgyx2y/image/upload/v1699461106/discount/giam20max50.jpg",
            title: "Giảm 20%",
            des: "Tối đa 50.0000đ cho đơn từ 0 đ"
        }]
     const  goBack=()=> {     
            navigation.goBack();
            //route.params.setMyDiscount(MyDiscount);
          }
    return (
        <View style={styles.container}>

            <ImageBackground source={{ uri: data.image }} style={{ width: '100%', height: 220, borderWidth: 1, resizeMode: 'stretch' }}>
                <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'gray', position: 'absolute', top: 50, left: 20, borderRadius: 25 }} onPress={goBack}>
                    <Image source={require('../imgs/icon/left.png')} style={{ height: 30, width: 30, borderRadius: 50 }}></Image>
                </TouchableOpacity>
            </ImageBackground>
            



                <TouchableOpacity style={{
                    width: '90%', height: 120, borderRadius: 5, backgroundColor: '#F1F1F3', marginRight: 5, alignSelf: "center"
                    , elevation: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5
                }} >
                    <View style={{ width: '100%', height: '70%', flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomEndRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                        <View style={{ width: '90%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 5, borderStyle: 'dashed', borderColor: '#F1F1F3' }}>
                            <Text style={{ fontWeight: 'bold' }}>{data.des}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: '30%', flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: data.icon }} style={{ height: 30, width: 30 }}></Image>
                        <Text style={{ marginLeft: 10 }}>{data.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ width: '90%', height: WIDTH * 0.3, justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={{ width: '100%', height: '40%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: 'gray', borderRadius: 10, borderWidth: 1 }}>
                        <View style={{ width: '50%', height: '100%', flexDirection: 'row', }}>
                            <Image source={require('../imgs/icon/huong-dan.jpg')} style={{ height: null, width: '30%', resizeMode: 'contain' }}></Image>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Điều khoản sử dụng</Text>
                                <Text style={{ color: 'gray', fontWeight: '200' }}>Nhấn vào để xem chi tiết</Text>
                            </View>
                        </View>
                        <Image source={require('../imgs/icon/arrow.png')} style={{ height: 30, width: 30 }}></Image>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '100%', height: '40%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: 'gray', borderRadius: 10, borderWidth: 1 }}>
                        <View style={{ width: '50%', height: '100%', flexDirection: 'row', }}>
                            <Image source={require('../imgs/icon/dieu-khoan.jpg')} style={{ height: null, width: '30%', resizeMode: 'contain' }}></Image>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Hướng dẫn sử dụng</Text>
                                <Text style={{ color: 'gray', fontWeight: '200' }}>Nhấn vào để xem chi tiết</Text>
                            </View>
                        </View>
                        <Image source={require('../imgs/icon/arrow.png')} style={{ height: 30, width: 30 }}></Image>

                    </TouchableOpacity>

                </View>
                <View style={{ height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', width: '100%' }}>
                        Đề xuất cho bạn
                    </Text>
                    <FlatList
                        data={dataRecommend}
                        keyExtractor={(dataItem) => dataItem.id.toString()}
                        horizontal
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: dataItem }) => (
                            <TouchableOpacity
                                style={{
                                    width: 300,
                                    height: '60%',
                                    flexDirection: 'row',
                                    marginRight: 20,                                  

                                }}
                            >
                                <View style={{ width: '30%', height: '100%', flexDirection: 'column', borderRadius: 10, borderWidth: 3, borderColor: 'gray', borderRightWidth: 1 }}>
                                    <Image source={{ uri: dataItem.icon }} style={{ height: '50%', width: '100%', resizeMode: 'contain' }} />
                                    <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>{dataItem.name}</Text>
                                </View>
                                <View style={{ width: '70%', height: '100%', flexDirection: 'column', borderRadius: 10, borderWidth: 3, borderColor: 'gray', borderLeftWidth: 0, justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                                    <Text style={{ width: '100%', fontWeight: 'bold' }}>{dataItem.name}</Text>
                                    <Text style={{ width: '100%' }}>{dataItem.des}</Text>
                                    <TouchableOpacity style={{ borderColor: '#EE4EAC', padding: 5, borderWidth: 1, alignSelf: 'flex-end', marginRight: 10 }}>
                                        <Text style={{ color: '#eb2d9d', fontWeight: 'bold' }}>Thu nhập</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <TouchableOpacity style={{ width: '90%', height: 50, backgroundColor: '#eb2d9d', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 20, position: 'absolute', bottom: 0 }} onPress={()=>{
            addMyDiscount({data});
            
          }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{handleCheckAvalable(data.id) === true ? "Dùng ngay" : "Thu thập"}</Text>
                </TouchableOpacity>
            
        </View >



    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F1F1F3',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white'


    }

});

