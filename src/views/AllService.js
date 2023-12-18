import { useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const menu = [
    { key: 1, value: 'Bạn vừa xem' },
    { key: 2, value: 'Dịch vụ phổ biến' },
    { key: 3, value: 'Chuyển nhận tiền' },
    { key: 4, value: 'Thanh toán hóa đơn' },
    { key: 5, value: 'Tiện ích viễn thông' },
    { key: 6, value: 'Tài chính - Bảo hiểm' },
    { key: 7, value: 'Thanh toán liên kiết' },
    { key: 8, value: 'Du lịch' },
    { key: 9, value: 'Giải trí' },
    { key: 10, value: 'Sống tốt cùng MoMo' },
    { key: 11, value: 'Dịch vụ đối tác' },
    { key: 12, value: 'Dịch vụ y tế' },
    { key: 13, value: 'Giao thông vận tải' },
    { key: 14, value: 'Dịch vụ khác' }
];




export default function AllService({ navigation, route }) {
    const { data, data_view } = route.params;
    const [isEdit, setIsEdit] = useState(false);
    const [data_new, setData_new] = useState(data);
    
    
    data_new.pop();
    data_new.push({ key: 12, src: require('../imgs/icon/luu-danh-sach.png'), text: 'Lưu danh sách' })
    const flatListRef = useRef(null);
    const [selectedId, setSelectedId] = useState(1);
    const scrollToComponent = (index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };
    const DATA = [
        {
            title: 'Bạn vừa xem',
            data: data_view
        },
        {
            title: 'Dịch vụ phổ biến',
            data: [
                { key: 1, src: require('../imgs/icon/chuyen-tien.png'), text: 'Chuyển tiền' },
                // { key: 2, src: require('../imgs/icon/chuyen-tien-2.png'), text: 'Chuyển tiền ngân hàng' },
                { key: 4, src: require('../imgs/icon/nap-tien-dien-thoai.png'), text: 'Nạp tiền điện thoại' },
                { key: 5, src: require('../imgs/icon/data-3g-4g.png'), text: 'Data 3G/4G' },
                { key: 3, src: require('../imgs/icon/thanh-toan-hoa-don.png'), text: 'Thanh toán hóa đơn' },
                { key: 13, src: require('../imgs/icon/mua-ma-the-di-dong.png'), text: 'Mua mã thẻ di động' },
                { key: 14, src: require('../imgs/icon/thanh-toan-khoan-vay.png'), text: 'Thanh toán khoản vay' },
                { key: 15, src: require('../imgs/icon/du-lich-di-lai.png'), text: 'Du lịch - Đi lại' },
                { key: 16, src: require('../imgs/icon/li-xi.png'), text: 'Lì xì' },
                { key: 17, src: require('../imgs/icon/ve-xem-phim.png'), text: 'Mua vé xem phim' },
                { key: 6, src: require('../imgs/icon/tui-than-tai.png'), text: 'Túi thần tài' },
                // { key: 7, src: require('../imgs/icon/vi-tra-sau.png'), text: 'Ví trả sau' },
                // { key: 8, src: require('../imgs/icon/ve-tau-hoa.png'), text: 'Vé tàu hỏa' },
                // { key: 9, src: require('../imgs/icon/ve-may-bay.png'), text: 'Vé máy bay' },
                // { key: 10, src: require('../imgs/icon/tiet-kiem-onl.png'), text: 'Tiết kiệm Online' },
                // { key: 11, src: require('../imgs/icon/ve-xe-khach.png'), text: 'Vé xe khách' },
            ]

        },
        {
            title: 'Chuyển nhận tiền',
            data: [
                { key: 1, src: require('../imgs/icon/chuyen-tien.png'), text: 'Chuyển tiền' },
                { key: 2, src: require('../imgs/icon/chuyen-tien-2.png'), text: 'Chuyển tiền ngân hàng' },
                { key: 18, src: require('../imgs/icon/chia-tien.png'), text: 'Chia tiền' },
                { key: 19, src: require('../imgs/icon/nhac-tra-tien.png'), text: 'Nhắc trả tiền' },
                { key: 16, src: require('../imgs/icon/li-xi.png'), text: 'Lì xì' },
                { key: 20, src: require('../imgs/icon/link-nhan-tien.png'), text: 'Link nhận tiền' },
                { key: 21, src: require('../imgs/icon/quy-nhom.png'), text: 'Quỹ nhóm' },
            ]
        },
        {
            title: 'Thanh toán hóa đơn',
            data: [
                { key: 22, src: require('../imgs/icon/thanh-toan-dien.png'), text: 'Thanh toán điện' },
                { key: 23, src: require('../imgs/icon/thanh-toan-nuoc.png'), text: 'Thanh toán nước' },
                { key: 24, src: require('../imgs/icon/thanh-toan-internet.png'), text: 'Thanh toán internet' },
                { key: 25, src: require('../imgs/icon/thanh-toan-truyen-hinh.png'), text: 'Thanh toán truyền hình' },
                { key: 26, src: require('../imgs/icon/dien-thoai-co-dinh.png'), text: 'Điện thoại cố định' },
                { key: 27, src: require('../imgs/icon/di-dong-tra-sau.png'), text: 'Di động trả sau' },
                { key: 28, src: require('../imgs/icon/chung-cu.png'), text: 'Chung cư' },
                { key: 29, src: require('../imgs/icon/thanh-toan-hoc-phi.png'), text: 'Thanh toán học phí' },
                { key: 30, src: require('../imgs/icon/dich-vu-cong.png'), text: 'Dịch vụ công' },
                { key: 31, src: require('../imgs/icon/ve-sinh-moi-truong.png'), text: 'Vệ sinh môi trường' },
                { key: 32, src: require('../imgs/icon/hoa-don-khac.png'), text: 'Hóa đơn khác' },
                { key: 3, src: require('../imgs/icon/thanh-toan-hoa-don.png'), text: 'Thanh toán hóa đơn' },
            ]
        },
        {
            title: 'Tiện ích viễn thông',
            data: [
                { key: 33, src: require('../imgs/icon/moi-ban-san-thuong.png'), text: 'Mời bạn - Săn thưởng' },
                { key: 34, src: require('../imgs/icon/mua-sim-chinh-chu.png'), text: 'Mua sim chính chủ' },
                { key: 4, src: require('../imgs/icon/nap-tien-dien-thoai.png'), text: 'Nạp tiền điện thoại' },
                { key: 13, src: require('../imgs/icon/mua-ma-the-di-dong.png'), text: 'Mua mã thẻ di động' },
                { key: 5, src: require('../imgs/icon/data-3g-4g.png'), text: 'Data 3G/4G' },
                { key: 35, src: require('../imgs/icon/goi-cuoc-combo.png'), text: 'Gói cước combo' },
            ]
        },
        {
            title: 'Tài chính - Bảo hiểm',
            data: [
                { key: 36, src: require('../imgs/icon/moi-ban-nhan-thuong.png'), text: 'Mời bạn - Nhận thưởng' },
                { key: 14, src: require('../imgs/icon/thanh-toan-khoan-vay.png'), text: 'Thanh toán khoản vay' },
                { key: 35, src: require('../imgs/icon/thanh-toan-phi-bao-hiem.png'), text: 'Thanh toán phí bảo hiểm' },
                { key: 36, src: require('../imgs/icon/bao-hiem.png'), text: 'Bảo hiểm' },
                { key: 37, src: require('../imgs/icon/san-dau-tu.png'), text: 'Sàn đầu tư' },
                { key: 6, src: require('../imgs/icon/tui-than-tai.png'), text: 'Túi thần tài' },
                { key: 7, src: require('../imgs/icon/vi-tra-sau.png'), text: 'Ví trả sau' },
                { key: 38, src: require('../imgs/icon/chung-chi-quy.png'), text: 'Chứng chỉ quỹ' },
                { key: 39, src: require('../imgs/icon/tiet-kiem-onl.png'), text: 'Tiết kiệm Online' },
                { key: 40, src: require('../imgs/icon/mo-the-tin-dung.png'), text: 'Mở thẻ tín dụng' },
                { key: 41, src: require('../imgs/icon/thanh-toan-the-tin-dung.png'), text: 'Thanh toán thẻ tín dụng' },
                { key: 42, src: require('../imgs/icon/vay-nhanh.png'), text: 'Vay nhanh' },
                { key: 43, src: require('../imgs/icon/bao-hiem-xe-may.png'), text: 'Bảo hiểm xe máy bắt buộc' },
                { key: 44, src: require('../imgs/icon/tiem-vang-onl.png'), text: 'Tiệm vàng Online' },
                { key: 45, src: require('../imgs/icon/nhan-tien-quoc-te.png'), text: 'Nhận tiền Quốc tế' },
                { key: 46, src: require('../imgs/icon/tra-gop-filk.png'), text: 'Trả góp Filk' },
                { key: 47, src: require('../imgs/icon/vay-nhanh-chu-shop.png'), text: 'Vay Nhanh Chủ Shop Online' },
                { key: 48, src: require('../imgs/icon/vay-nhanh-chu-ho-kinh-doanh.png'), text: 'Vay Nhanh - Chủ Hộ Kinh Doanh' },
                { key: 49, src: require('../imgs/icon/tra-gop-san-pham-apple.png'), text: 'Trả góp sản phẩm apple' },
                { key: 50, src: require('../imgs/icon/quan-ly-chi-tieu.png'), text: 'Quản lý chi tiêu' }

            ]
        },
        {
            title: 'Thanh toán liên kết',
            data: [
                { key: 51, src: require('../imgs/icon/ch-play.png'), text: 'Thanh toán Google Play' },
                { key: 52, src: require('../imgs/icon/bae-min.png'), text: 'Đặt đồ ăn online' },
                { key: 53, src: require('../imgs/icon/be.png'), text: 'Be Group' },
                { key: 54, src: require('../imgs/icon/gojek.png'), text: 'Gojek' },
                { key: 55, src: require('../imgs/icon/xem-phim-onl.png'), text: 'Xem phim Online' },
                { key: 56, src: require('../imgs/icon/diem-thanh-toan.png'), text: 'Điểm thanh toán MoMo' },
                { key: 57, src: require('../imgs/icon/diem-nap-rut.png'), text: 'Điểm Nạp/Rút' },
            ]
        },
        {
            title: 'Du lịch',
            data: [
                { key: 9, src: require('../imgs/icon/ve-may-bay.png'), text: 'Vé máy bay' },
                { key: 8, src: require('../imgs/icon/ve-tau-hoa.png'), text: 'Vé tàu hỏa' },
                { key: 11, src: require('../imgs/icon/ve-xe-khach.png'), text: 'Vé xe khách' },
                { key: 58, src: require('../imgs/icon/khach-san-theo-gio.png'), text: 'Khách sạn theo giờ' },
                { key: 59, src: require('../imgs/icon/ve-khu-vui-choi.png'), text: 'Vé khu vui chơi' },
                { key: 60, src: require('../imgs/icon/thue-xe.png'), text: 'Thuê xe' },
                { key: 11, src: require('../imgs/icon/ve-xe-khach.png'), text: 'Vé xe khách' },
                { key: 15, src: require('../imgs/icon/du-lich-di-lai.png'), text: 'Du lịch - Đi lại' },

            ]
        },
        {
            title: 'Giải trí',
            data: [
                { key: 76, src: require('../imgs/icon/mua-ve-xem-phim-2.png'), text: 'Mua vé xem phim' },
                { key: 77, src: require('../imgs/icon/vietlott.png'), text: 'Mua hộ vé số Vietlott' },
                { key: 78, src: require('../imgs/icon/fpt.png'), text: 'FPT Play' },
                { key: 79, src: require('../imgs/icon/k+.png'), text: 'Mua gói truyền hình số vệ tinh K+' },
                { key: 80, src: require('../imgs/icon/ket-qua-xo-so.png'), text: 'Kết quả sổ xố' },

            ]
        },
        {
            title: 'Sống tốt cùng MoMo',
            data: [
                { key: 61, src: require('../imgs/icon/di-bo-cung-momo.png'), text: 'Đi bộ cùng MoMo' },
                { key: 62, src: require('../imgs/icon/heo-dat-momo.png'), text: 'Heo Đất MoMo' },
                { key: 63, src: require('../imgs/icon/phat-tam-cong-duc.png'), text: 'Phát tâm công đức' },
                { key: 64, src: require('../imgs/icon/vi-nhan-ai.png'), text: 'Ví Nhân Ái' },
                { key: 65, src: require('../imgs/icon/truong-hoc-heo-dat.png'), text: 'Trường học Heo Đất' },
            ]
        },
        {
            title: 'Dịch vụ đối tác',
            data: [
                { key: 66, src: require('../imgs/icon/mini-app.png'), text: 'Mini App' },
                { key: 67, src: require('../imgs/icon/7-eleven.png'), text: '7-Eleven' },
                { key: 68, src: require('../imgs/icon/highlands-coffe.png'), text: 'Highlands Coffee' },
                { key: 69, src: require('../imgs/icon/the-coffe-house.png'), text: 'The Coffee House' },
                { key: 70, src: require('../imgs/icon/domino-pizza.png'), text: "Domino's Pizza" },
                { key: 71, src: require('../imgs/icon/gofood-by-gojek.png'), text: 'GoFood by Gojek' },
                { key: 72, src: require('../imgs/icon/pizza-hut.png'), text: 'Pizza Hut' },
                { key: 73, src: require('../imgs/icon/kfc.png'), text: 'KFC Viet Nam' },
                { key: 74, src: require('../imgs/icon/ahamove.png'), text: 'Giao hàng Ahamove' },
                { key: 75, src: require('../imgs/icon/pizza4p.png'), text: "Pizza 4P's" },
            ]
        },
        {
            title: 'Dịch vụ y tế',
            data: [
                { key: 81, src: require('../imgs/icon/y-te-va-lam-dep.png'), text: 'Dịch vụ y tế và làm đẹp' },
                { key: 82, src: require('../imgs/icon/xet-nghiem-tai-nha.png'), text: 'Xét nghiệm tại nhà' },
                { key: 83, src: require('../imgs/icon/dat-lich-kham.png'), text: 'Đặt lịch khám' },
                { key: 84, src: require('../imgs/icon/thanh-toan-vien-phi.png'), text: 'Thanh toán viện phí' },
                { key: 85, src: require('../imgs/icon/booking-care.png'), text: 'BookingCare' },
                { key: 86, src: require('../imgs/icon/thuoc-nhanh.png'), text: 'Thuốc nhanh 24/7' },
                { key: 87, src: require('../imgs/icon/cham-soc-suc-khoe-doctor.png'), text: 'Chăm sóc sức khỏe Doctor...' },
            ]
        },
        {
            title: 'Giao thông vận tải',
            data: [
                { key: 88, src: require('../imgs/icon/thu-phi-khong-dung-etc.png'), text: 'Thu phí không dừng ETC' },
                { key: 89, src: require('../imgs/icon/cu-ho-giao-thong.png'), text: 'Cứu hộ giao thông' },
                { key: 90, src: require('../imgs/icon/nap-tien-tai-xe-grabcar.png'), text: 'Nạp tiền tài xế GrabCar' },
                { key: 91, src: require('../imgs/icon/nap-tien-tai-xe-grabcar.png'), text: 'Nạp tiền tài xế GrabBike' },
                { key: 92, src: require('../imgs/icon/nap-tien-tai-xe-goride.png'), text: 'Nạp tiền tài xế GoRide' },
                { key: 93, src: require('../imgs/icon/nap-tien-tai-xe-grabcar.png'), text: 'Nạp tiền tài xế AhaMove' },
                { key: 94, src: require('../imgs/icon/nap-vinasun-tra-truoc.png'), text: 'Nạp Vinasun trả trước' },
                { key: 95, src: require('../imgs/icon/nap-tien-tai-xe-gocar.png'), text: 'Nạp tiền tài xế GoCar' },

            ]
        },
        {
            title: 'Dịch vụ khác',
            data: [
                { key: 96, src: require('../imgs/icon/tho-dia-momo.png'), text: 'Thổ địa MoMo' },
                { key: 97, src: require('../imgs/icon/doi-tac-momo.png'), text: 'Đối tác MoMo' },
            ]
        }
    ];
    const xoaData = (item) => {
        const index = data.indexOf(item);
        data[index] = {}
        // setData(data);
        console.log(data)
    }   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    data_new.pop();
                    data_new.push({ key: 12, src: require('../imgs/icon/all.png'), text: 'Tất cả dịch vụ' }); 
                    navigation.goBack()
                    }} style={styles.btn_back}> 
                    <Image source={require('../imgs/icon/left.png')} style={{width: 20, height: 20}}></Image>
                </TouchableOpacity>
                <View style={styles.search_view}>
                    <Image source={require('../imgs/icon/kinh-lup.png')} style={{ width: 25, height: 25 }}></Image>
                    <TextInput placeholder="Tìm kiếm dịch vụ" style={{ width: '80%', padding: 5 }} placeholderTextColor={'gray'}></TextInput>
                </View>
            </View>
            <View style={{ backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Dịch vụ được ghim</Text>
                        <Text style={{ color: 'gray', marginTop: 5 }}>Cố định dịch vụ thường dùng</Text>
                    </View>
                    <TouchableOpacity style={styles.btn_header} onPress={() => {setIsEdit(!isEdit)}}>
                        <Text style={{ fontWeight: 'bold' }}>{isEdit ? 'Thu gọn' : 'Chỉnh sửa'}</Text>
                        <Image source={isEdit?require('../imgs/icon/top.png'):require('../imgs/icon/bottom.png')} style={{width: 10, height: 10, marginTop: 5}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ display: isEdit ? 'flex' : 'none' }}>
                    <FlatList
                        data={data_new}
                        numColumns={4}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {
                                        (item.key > 5 && item.key != 12) ?
                                    (
                                    <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => {xoaData(item)}}>
                                        <Image source={require('../imgs/icon/xoa.png')} style={{ width: 20, height: 20 }}></Image>
                                    </TouchableOpacity>
                                    ) : null
                                    }

                                    <TouchableOpacity style={styles.iconButton}>
                                        <Image source={item.src} style={styles.imgIcon}></Image>
                                        <Text style={styles.txtIcon}>{item.text}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>

                <FlatList
                    ref={flatListRef}
                    horizontal={true}
                    data={menu}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const backgroundColor = item.key === selectedId ? '#fff7fa' : '#f0f0f0';
                        const color = item.key === selectedId ? '#c55696' : 'black';
                        const borderColor = item.key === selectedId ? '#e493bb' : '';
                        const borderWidth = item.key === selectedId ? 3 : 0;
                        const fontWeight = item.key === selectedId ? 'bold' : '';
                        return (
                            <TouchableOpacity onPress={() => { setSelectedId(item.key); scrollToComponent(item.key - 1) }} style={[{
                                backgroundColor: backgroundColor,
                                borderColor: borderColor, borderWidth: borderWidth
                            }, styles.btn_menu]}>
                                <Text style={{ color: color, fontSize: 16, fontWeight: fontWeight }}>{item.value}</Text>
                            </TouchableOpacity>
                        )
                    }
                    }
                    keyExtractor={(item) => item.key}
                />
            </View>
            <FlatList
                data={DATA}
                ref={flatListRef}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: '#fff', marginBottom: 10, paddingTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 10 }}>{item.title}</Text>
                        <FlatList
                            data={item.data}
                            numColumns={4}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        {isEdit ? data.find(i => JSON.stringify(i) === JSON.stringify(item)) ? (
                                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }}>
                                            <Image source={require('../imgs/icon/tich.png')} style={{ width: 20, height: 20 }}></Image>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }}>
                                            <Image source={require('../imgs/icon/add.png')} style={{ width: 20, height: 20 }}></Image>
                                            </TouchableOpacity>
                                        ) : null}
                                        
                                        <TouchableOpacity style={styles.iconButton}>
                                            <Image source={item.src} style={styles.imgIcon}></Image>
                                            <Text style={styles.txtIcon}>{item.text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}

                        />
                    </View>
                )}
            />


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
        backgroundColor: '#ea6ca9',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    search_view: {
        flexDirection: 'row',
        width: '80%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btn_header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 120,
        height: 40,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 5,
        paddingHorizontal: 15
    },
    btn_menu: {
        width: 'auto',
        height: 35,
        marginRight: 10,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 5

    },
    iconButton: {
        width: 80,
        height: 80,
        alignItems: 'center',
        marginHorizontal: 8,

    },
    imgIcon: {
        width: 40,
        height: 40
    },
    txtIcon: {
        textAlign: 'center',
        marginTop: 3,
        fontSize: 10
    },
    btn_back: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 35,
        height: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})