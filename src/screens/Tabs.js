import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Image } from 'react-native';
import Home from './Home';
import StackExplore from './StackExplore';
import StackCamera from './StackCamera';
import MyProfile from './MyProfile';

const Tabs = createBottomTabNavigator({
   Home:{
      screen:Home,
      navigationOptions:{
         tabBarIcon:(options) => {
            if (options.focused) {
               return(
                  <Image source={require('../assets/home.png')} style={{width:32 , height:32}} />
                  );
            } else {
               return (
                  <Image source={require('../assets/home_off.png')} style={{width:32 , height:32}} />
               );
            }
         }
      }
   },
   Explore:{
      screen: StackExplore,
      navigationOptions: {
         tabBarIcon: (options) => {
            if (options.focused) {
               return (
                  <Image source={require('../assets/search.png')} style={{ width: 32, height: 32 }} />
               );
            } else {
               return (
                  <Image source={require('../assets/search_off.png')} style={{ width: 32, height: 32 }} />
               );
            }
         }
      }
   },
   PhotoCamera:{
      screen:StackCamera,
      navigationOptions: {
         tabBarIcon: (options) => {
            if (options.focused) {
               return (
                  <Image source={require('../assets/camera.png')} style={{ width: 32, height: 32 }} />
               );
            } else {
               return (
                  <Image source={require('../assets/camera_off.png')} style={{ width: 32, height: 32 }} />
               );
            }
         }
      }
   },
   MyProfile:{
      screen: MyProfile,
      navigationOptions: {
         tabBarIcon: (options) => {
            if (options.focused) {
               return (
                  <Image source={require('../assets/profile.png')} style={{ width: 32, height: 32 }} />
               );
            } else {
               return (
                  <Image source={require('../assets/profile_off.png')} style={{ width: 32, height: 32 }} />
               );
            }
         }
      }
   }
}, {
   tabBarOptions:{
      showLabel: false,
      activeBackgroundColor: '#333333',
      inactiveBackgroundColor: '#CCCCCC'
   }
});

const Container = createAppContainer(Tabs);

export default Container;