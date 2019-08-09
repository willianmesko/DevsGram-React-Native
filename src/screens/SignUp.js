import React, { Component } from 'react';
import { TextInput, TouchableHighlight, ImageBackground, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { checkLogin, registerNewUser, changeName, changeEmail, changePassword } from '../actions/AuthActions'

export class SignUp extends Component {
   static navigationOptions = {
      title: 'SignUp',
      header: null
   }

   constructor(props) {
      super(props)
      this.state = {}
   }

   signInAction = () => {
      this.props.navigation.goBack();
   }

   registerAction = () => {
      this.props.registerNewUser(
         this.props.name,
         this.props.email,
         this.props.password
      );
   }

   ComponentDidUpdate() {
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

            <TextInput value={this.props.name} onChangeText={this.props.changeName} style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#ffffff" underlineColorAndroid="transparent" />
            <TextInput value={this.props.email} onChangeText={this.props.changeEmail} style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#ffffff" underlineColorAndroid="transparent" />
            <TextInput value={this.props.password} onChangeText={this.props.changePassword} style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#ffffff" secureTextEntry={true} underlineColorAndroid="transparent" />

            <TouchableHighlight onPress={this.registerAction} underlayColor="#307eaf" style={styles.actionButton}>
               <Text style={styles.actionButtonText}>Fazer Cadastro</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.signInAction} underlayColor="transparent" style={styles.signButton}>
               <Text style={styles.signButtonText}>Já tem cadastro? Clique aqui</Text>
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
   logo: {
      fontSize: 45,
      color: '#ffffff',
      marginBottom: 20
   },
   input: {
      width: "90%",
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 10,
      color: '#ffffff',
      fontSize: 18,
      marginBottom: 12,
   },
   actionButton: {
      width: "40%",
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
   },
   actionButtonText: {
      color: '#ffffff',
      fontSize: 16
   },
   signButton: {
      width: "90%",
      height: 50,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
   },
   signButtonText: {
      color: '#ffffff',
      fontSize: 14
   }
});

const mapStateToProps = (state) => {
   return {
      status: state.auth.status,
      name: state.auth.name,
      email: state.auth.email,
      password: state.auth.password
   };
}

const SignUpConnect = connect(mapStateToProps, { checkLogin, registerNewUser, changeName, changeEmail, changePassword })(SignUp);
export default SignUpConnect;
