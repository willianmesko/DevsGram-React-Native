import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class FeedItemFake extends Component {

   render() {
      return (
         <View style={styles.feedContainer}>
            <View style={styles.feedHeader}>
               <View style={styles.avatar}></View>
               <View style={styles.userName}></View>
               <View style={styles.dateArea}>
                  <View style={styles.postDate}></View>
               </View>
            </View>
            <View style={styles.feedBody}></View>
         </View>
      );
   }

}

const styles = StyleSheet.create({
   feedContainer: {
      width: '100%',
      height: 300
   },
   feedHeader: {
      height: 70,
      flexDirection: 'row',
      alignItems: 'center'
   },
   avatar: {
      width: 40,
      height: 40,
      backgroundColor: '#CCCCCC',
      marginLeft: 10,
      marginRight: 15,
      borderRadius: 20
   },
   userName: {
      width: 150,
      height: 15,
      backgroundColor: '#CCCCCC',
      borderRadius: 5
   },
   dateArea: {
      flex: 1,
      alignItems: 'flex-end',
      borderRadius: 5
   },
   postDate: {
      width: 80,
      height: 15,
      backgroundColor: '#CCCCCC',
      marginRight: 10,
      borderRadius: 5
   },
   feedBody: {
      flex: 1,
      backgroundColor: '#CCCCCC'
   }
});