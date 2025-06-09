
import { NativeBaseProvider, FormControl, VStack, HStack, Box, Heading, Button, Text,   } from 'native-base';
import React, { useContext, useEffect } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputText from '../components/InputText';
import { Controller, set, useForm } from 'react-hook-form';
import { useTheme } from '../Store';
import { AuthContext } from '../contexts/AuthContext';
import Login from './Login';
import Home from './Home';
import LoadingScreen from './LoadingScreen';

function Switcher(): React.JSX.Element {
  const {useAuth, setLoading} = useContext(AuthContext);
  const {token, loadingAuth, loggedIn} = useAuth();
  // setLoading(false);

  useEffect(()=>{
    console.log("loggedIn, " ,loggedIn)
  },[loggedIn])

   useEffect(()=>{
    console.log("loadingAuth, " ,loadingAuth)
  },[loadingAuth])
  

  return (

    <>
      {loadingAuth?<LoadingScreen/>:loggedIn?<Home/>:<Login/>}
    </>
    
  );
}




export default Switcher;
