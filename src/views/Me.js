import * as React from 'react';
import { Text, View, StyleSheet, Image ,TextInput,TouchableOpacity,ImageBackground,FlatList,SectionList,ScrollView,SafeAreaView} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState, useEffect, useRef, useContext,createContext } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { Context } from "../../App";
export default function Me({navigation}) {  
  const [selected, setSelected] = React.useState(false);  

  const { user, setUser } = useContext(Context);
  function formatVND(amount) {
    if (typeof amount !== 'number') {
        return 'Invalid input';
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    });

    return formatter.format(amount);
}

  const dataWallet = [
    {key:'1',name:'Ví momo',iamge:require('../imgs/icon/vi-momo.png'),money:formatVND(user.balance)},
    {key:'2',name:'Vietinbak',iamge:require('../imgs/icon/viettinbank.png'),money:formatVND(1000000)},
  ]
  const dataExtention=[
    {key:'1',name:'Điểm tin cậy Momo',des:'cập nhật quyền lợi tài chính của bạn',iamge:require('../imgs/icon/diem-momo-tin-cay.png')},
    {key:'2',name:'Quản lý chi tiêu',des:'ghi chép và theo dõi các chi tiêu mỗi ngày',iamge:require('../imgs/icon/quan-ly-chi-tieu.png')},
    {key:'3',name:'Quản lý đặt chỗ',des:'Thông tin đặt phòng vé đã mua',iamge:require('../imgs/icon/quan-ly-dat-cho.png')},
    {key:'4',name:'Thanh toán hóa đơn',des:'chưa có hóa đơn',iamge:require('../imgs/icon/thanh-toan-hoa-don.png')},
    {key:'5',name:'Thẻ quà tặng',des:'0 thẻ quà tặng',iamge:require('../imgs/icon/the-qua-tang.png')},
  ]
  const dataOrther = [
    {key:'1',name:'Cài đặt ứng dụng',iamge:require('../imgs/icon/cai-dat-ung-dung.png')},
    {key:'2',name:'Trung tâm bảo mật',iamge:require('../imgs/icon/trung-tam-bao-mat.png')},
    {key:'3',name:'Trung tâm trợ giúp',iamge:require('../imgs/icon/trung-tam-tro-giup.png')}
  ]
  const renderWallet = ({ item }) => (
    <TouchableOpacity style={{width:'100%',justifyContent:'flex-start',alignItems:'center',position:'relative'}}>
    <View style={{width:'100%',flexDirection:'row',height:60,backgroundColor:'white',borderBottomEndRadius:20,borderBottomStartRadius:20,justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={item.iamge} style={{width:30,height:30,marginLeft:20}}></Image>
              <Text style={{textAlign:'right',marginLeft:10}}>{item.name}</Text>
          </View>
          <Text style={{width:100,height:20,marginRight:20}}>{item.money}</Text>
    </View>
    </TouchableOpacity>
  )
  const renderExtentions = ({ item }) => (
    <TouchableOpacity style={{width:'100%',justifyContent:'flex-start',alignItems:'center',position:'relative'}}>
    <View style={{width:'100%',flexDirection:'row',height:60,backgroundColor:'white',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={item.iamge} style={{width:30,height:30,marginLeft:20}}></Image>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <Text style={{textAlign:'right',marginLeft:10,fontWeight:'bold'}}>{item.name}</Text>
                    <Text style={{textAlign:'right',marginLeft:10,fontSize:10}}>{item.des}</Text>
              </View>
              
          </View>
          <Image source={require('../imgs/icon/arrow.png')} style={{width:20,height:20,marginRight:20}}></Image>
    </View>
    </TouchableOpacity>
  )
  const renderOrther = ({ item }) => (
    <TouchableOpacity style={{width:'100%',justifyContent:'flex-start',alignItems:'center',position:'relative'}}>
    <View style={{width:'100%',flexDirection:'row',height:60,backgroundColor:'white',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={item.iamge} style={{width:30,height:30,marginLeft:20}}></Image>
              <Text style={{textAlign:'right',marginLeft:10,fontWeight:'bold'}}>{item.name}</Text>
          </View>
          <Image source={require('../imgs/icon/arrow.png')} style={{width:20,height:20,marginRight:20}}></Image>
    </View>
    </TouchableOpacity>
  )
  
  const ListWallet = () => (
    <FlatList 
                 style={{width:'100%',marginTop:10}}
                 data={dataWallet}
                 renderItem={renderWallet}
    />
  )

  return (
      <View style={styles.container}>
        
        <ImageBackground source={require('../imgs/image/background_me.png')} style={{width:'100%',height:100,borderWidth:1}}></ImageBackground>
       

        <ScrollView style={{width:'100%',marginTop:-10}} >
          <View style={{width:'90%',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
              <View style={{width:'100%',justifyContent:'flex-start',alignItems:'center'}}>
                    <TouchableOpacity style={{width:'100%',flexDirection:'row',height:90,backgroundColor:'white',borderRadius:20,borderBottomColor:'gray',borderStyle:'solid',borderBottomWidth:5}}>
                          <View style={{width:'30%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                              <Image source={{uri: user.avatar}} style={{width:60,height:60,borderRadius:50}}></Image>
                          </View>
                          <View style={{width:'40%',height:'100%',justifyContent:'space-evenly'}}>

                              <Text style={{fontSize:18,fontWeight:'bold'}}>{user.fullName}</Text>

                              <Text style={{fontSize:15}}>{user.phoneNumber}</Text>
                              <View style={{width:'60%',height:25,justifyContent:'center',alignItems:'center',backgroundColor:'#4DC41D',borderRadius:10}}>
                                  <Text style={{color:'white',width:'100%',textAlign:'center'}}>Đã xác thực</Text>
                              </View>
                          </View>
                          <View style={{width:'30%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                      <Image source={require('../imgs/icon/qr.png')} style={{width:20,height:20}}></Image>
                                      <Image source={require('../imgs/icon/arrow.png')} style={{width:20,height:20,marginLeft:25}}></Image>
                                                                         

                              </View>
                            
                          </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%',justifyContent:'flex-start',alignItems:'center',position:'relative'}}>
                          <View style={{width:'100%',flexDirection:'row',height:60,backgroundColor:'white',borderBottomEndRadius:20,borderBottomStartRadius:20,justifyContent:'space-between',alignItems:'center'}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <Image source={require('../imgs/icon/gioithieumomo.png')} style={{width:30,height:30,marginLeft:20}}></Image>
                                    <Text style={{textAlign:'right',marginLeft:10,fontWeight:'bold'}}>Giới thiệu momo</Text>
                                </View>
                                <Image source={require('../imgs/icon/arrow.png')} style={{width:20,height:20,marginRight:20}}></Image>
                          </View>
                    </TouchableOpacity>
                   
              </View>

              <View style={{width:'100%',justifyContent:'flex-start',alignItems:'center',marginTop:10}}>
                  <Text style={{textAlign:'left',width:'100%',fontSize:20,fontWeight:'bold'}}>Quản lý Ví</Text>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'white',borderTopStartRadius:10,borderTopEndRadius:10}}>
                      <TouchableOpacity style={{width:'90%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:50,borderColor:'gray',borderBottomWidth:selected===true?1:0}} onPress={()=>{setSelected(!selected)}}>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>Tài khoản / thẻ</Text>
                         {selected === false&& <Image source={require('../imgs/icon/arrow-down.png')} style={{width:20,height:20,marginLeft:25}}></Image>}{selected===true && <Image source={require('../imgs/icon/arrow-up.svg')} style={{width:20,height:20,marginLeft:25}}></Image>}
                      </TouchableOpacity>
                      {selected === true && <ListWallet/>}
                  </View>
                  <TouchableOpacity style={{width:'100%',flexDirection:'row',height:60,backgroundColor:'white',justifyContent:'space-between',alignItems:'center'}}>
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Image source={require('../imgs/icon/thanh-toan-nap-tien-tu-dong.png')} style={{width:30,height:30,marginLeft:20}}></Image>
                          <Text style={{textAlign:'right',marginLeft:10}}>Thanh toán nạp tiền tự động</Text>
                      </View>
                      <Image source={require('../imgs/icon/arrow.png')} style={{width:20,height:20,marginRight:20}}></Image>
                   </TouchableOpacity>
                   <TouchableOpacity style={{width:'100%',flexDirection:'row',height:60,backgroundColor:'white',justifyContent:'space-between',alignItems:'center'}}>
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Image source={require('../imgs/icon/dang-nhap-va-bao-mat.png')} style={{width:30,height:30,marginLeft:20}}></Image>
                          <Text style={{textAlign:'right',marginLeft:10}}>Đăng nhập và bảo mật</Text>
                      </View>
                      <Image source={require('../imgs/icon/arrow.png')} style={{width:20,height:20,marginRight:20}}></Image>
                   </TouchableOpacity>
              </View>
              <View style={{width:'100%',justifyContent:'flex-start',alignItems:'center',marginTop:10}}>
                  <Text style={{textAlign:'left',width:'100%',fontSize:20,fontWeight:'bold'}}>Tiện ích</Text>
                  <FlatList 
                 style={{width:'100%',marginTop:10,borderRadius:10}}
                 data={dataExtention}
                 renderItem={renderExtentions}
              />
              </View> 
              <View style={{width:'100%',justifyContent:'flex-start',alignItems:'center',marginTop:10}}>
                  <Text style={{textAlign:'left',width:'100%',fontSize:20,fontWeight:'bold'}}>Khác</Text>
                  <FlatList 
                 style={{width:'100%',marginTop:10,borderRadius:20}}
                 data={dataOrther}
                 renderItem={renderOrther}
              />
              </View>    
              <TouchableOpacity style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:10,backgroundColor:'white',height:50,borderRadius:20}}
              onPress={() => {
                setUser({});
                navigation.navigate('Login1');
              }}
              >
                <Text style={{textAlign:'center',fontWeight:'bold'}}>Đăng xuất</Text>
              </TouchableOpacity>                      
          </View>       
        </ScrollView>
      </View>
      
      
    
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#F1F1F3',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width:'100%',
    backgroundColor:'#F1F1F3'
    

  }
  
});

