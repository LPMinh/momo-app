import { StatusBar } from 'expo-status-bar';
import Home from './src/views/Home';
import Discount from './src/views/Discounts';
import Me from './src/views/Me';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllService from './src/views/AllService';
import React, { createContext, useContext, useState } from 'react';
import { Image } from 'react-native';
import Login1 from './src/views/Login1';
import Login2 from './src/views/Login2';
import Detail from './src/views/Detail';
import MyGift from './src/views/MyGift';
import ChuyenTien from './src/views/ChuyenTien';
import ChuyenTien2 from './src/views/ChuyenTien2';
import ChuyenTien3 from './src/views/ChuyenTien3';
import Success from './src/views/Success';
import Lsgd from './src/views/Lsgd';
import Fail from './src/views/Fail';
import ChiTietgd from './src/views/ChiTietgd';




const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export const Context = createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  )
}
function MyTab() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#99116f',
      tabBarLabelStyle: {
        fontSize: 15
      },
      tabBarStyle: {
        paddingVertical: 10
      }
    }}>
      <Tab.Screen name='MoMo' component={Home} options={{
        tabBarIcon: ({ focused }) => {
          const iconSource = focused ? require('./src/imgs/icon/momo.png') : require('./src/imgs/icon/momo-unfocus.png')
          return (
            <Image source={iconSource}
              style={{ width: 30, height: 30 }} />
          )
        }
      }}></Tab.Screen>
      <Tab.Screen name='discount' 
    
      component={Discount} options={{
        unmountOnBlur: true,
        title: 'Ưu đãi',
        tabBarIcon: ({ focused }) => {
          const iconSource = focused ? require('./src/imgs/icon/uudaifocus.png') : require('./src/imgs/icon/uu-dai.png')
          return (
            <Image source={iconSource}
              style={{ width: 30, height: 30 }} />
          )
        },
      
      }}></Tab.Screen>
      <Tab.Screen name='Lịch sử GD' component={Lsgd} options={{
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => {
          const iconSource = focused ? require('./src/imgs/icon/lsgdfocus.png') : require('./src/imgs/icon/lich-su-gd.png')
          return (
            <Image source={iconSource}
              style={{ width: 30, height: 30 }} />
          )
        }
      }}></Tab.Screen>
      <Tab.Screen name='Cộng đồng' component={AllService} options={{
        tabBarIcon: ({ focused }) => {
          const iconSource = focused ? require('./src/imgs/icon/congdongfocus.png') : require('./src/imgs/icon/cong-dong.png')
          return (
            <Image source={iconSource}
              style={{ width: 30, height: 30 }} />
          )
        }
      }}></Tab.Screen>
      <Tab.Screen name='Tôi' component={Me} options={{
        tabBarIcon: ({ focused }) => {
          const iconSource = focused ? require('./src/imgs/icon/toifocus.png') : require('./src/imgs/icon/toi.png')
          return (
            <Image source={iconSource}
              style={{ width: 30, height: 30 }} />
          )
        }
      }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login1' component={Login1} />
          <Stack.Screen name='Login2' component={Login2} />
          <Stack.Screen name="HomeScreen" component={MyTab} />

          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name='ChuyenTien' component={ChuyenTien} />
          <Stack.Screen name='ChuyenTien2' component={ChuyenTien2} />
          <Stack.Screen name='ChuyenTien3' component={ChuyenTien3} />
          <Stack.Screen name='Success' component={Success} />
          <Stack.Screen name='Fail' component={Fail} />
          <Stack.Screen name='ctgd' component={ChiTietgd} />
          <Stack.Screen name="AllService" component={AllService} />
          <Stack.Screen name="MyGift" component={MyGift} />
        </Stack.Navigator>

      </NavigationContainer>
    </MyProvider>
  );
}
