import React, { Component } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions'
import EffectItem from '../components/Camera/EffectItem';

export class PhotoCameraEffects extends Component {
   static navigationOptions = ({navigation}) => {
      return{
         title: 'Efeitos',
         headerRight:(
            <Button 
            title="Enviar" 
            onPress={navigation.getParam('sendPhoto')}
            />
         ),
         headerRightContainerStyle:{
            marginRight: 10
         }
      }
   } 

   constructor(props) {
      super(props)
      this.state = {
         effects:[
            {title:'Normal', ref:'clear'},
            {title:'Brilhoso', ref:'bright'},
            {title:'Escuro', ref:'dark'},
            {title:'Efeito 1', ref:'e1'},
            {title:'Efeito 2', ref:'e2'},
            {title:'Efeito 3', ref:'e3'},
         ],
         selectedEffect: 'clear'
      }
   }

   componentDidMount() {
      this.props.navigation.setParams({sendPhoto: this.sendPhoto});
   };
   
   sendPhoto = () => {
      alert("Enviando...")
   }

   render() {

      let cameraWidth = Dimensions.get('window').width;

      return (
         <View style={styles.container}>
            <View style={{overflow: 'hidden', width: cameraWidth, height: cameraWidth }} >
               <Image style={styles.photoImage} source={{uri: this.props.photoSelected}}/>
            </View>
            <View style={styles.effectsArea}>
               <ScrollView style={styles.effectsScroll} horizontal={true}>
                  {this.state.effects.map((data)=>{
                     return(
                        <EffectItem title={data.title} ref={data.ref} />
                     )
                  })}
               </ScrollView>
            </View>
         </View>
      );
   }

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#000000'
   },
   photoImage:{
      flex: 1
   },
   effectsArea:{
      flex: 1
   },
   effectsScroll:{
      flex: 1
   },
   headerButton:{
      
   }
});

const mapStateToProps = (state) => {
   return {
      status: state.auth.status,
      photoSelected: state.camera.photoSelected
   };
}

const PhotoCameraEffectsConnect = connect(mapStateToProps, { checkLogin })(PhotoCameraEffects);
export default PhotoCameraEffectsConnect;
