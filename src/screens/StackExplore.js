import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Explore from './Explore';
import Profile from './Profile';
import Photo from './Photo';

const StackExplore = createStackNavigator({
   Explore:{
      screen: Explore
   },
   Profile:{
      screen: Profile
   },
   Photo:{
      screen: Photo
   }
});

const ExploreContainer = createAppContainer(StackExplore)
export default ExploreContainer;