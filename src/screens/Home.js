import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Profile from './Profile';
import Feed from './Feed';
import Photo from './Photo';

const Home = createStackNavigator({
   Feed: {
      screen: Feed,
   },
   Profile: {
      screen: Profile,
   },
   Photo: {
      screen: Photo,
   }
},{
   defaultNavigationOptions: {
      headerStyle: {
         backgroundColor: '#4da3d8',
      },
      headerTitleStyle:{
         color:'#FFFFFF',
         flex: 1,
         textAlign:'center'
      }
   }
});

const Container = createAppContainer(Home);

export default Container;