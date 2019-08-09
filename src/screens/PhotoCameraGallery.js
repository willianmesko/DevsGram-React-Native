import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, View, StyleSheet, CameraRoll, Image, Platform, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';
import { setPhotoSelected } from '../actions/CameraActions';


export class PhotoCameraGallery extends Component {
   static navigationOptions = {
      title: 'Galeria'
   }

   constructor(props) {
      super(props)
      this.state = {
         photos:[]
      };

      this.loadPhotos();
   }
   
   loadPhotos = async () => {
      if (await this.requestPermission()) {
         CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos'
         })
            .then((res) => {
               this.setState({ photos: res.edges });
            })
            .catch((err) => {
               alert(err);
            });
      } else {
         this.props.navigation.back();
      }
   }

   requestPermission = async () => {
      if (Platform.OS == 'android') {
         try {
            const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
               {
                  title: 'Cool Photo App Camera Permission',
                  message: 'Cool Photo App needs access to your camera'
               }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               return true;
            } else {
               return false;
            }
         }
         catch (e) {
            this.props.navigation.back();
         }
      } else {
         return true;
      }
   }

   selectPhoto = (key) => {
      if (this.state.photos[key]) {
         let uri = this.state.photos[key].node.image.uri;
         this.props.setPhotoSelected(uri);
         this.props.navigation.navigate('PhotoCameraEffects');
      }
   }
   
   render() {
      return (
         <ScrollView style={styles.container}>
            <View style={styles.photoArea} >
               {this.state.photos.map((obj, key)=>{
                  return (
                     <TouchableHighlight onPress={() => { this.selectPhoto(key) }} >
                        <Image key={key} style={styles.img} source={{uri:obj.node.image.uri}} />
                     </TouchableHighlight>
                  )
               })}
            </View>
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#000000'
   },
   photoArea:{
      flexDirection: 'row',
      flexWrap: 'wrap'
   },
   img:{
      height: 120,
      width: 120
   }
});

const mapStateToProps = (state) => {
   return {
      status: state.auth.status
   };
}

const PhotoCameraGalleryConnect = connect(mapStateToProps, { setPhotoSelected, checkLogin })(PhotoCameraGallery);
export default PhotoCameraGalleryConnect;
