import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView ,StyleSheet,Dimensions} from 'react-native';
import DataItem from './DataItem'; // Import DataItem component
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default function Category ({ item ,navigation}) { 
  const renderDataItem = ({ item: dataItem ,navigation}) => (
    <DataItem dataItem={dataItem} navigation={navigation} />
  );
  return (
  <View style={[styles.kh_male_container]}>
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <Image source={require('../imgs/icon/hoa-dao.jpg')} style={{ height: '100%', resizeMode: 'contain' }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: -15 }}>{item.type}</Text>
      <Image source={require('../imgs/icon/arrow.png')} style={{ height: '100%', resizeMode: 'contain' }} />
    </View>
    <View>
      <FlatList
        data={item.data}
        keyExtractor={(dataItem) => dataItem.id.toString()}
        horizontal

        renderItem={
          ({ item: dataItem }) => (
            <DataItem dataItem={dataItem} navigation={navigation} />
          )
        }

       
      />
    </View>
  </View>
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
     width:'100%'
  
    },
    header:{
      width:'100%',
      backgroundColor: 'white',
      justifyContent:'flex-start',
      alignItems:'center',
      height:180,
      
    
    },
    wrap: {    width: '100%',
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
    input_search:{
      position: 'absolute',
      top: '15%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      paddingHorizontal: 10,
      width: '90%',  
      zIndex: 1,
      backgroundColor:'#fff',    
      borderRadius:20
    },
    body:{
    flex:1,
      width:'100%',    
      alignItems:'center',
      justifyContent:'flex-start',
      
      height:'30%'
  
    },
    gift_container:{
      width:'90%',height:70,
      marginTop:-30,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      
     
      
    },
    gift_code_input:{
      width:'50%',
      height:'80%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff',
      borderRadius:5,
      borderWidth:1,
      borderColor:'#888',
      borderBottomColor:'gray',
      borderBottomWidth:5,
      borderRadius:15
    },
    gift_icon:{
      width:'20%',
      height:'100%',
      resizeMode:'contain'
    },
    gift_text_container:{
      width:'80%',
      height:'100%',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'flex-start',
      
    },
    menu_category:{
      marginTop:-5,
      width:'90%',
      height:100,
      alignItems:'space-between',
      justifyContent:'center',
  
      
    },
    menu_item:{
      width:60,
      height:60,
      marginLeft:10
      
    },
    menu_icon:{
      width:'100%',
      height:'80%',
      resizeMode:'contain'
    },
    container_type:{
      width:'100%',
      height:HEIGHT*0.45,
      backgroundImage:require('../imgs/image/background.jpg'),
      justifyContent:'space-evenly',
      alignItems:'center'
    },
    container_type_gift:{
      width:'100%',
      height:HEIGHT*0.4
      
    },
    main_event:{
      width:'100%',
      height:550,
      borderWidth:1,
      backgroundImage:require('../imgs/image/background.jpg')
    },
    kh_data_container:{
      width:'100%',
      position:'absolute',
      top:'30%',
     
    },
    kh_male_container:{
      width:'100%',
    },
    
    data_item:{
      width:WIDTH*0.4,
      height:HEIGHT*0.3,
      backgroundColor:'#ffffff',
      margin:5,
      marginTop:0,
      borderRadius:20,
      justifyContent:'flex-start',
      alignItems:'center',
      paddingHorizontal:1,
      paddingBottom:30
      
    },
    
    image_data:{
      width:'100%',
      height:'70%',
      resizeMode:'contain',
      borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
      borderRadius:20
     
    },
   
    
  });

