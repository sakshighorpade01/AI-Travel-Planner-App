import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {

  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onSignIn = () => {

    if (!email || !password){
      ToastAndroid.show("Please enter Email and Password",ToastAndroid.LONG)
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        router.replace('/mytrip')
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage,error.code);
       if(errorCode=='auth/invalid-credential'){
        ToastAndroid.show("Invalid Credential",ToastAndroid.LONG)
       }
      });
  }

  return (
    <View style={{
      padding: 25,
      paddingTop: 20,
      backgroundColor: 'white',
      height: '100%'
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 30
      }}>Let's Sign You In</Text>

      <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: 'grey',
        marginTop: 20
      }}>Welcome Back</Text>

      <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: 'grey',
        marginTop: 10
      }}>You've been missed</Text>

      {/* Email */}
      <View style={{
        marginTop: 50
      }}>
        <Text style={{
          fontFamily: 'outfit'
        }}>Email</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => setEmail(value)}
          placeholder='Enter Email'></TextInput>
      </View>

      {/* Password */}
      <View style={{
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit'
        }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder='Enter Password'></TextInput>
      </View>


      {/* Sign in button */}
      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 20,
          padding: 15,
          backgroundColor: 'black',
          borderRadius: 15,
          marginTop: 50

        }}>

        <Text style={{
          color: 'white',
          textAlign: 'center'
        }}>Sign In</Text>
      </TouchableOpacity>



      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => router.replace('auth/sign-up')}
        style={{

          padding: 20,
          padding: 15,
          backgroundColor: 'white',
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1

        }}>

        <Text style={{
          color: 'black',
          textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>


    </View>


  )
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey',
    fontFamily: 'outfit'

  }
})