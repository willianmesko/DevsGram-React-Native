import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PhotoCamera from './PhotoCamera';
import PhotoCameraEffects from './PhotoCameraEffects';
import PhotoCameraGallery from './PhotoCameraGallery';

const StackCamera = createStackNavigator({
   PhotoCamera: {
      screen: PhotoCamera
   },
   PhotoCameraGallery: {
      screen: PhotoCameraGallery
   },
   PhotoCameraEffects: {
      screen: PhotoCameraEffects
   }
},{
   defaultNavigationOptions:{
      headerStyle:{
         backgroundColor: '#000000'
      },
      headerTintColor:'#FFFFFF'
   }
});

const Container = createAppContainer(StackCamera);

export default Container;