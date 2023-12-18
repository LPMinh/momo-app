import React from 'react';
import { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MyDiscountContext } from './Discounts';
import { Context } from '../../App';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function DataItem({ dataItem, navigation }) {
  // const  [MyDiscount, setMyDiscount] =useContext(MyContext);
  // console.log(MyDiscount);
  // const handleCheckAvalable = (id) => {
  //  const data=MyDiscount.find((item)=>item.id===id);
  //  return (data===undefined)?false:true;
  // }
  // const [user, setUser] = useContext(Context);
  const { user, setUser } = useContext(Context);
  const {MyDiscount, setMyDiscount} = useContext(MyDiscountContext);
  const handleCheckAvalable = (id) => {
    if (MyDiscount.discounts !== undefined) {
      return MyDiscount.discounts.some((item) => item.id === id);
    }
    return false;
  }

  const addMyDiscount = () => {
    alert('Thêm thành công');
    if (user !== null) {
      var id = user.phoneNumber;
      console.log('MyDiscount before:', MyDiscount);
      if (handleCheckAvalable(dataItem.id) === false) {
       
          const newMyDiscount = { ...MyDiscount};
  
          if (!newMyDiscount.discounts) {
            newMyDiscount.discounts = [];
          }
          newMyDiscount.discounts.push(dataItem);
  
          
       
        fetch("https://6554f19563cafc694fe73d69.mockapi.io/MyDiscount/" + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(MyDiscount),
        }).then(() => {
          setMyDiscount(newMyDiscount);
        })
          .catch((error) => console.error('Error adding note:', error));
      }
      console.log('MyDiscount after:', MyDiscount);
    }
  };







return (
  <TouchableOpacity style={styles.data_item} key={dataItem.id} onPress={() => navigation.navigate('Detail', { 'id': dataItem.id ,'setMyDiscount':setMyDiscount})}>
    <Image source={{ uri: dataItem.image }} style={styles.image_data} />
    <View style={{ width: '100%', height: '40%', paddingLeft: 5 }}>
      <View style={{ flexDirection: 'row', width: '100%', height: '20%', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Image source={{ uri: dataItem.icon }} style={{ width: '10%', height: '80%' }} />
        <Text style={[styles.menu_text, { fontSize: 10, textAlign: 'center', marginLeft: 5, color: 'grey' }]}>{dataItem.name}</Text>
      </View>
      <Text style={{ width: '100%', fontWeight: 'bold', fontSize: 15 }}>{dataItem.title}</Text>
      <Text style={{ width: '100%', fontSize: 14, height: 30 }}>
        {dataItem.des}
      </Text>
      <View style={{ width: '100%', height: 30, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <TouchableOpacity style={{ padding: 5, borderWidth: 1, borderColor: '#eb2d9d', borderRadius: 10, marginRight: 10 }}
          onPress={()=>{
            addMyDiscount({dataItem});
            
          }}>
          <Text style={{ color: '#eb2d9d', fontWeight: 'bold' }}>{handleCheckAvalable(dataItem.id.toString()) === true ? "Dùng ngay" : "Thu thập"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
)};


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
