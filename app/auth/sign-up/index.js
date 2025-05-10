import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {auth} from './../../../configs/FirebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [fullname,setFullName] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  

  const OnCreateAccount = ()=>{

  if(!email || !password || !fullname) 
  {
    ToastAndroid.show('Please enter all details',ToastAndroid.LONG)
    return;
  }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
  });
  }


  return (
    <View
      style={{
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
        marginTop:30

      }}>Create New Account</Text>


      {/* User Full Name */}
      <View style={{
        marginTop: 50
      }}>
        <Text style={{
          fontFamily: 'outfit'
        }}>Full Name</Text>
        <TextInput 
        style={styles.input} 
        placeholder='Enter Full Name'
        onChangeText={(value) =>setFullName(value)}
        ></TextInput>
      </View>

      {/* Email */}
      <View style={{
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit'
        }}>Email</Text>
        <TextInput 
        style={styles.input} 
        placeholder='Enter Email'
        onChangeText={(value) =>setEmail(value)}
        ></TextInput>
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
          placeholder='Enter Password'
          onChangeText={(value) =>setPassword(value)}
          ></TextInput>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity onPress={OnCreateAccount} style={{
        padding: 20,
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 15,
        marginTop: 50

      }}>

        <Text style={{
          color: 'white',
          textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>



      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => router.replace('auth/sign-in')}
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
        }}>Sign In</Text>
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