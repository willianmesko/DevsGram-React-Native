import React, { Component } from 'react';
import { TextInput, TouchableHighlight, ImageBackground, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { checkLogin, signInUser, changeEmail, changePassword } from '../actions/AuthActions'

export class Login extends Component {
   static navigationOptions = {
      title:'Login',
      header: null
   }

   constructor(props) {
      super(props)
      this.state = {}
      
   }

   signUpAction = () => {
      this.props.navigation.navigate('SignUp');
   }

   loginAction = () => {
      this.props.signInUser(this.props.email, this.props.password );
   }
      
   componentDidUpdate() {
      this.verifyStatus();
   }

   verifyStatus = () => {
      if (this.props.status === 1) {
         this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
               NavigationActions.navigate({ routeName: 'Tabs' })
            ]
         }));
      }
   }

   render() {
      return (
         <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
            <Text style={styles.logo}>PhotoSphere</Text>

            <TextInput value={this.props.email} onChangeText={this.props.changeEmail} style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#ffffff" underlineColorAndroid="transparent"/>
            <TextInput value={this.props.password} onChangeText={this.props.changePassword} style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#ffffff" secureTextEntry={true} underlineColorAndroid="transparent"/>
            
            <TouchableHighlight onPress={this.loginAction} underlayColor="#307eaf" style={styles.actionButton}>
               <Text style={styles.actionButtonText}>Fazer Login</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.signUpAction} underlayColor="transparent" style={styles.signButton}>
               <Text style={styles.signButtonText}>Ainda não tem cadastro? Clique aqui</Text>
            </TouchableHighlight>
         
         </ImageBackground>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'contain'
   },
   logo:{
      fontSize: 45,
      color: '#ffffff',
      marginBottom: 35
   },
   input:{
      width: "90%",
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 10,
      color: '#ffffff',
      fontSize:18,
      marginBottom: 12,
   },
   actionButton:{
      width: "40%",
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
   },
   actionButtonText:{
      color:'#ffffff',
      fontSize: 16
   },
   signButton:{
      width: "90%",
      height: 50,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50
   },
   signButtonText:{
      color: '#ffffff',
      fontSize: 14
   }
});

const mapStateToProps = (state) => {
   return {
      status: state.auth.status,
      email: state.auth.email,
      password: state.auth.password
   };
}

const LoginConnect = connect(mapStateToProps, { checkLogin, signInUser, changeEmail, changePassword })(Login);
export default LoginConnect;
