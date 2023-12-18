import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, ImageBackground, FlatList, SectionList, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect, useRef, useContext,createContext } from 'react';
import Banner from './Banner';
import DataItem from './DataItem';
import Category from './Category';
import Slide from './Slide';
import { Context } from "../../App";


const images = [
  { key: 'image1', image: require('../imgs/image/khuyen-mai-chuyen-bay.jpg') },
  { key: 'image2', image: require('../imgs/image/khuyen-mai-data.jpg') },
  { key: 'image3', image: require('../imgs/image/khuyen-mai-du-lich-da-lat.jpg') },
  { key: 'image4', image: require('../imgs/image/khuyen-mai-du-lich-ha-noi.jpg') },
  { key: 'image5', image: require('../imgs/image/khuyen-mai-thanh-toan-cuoc.jpg') },
];

const banner = [
  { key: 'banner1', image: require('../imgs/image/banner1.jpg') },
  { key: 'banner2', image: require('../imgs/image/banner2.jpg') },
  { key: 'banner3', image: require('../imgs/image/banner3.jpg') }
];

const menu = [
  { id: 1, name: 'Ăn uống gần bạn', icon: require('../imgs/icon/an-uong-gan-ban.png') },
  { id: 2, name: 'Dịch vụ tiện ích', icon: require('../imgs/icon/dich-vu-tien-ich.png') },
  { id: 3, name: 'Ăn uống gần bạn', icon: require('../imgs/icon/an-uong-gan-ban.png') },
  { id: 4, name: 'Du lịch & Giải trí', icon: require('../imgs/icon/du-lich-giai-tri.png') },
  { id: 5, name: 'Thương mại điện tử', icon: require('../imgs/icon/doi-tac-lien-ket.png') },
  { id: 6, name: 'Tài chính bảo hiểm', icon: require('../imgs/icon/dich-vu-khac.png') },


]

const your_gift = [
  { id: 1, name: 'Đặt KFC trêm MoMo', icon: require('../imgs/icon/kfc.jpg'), title: 'Giảm 40K', des: 'KFC Miniapp - Giảm 40k', date: 'HSD: 30/09/2021' },
  { id: 2, name: 'Rau Má Mix', icon: require('../imgs/icon/rau-ma-mix.jpg'), title: 'Giảm 40K', des: 'Rau má mix - Giảm 40k', date: 'HSD: 30/09/2021' },
  { id: 3, name: 'Thanh toán hóa đơn', icon: require('../imgs/icon/thanh-toan-hoa-don.png'), title: 'Giảm 40K', des: 'thanh toán hóa đơn - Giảm 40k', date: 'HSD: 30/09/2021' },
]
const AllDataTab = ({ data }) => (
  <View>
    {data.map((item) => (
      <TouchableOpacity
        style={{
          width: '90%',
          height: 120,
          flexDirection: 'row',
          borderRadius: 5,
          marginBottom: 10,
          backgroundColor: 'white',
          alignSelf: 'center',
        }}
        key={item.id}
      >
        <Image source={{ uri: item.image }} style={{ width: '30%', height: '100%', resizeMode: 'contain' }} />
        <View style={{ width: '70%', height: '100%', flexDirection: 'column', justifyContent: 'space-evenly', paddingLeft: 5 }}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Image source={{ uri: item.icon }} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
            <Text style={{ color: 'gray' }}>{item.name}</Text>
          </View>
          <Text style={{ fontWeight: 'bold', width: '100%' }}>{item.title}</Text>
          <Text style={{ fontSize: 12, width: '100%' }}>{item.des}</Text>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '30%', alignSelf: 'flex-end' }}><Text style={{ fontSize: 12, fontWeight: 'bold', color: '#eb2d9d' }}>Thu thập</Text></TouchableOpacity>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export const  MyDiscountContext = createContext();

export default function Discount({ navigation,route }) {
  const [data, setData] = useState([])
  const [data_all, setDataAll] = useState([])
  const [activeTab, setActiveTab] = useState(1);
  const [activeData, setActiveData] = useState(data_all);

  const [MyDiscount, setMyDiscount] = useState({});
  const { user, setUser } = useContext(Context);
  const data_new=data_all.sort((a, b) => a.id < b.id ? -1 :1 );
  const updateValue = (value) => {
    setMyDiscount(value);
  };
  
  function getDataOfUuDaiAnData(jsonData) {
    const uuDaiAnData = jsonData.find((item) => item.type === "Ưu đãi ăn data");
    if (uuDaiAnData) {
      return uuDaiAnData.data;
    }
    return [];
  }
  useEffect(() => {
    fetch("https://654bc03b5b38a59f28efa753.mockapi.io/discount")
      .then(response => response.json())
      .then(data => {
        setDataAll(data);
      });
  }, [MyDiscount.discounts]);
  useEffect(() => {
    fetch("https://654bc03b5b38a59f28efa753.mockapi.io/discount_type")
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, []);

    useEffect(() => {
      if (user !== null ) {      
        var id = user.phoneNumber;
        
        fetch("https://6554f19563cafc694fe73d69.mockapi.io/MyDiscount/" + id)
          .then(response => response.json())
          .then(data => {
            setMyDiscount(data);
            
          }).catch((err) => console.log(err));

      }
    },[]);
    useEffect(() => {
      setActiveData(activeTab === 1 ? data_all : [...data_all].sort((a, b) => a.id < b.id ? 1 : -1));
    }, [activeTab, data_all]);
    
    

 
    console.log(MyDiscount);
  const discount_data = getDataOfUuDaiAnData(data);
  return (
    <MyDiscountContext.Provider value={{MyDiscount, setMyDiscount}}>
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }} >
        <View style={[styles.header]}>
          <TouchableOpacity style={styles.input_search} >
            <Image
              source={require('../imgs/icon/kinh-lup.png')}
              style={{ height: '60%', width: '10%', resizeMode: 'contain' }}
            />
            <Text  style={{ height: '100%', width: '95%',marginTop:20}} >Tìm kiếm ưu đãi...</Text>
          </TouchableOpacity>
          <Slide data={images} />
        </View>
        
        <View style={styles.body}>
          <View style={{ width: '100%', height: 130, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.gift_container}>
              <TouchableOpacity style={styles.gift_code_input}>
                <Image source={require('../imgs/icon/nhap-ma.png')} style={styles.gift_icon} />
                <View style={[styles.gift_text_container]}>
                  <Text style={{ fontWeight: 'bold' }}>Nhập mã</Text>
                  <Text style={{ fontSize: 10 }}>Mã ưu đãi,mã giới thiệu</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gift_code_input} onPress={()=>navigation.navigate("MyGift",{"id":user.phoneNumber})}>
                <Image source={require('../imgs/icon/qua-cua-ban.png')} style={styles.gift_icon} />
                <View style={[styles.gift_text_container]}>
                  <Text style={{ fontWeight: 'bold' }}>Quà của bạn</Text>
                  <Text style={{ fontSize: 10 }}>có {MyDiscount && MyDiscount.discounts && MyDiscount.discounts.length} ưu đãi</Text>

                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.menu_category]}>
              <View style={{ width: '100%' }}>
                <FlatList
                  data={menu}
                  horizontal
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.menu_item}>
                      <Image source={item.icon} style={styles.menu_icon} />
                      <Text style={[styles.menu_text, { fontSize: 10, textAlign: 'center' }]}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
          <ImageBackground source={require('../imgs/image/background.jpg')} style={[styles.main_event]}>
            <View style={[styles.kh_data_container]}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 10 }}>Trạm sạc data </Text>
                <Image source={require('../imgs/icon/arrow.png')} style={{ height: '100%', resizeMode: 'contain' }}></Image>
              </View>
            </View>
            <View style={{ position: 'absolute', top: '35%' }} >
              <FlatList
                data={discount_data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => (
                  <DataItem dataItem={item} navigation={navigation} />

                )}
              />

            </View>
          </ImageBackground>
          <View style={{ width: '100%' }}>
            <View style={{ backgroundColor: '#F1F1F3' }}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Category item={item} navigation={navigation} />
                )}
              />
            </View>
          </View>
          <View style={{ width: '100%', height: 150, backgroundColor: '#F1F1F3' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 15 }}>Quà Của bạn</Text>
            <SafeAreaView
            >
              <FlatList
                data={your_gift}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ width: WIDTH * 0.6, height: 120, borderRadius: 5, backgroundColor: '#F1F1F3', marginRight: 5 }} key={item.id}>
                    <View style={{ width: '100%', height: '70%', flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomEndRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                      <View style={{ width: '90%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 5, borderStyle: 'dashed', borderColor: '#F1F1F3' }}>
                        <View style={{ width: '100%', height: '50%', backgroundColor: '#F1F1F3', marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                          <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={item.icon}></Image>
                          <Text style={{ color: 'gray' }}>{item.name}</Text>
                        </View>
                        <View style={{ width: '100%', height: '50%' }}>
                          <Text style={{ fontWeight: 'bold', width: '100%' }}>{item.title}</Text>
                          <Text style={{ fontSize: 12, width: '100%' }}>{item.des}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ width: '100%', height: '30%', flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                      <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: 'gray' }}>{item.date}</Text>
                        <TouchableOpacity><Text style={{ color: '#EE4EAC', fontWeight: 'bold' }}>Dùng ngay</Text></TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              >
              </FlatList>
            </SafeAreaView>
          </View>
          <SafeAreaView style={{ width: '100%', height: HEIGHT * 0.25, backgroundColor: '#F1F1F3' }}>
            <Banner data={banner} />
          </SafeAreaView>
          <SafeAreaView style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
              <TouchableOpacity onPress={() => setActiveTab(1)} style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: activeTab === 1 ? 2 : 0, borderColor: '#EE4EAC' }}>
                <Text style={{ paddingHorizontal: 20, fontWeight: activeTab === 1 ? 'bold' : 'normal' }}>Tất cả</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab(2)} style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: activeTab === 2 ? 2 : 0, borderColor: '#EE4EAC' }}>
                <Text style={{ paddingHorizontal: 20, fontWeight: activeTab === 2 ? 'bold' : 'normal' }}>Mới nhất</Text>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#F1F1F3', justifyContent: 'center', width: '100%' }}>
              {activeTab === 1 && <AllDataTab data={activeData} />}
              {activeTab === 2 && <AllDataTab data={activeData} />}
            </View>
          </SafeAreaView>
        </View>
        
      </ScrollView>

    </View>
    </MyDiscountContext.Provider>
   
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F1F3',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'

  },
  header: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 180,


  },
  wrap: {
    width: '100%',
    height: '100%',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  doActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  input_search: {
    position: 'absolute',
    top: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    width: '90%',
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',

    height: '30%'

  },
  gift_container: {
    width: '90%', height: 70,
    marginTop: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',



  },
  gift_code_input: {
    width: '50%',
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#888',
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
    borderRadius: 15
  },
  gift_icon: {
    width: '20%',
    height: '100%',
    resizeMode: 'contain'
  },
  gift_text_container: {
    width: '80%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  menu_category: {
    marginTop: -5,
    width: '90%',
    height: 100,
    alignItems: 'space-between',
    justifyContent: 'center',


  },
  menu_item: {
    width: 60,
    height: 60,
    marginLeft: 10

  },
  menu_icon: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain'
  },
  container_type: {
    width: '100%',
    height: HEIGHT * 0.45,
    backgroundImage: require('../imgs/image/background.jpg'),
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  container_type_gift: {
    width: '100%',
    height: HEIGHT * 0.4

  },
  main_event: {
    width: '100%',
    height: 550,
    borderWidth: 1,
    backgroundImage: require('../imgs/image/background.jpg')
  },
  kh_data_container: {
    width: '100%',
    position: 'absolute',
    top: '30%',

  },
  kh_male_container: {
    width: '100%',
  },

  data_item: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.3,
    backgroundColor: '#ffffff',
    margin: 5,
    marginTop: 0,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 1,
    paddingBottom: 30

  },

  image_data: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 20

  },


});

