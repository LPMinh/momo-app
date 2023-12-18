import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Context } from '../../App';

const iconData = [
    { key: 1, src: require('../imgs/icon/chuyen-tien.png'), text: 'Chuyển tiền' },
    { key: 2, src: require('../imgs/icon/chuyen-tien-2.png'), text: 'Chuyển tiền ngân hàng' },
    { key: 3, src: require('../imgs/icon/thanh-toan-hoa-don.png'), text: 'Thanh toán hóa đơn' },
    { key: 4, src: require('../imgs/icon/nap-tien-dien-thoai.png'), text: 'Nạp tiền điện thoại' },
    { key: 5, src: require('../imgs/icon/data-3g-4g.png'), text: 'Data 3G/4G' },
    { key: 6, src: require('../imgs/icon/tui-than-tai.png'), text: 'Túi thần tài' },
    { key: 7, src: require('../imgs/icon/vi-tra-sau.png'), text: 'Ví trả sau' },
    { key: 8, src: require('../imgs/icon/ve-tau-hoa.png'), text: 'Vé tàu hỏa' },
    { key: 9, src: require('../imgs/icon/ve-may-bay.png'), text: 'Vé máy bay' },
    { key: 10, src: require('../imgs/icon/tiet-kiem-onl.png'), text: 'Tiết kiệm Online' },
    { key: 11, src: require('../imgs/icon/ve-xe-khach.png'), text: 'Vé xe khách' },
    { key: 12, src: require('../imgs/icon/all.png'), text: 'Tất cả dịch vụ' },
]

const iconDataHorizontal = [
    { key: 1, src: require('../imgs/icon/heo-dat-momo.png'), text: 'Heo đất MoMo' },
    { key: 2, src: require('../imgs/icon/ve-xem-phim.png'), text: 'Mua vé xem phim' },
    { key: 3, src: require('../imgs/icon/vay-nhanh.png'), text: 'Vay nhanh' },
    { key: 4, src: require('../imgs/icon/thanh-toan-khoan-vay.png'), text: 'Thanh toán khoản vay' },
    { key: 5, src: require('../imgs/icon/di-bo-cung-momo.png'), text: 'Đi bộ cùng MoMo' },
    { key: 6, src: require('../imgs/icon/mua-ma-the-di-dong.png'), text: 'Mua mã thẻ di động' },
    { key: 7, src: require('../imgs/icon/gioi-thieu-doi-tac.png'), text: 'Giới thiệu đối tác MoMo' },
    { key: 8, src: require('../imgs/icon/diem-momo-tin-cay.png'), text: 'Điểm tin cậy MoMo' },
]

const iconBanner = [
    { key: 1, src: require('../imgs/img/uu-dai-1.png'), text1: '100% hoàn tiền đến 9.999.9...', text2: 'Chuyển 111Đ: nhận hoàn tiền và ...', textBtn: 'Xem ngay' },
    { key: 2, src: require('../imgs/img/uu-dai-2.png'), text1: 'Giới thiệu MoMo rinh quà', text2: 'Rủ bạn đông - Quà càng đậm', textBtn: 'Xem ngay' },
    { key: 3, src: require('../imgs/img/uu-dai-1.png'), text1: '100% hoàn tiền đến 9.999.9...', text2: 'Chuyển 111Đ: nhận hoàn tiền và ...', textBtn: 'Xem ngay' },

]

const boxUudai = [
    { key: 1, src: require('../imgs/img/uu-dai-moi-1.png'), text1: 'Chuyển 123Đ tới Ngân Hàng', text2: 'Hoàn tiền tới 1' },
    { key: 2, src: require('../imgs/img/uu-dai-moi-2.png'), text1: 'Quà hoàn tiền 50%', text2: 'Thử ngay' },
    { key: 3, src: require('../imgs/img/uu-dai-moi-3.png'), text1: 'Chúc mừng bạn được thẻ quà', text2: 'Chuyển ngay' },
    { key: 4, src: require('../imgs/img/uu-dai-moi-5.png'), text1: 'Thứ 5 sale đậm - Bamboo Airways quẩy hè.', text2: 'Đặt ngay' },
    { key: 5, src: require('../imgs/img/uu-dai-moi-6.png'), text1: 'Đãi bạn pizza đến 100k', text2: 'Xem ngay' },
    { key: 6, src: require('../imgs/img/uu-dai-moi-4.png'), text1: 'Tặng bạn combo voucher 50k', text2: 'Chuyển ngay' },
    { key: 7, src: require('../imgs/img/uu-dai-moi-7.png'), text1: 'Ở đây có deal siêu hot!', text2: 'Xem ngay' },

]

const headerIcon = [
    { key: 1, src: require('../imgs/icon/tim-kiem.png')},
    { key: 2, src: require('../imgs/icon/nap-tien1.png')},
    { key: 3, src: require('../imgs/icon/rut-tien1.png')},
    { key: 4, src: require('../imgs/icon/qr-nhan-tien1.png')},
    { key: 5, src: require('../imgs/icon/qr-thanh-toan1.png')},
    { key: 6, src: require('../imgs/icon/quet-ma.png')},
    { key: 7, src: require('../imgs/icon/thong-bao.png')},
    { key: 8, src: require('../imgs/icon/tin-nhan.png')},
]

const data_view = []

const renderWallet = ({ item }) => (
    <TouchableOpacity style={{flexDirection:'row',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={item.src} style={styles.imgIcon}></Image>
        <Text style={styles.txtIcon}>{item.text}</Text>
    </TouchableOpacity>
)


export default function Home({ navigation }) {
    const [data, setData] = useState(iconData);
    const {user, setUser} = useContext(Context);
    // const [balance, setBalance] = useState(user.balance);
    const [show, setShow] = useState(true);
    const formattedAmount = new Intl.NumberFormat('vi-VN', {  
        style: 'currency',
        currency: 'VND'
      }).format(user.balance);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header1}>
                    {headerIcon.map((item) => {
                        return (
                            <TouchableOpacity key={item.key}>
                                <Image source={item.src} style={{width: 30, height: 30}} resizeMode='contain'></Image>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles.header2}>
                    <View style={{flexDirection:'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => setShow(!show)}>
                            <Image source={show?require('../imgs/icon/eye-gach.png'):require('../imgs/icon/eye.png')} style={{width: 15, height: 15}}></Image>
                        </TouchableOpacity>
                        <Text style={{fontWeight: 'bold', marginLeft: 5}}>{show?'******':formattedAmount}</Text>
                    </View>
                    <View>
                        <Text>Quản lý</Text>
                    </View>
                </View>
                
            </View>
            
          
            <ScrollView style={{ backgroundColor: '#fff', paddingTop: 10 }} showsVerticalScrollIndicator={false}>
                <FlatList
                    key={'#'}
                    data={data}
                    numColumns={4}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.iconButton} onPress={() => { if (item.key == 12) { navigation.navigate('AllService', {data, data_view})}
                                 
                                else {
                                    if(data_view.length <= 0) data_view.push(item);
                                    else{
                                        let flag = false;
                                        for(let i = 0; i < data_view.length; i++) {
                                            if(data_view[i].key == item.key) 
                                                flag = true;
                                        }
                                        if(!flag) data_view.push(item);

                                    }
                                    if(item.key == 1) navigation.navigate('ChuyenTien'); 
                                    
                                } }}>
                                <Image source={item.src} style={styles.imgIcon}></Image>
                                <Text style={styles.txtIcon}>{item.text}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.key}
                    style={{ marginLeft: 5 }}

                />

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.lblLeft}>MoMo đề xuất</Text>

                    <FlatList
                        key={'#'}
                        data={iconDataHorizontal}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Image source={item.src} style={styles.imgIcon}></Image>
                                    <Text style={styles.txtIcon}>{item.text}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => item.key}
                    />



                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={styles.lblLeft}>Có thể bạn quan tâm</Text>

                    <FlatList
                        key={'#'}
                        data={iconBanner}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.boxCare}>
                                <TouchableOpacity style={styles.btnCare}>
                                    <Image source={item.src} style={styles.boxImg} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 15 }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>{item.text1}</Text>
                                        <Text>{item.text2}</Text>
                                    </View>
                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#dc2b8b', width: 100, height: 40, borderRadius: 10 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.textBtn}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.key}
                        style={{ marginTop: 10 }}
                    />

                </View>

                <View style={{ marginTop: 5, marginBottom: 5 }}>
                    <Text style={styles.lblLeft}>Ưu đãi mới</Text>

                </View>
            
                <FlatList
                    //key={'#'}
                    data={boxUudai}
                    numColumns={2}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.btnOffers}>
                            <Image source={item.src} style={styles.imgOffers}></Image>
                            <Text style={styles.txtOffers}>{item.text1}</Text>
                            <Text style={styles.text2}>{item.text2}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.key}
                    style={{ paddingHorizontal: 25 }}
                />
                <View style={{marginVertical: 40, flexDirection: 'row', alignItems: 'center', marginLeft: 25}}>
                    <Image source={require('../imgs/icon/protect.png')} style={{width: 30, height: 30}}></Image>
                    <Text style={{color: 'gray'}}>Ưu tiên hàng đầu của MoMo là an toàn bảo mật</Text>
                </View>
            </ScrollView>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 40
       
    },
    header: {
        width: '100%',
        height: 100,
        //backgroundColor: '#325340',
        //paddingBottom: 20
    },
    header1: {
        width: '100%',
        height: '65%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#325340',
        
    },
   
    icon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'center',
    },
    iconButton: {
        width: 85,
        height: 80,
        alignItems: 'center',
        margin: 5,
        marginBottom: 15
    },
    imgIcon: {
        width: 45,
        height: 45
    },
    txtIcon: {
        textAlign: 'center',
        marginTop: 3,
        fontSize: 11.5
    },
    
    horizontalSroll: {
        flexDirection: 'row',
        paddingHorizontal: 7,
        paddingVertical: 15
    },
    item: {
        width: 100
    },
    lblLeft: {
        fontSize: 20,
        paddingLeft: 10
    },
    boxCare: {
        width: 350,
        height: 250,
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 8,
        marginBottom: 10

    },
    boxImg: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    btnCare: {
        width: '100%',
        height: '80%',
    },
    offers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,

    },
    imgOffers: {
        width: 176,
        height: 180,
        borderRadius: 15

    },
    txtOffers: {
        width: 176,
        textAlign: 'left',
        color: 'black'
    },
    btnOffers: {
        marginRight: 10,
        paddingVertical: 10
    },
    text2: {
        fontSize: 12,
        color: 'gray'
    },
    header2: {
        height: '35%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        elevation: 6,
        
    }
});