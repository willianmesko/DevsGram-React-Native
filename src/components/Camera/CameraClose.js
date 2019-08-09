import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet } from 'react-native';

export default class CameraClose extends Component {

   constructor(props) {
      super(props)
      this.state = {}
   }

   closeAction = () => {
      this.props.nav.navigate('Home');
   }

   render() {
      return (
         <TouchableHighlight onPress={this.closeAction} style={styles.container}>
            <Image source={require('../../assets/cancel.png')} style={styles.closeImg} />
         </TouchableHighlight>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      width: 50,
      alignItems: 'center'
   },
   closeImg:{
      width: 42,
      height: 42
   }
});
