import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet, Image, Dimensions } from 'react-native';

let squareWidth = Dimensions.get('window').width / 3;
let photoMargin = 5;


export default class ExploreItem extends Component {
   
   exploreClickEvent = () => {
      this.props.onClick(this.props.data.id);
   }

   render() {
      return (
         <View style={exploreStyle.square}>
            <TouchableHighlight underlayColor="#CCCCCC" style={exploreStyle.square} onPress={this.exploreClickEvent}>
               <Image source={{ uri: this.props.data.url }} resizeMode="cover" style={exploreStyle.photoArea} />
            </TouchableHighlight>
         </View>
      );
   }

}

const exploreStyle = StyleSheet.create({
   square: {
      width: squareWidth,
      height: squareWidth,
   },
   photoArea:{
      width: (squareWidth - (2 * photoMargin)),
      height: (squareWidth - (2 * photoMargin)),
      margin: photoMargin
   }
});
