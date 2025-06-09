
import { NativeBaseProvider, VStack, HStack, Box, Heading, Button, } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useAnimatedValue,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputText from '../components/InputText';
import { Controller, set, useForm } from 'react-hook-form';
import { useTheme } from '../Store';
import { AuthContext } from '../contexts/AuthContext';

function Login(): React.JSX.Element {

  const [openAlert, setOpenAlert] = useState(false)

  const isDarkMode = useTheme((state)=> state.isDarkMode)
  const colorScheme = useTheme((state)=> state.colorScheme)

  const {control, handleSubmit, formState:{errors}} = useForm()
  const backgroundStyle = {
    backgroundColor: (isDarkMode)?"#363636":"#b3b3b3"
  };
  const maxHeight = Dimensions.get('window').height
  const maxWidth = Dimensions.get('window').width;
  const {SignIn, message, setMessage} = useContext(AuthContext)

  const slideAnim = useAnimatedValue(-100)

  const slideDown = ()=>{
    Animated.timing(slideAnim, {
      toValue:-40,
      duration: 1000,
      useNativeDriver:false
    }).start()
  }

  const slideUp = ()=>{
    Animated.timing(slideAnim, {
      toValue:-100,
      duration: 1000,
      useNativeDriver:false
    }).start(()=>{
      setMessage("")
    })
  }

  const messagePanel = <Animated.View style={{
    position:'absolute',
    alignSelf:'center',
    backgroundColor:isDarkMode?'#dfdfdf':'#b4b4b4',
    top:slideAnim,
    minWidth:100,
    maxWidth: maxWidth * 0.6,
    padding:10,
    borderRadius:10,
    paddingTop:40

  }}>
    <Text style={{alignSelf:"center", color:'red', fontWeight:'bold', letterSpacing:2, fontSize:18,}}>{message}</Text>

  </Animated.View>

  function handleSlideMessage(){
    slideDown()
    setTimeout(() => {
      slideUp()
    }, 10000);
  }

  useEffect(()=>{
    if(message === "")
      return

    slideAnim.setValue(-100)
    handleSlideMessage()
    console.log("message ", message)
  },[message])

  


  
  function handleLogin(data:any){
    SignIn(data?.Email, data?.Senha)    
    console.log('Login data:', data);
    console.log('Login button pressed');
  }

  console.log('Errors:', errors);


  return (
    <NativeBaseProvider>
      <View style={{...backgroundStyle, width:maxWidth, height:maxHeight }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <SafeAreaView>
          <Box>

            {messagePanel}
            {/* <Pressable onPress={handleSlideMessage}>
              <Text>BOTAO</Text>
            </Pressable> */}
            
              

            <VStack space={4} alignItems="center" padding={20} justifyContent={"center"} height={maxHeight/1.5}>
           
               
          
              <Heading size="xl" color={isDarkMode?'white':'dark.200'}>Welcome to Login</Heading>
                <Controller
                  rules={{
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^(?=.{1,320}$)[a-zA-Z0-9._%+-]+@(?![-.])[a-zA-Z0-9.-]+(?<![-.])\.[a-zA-Z]{2,}$/,
                      message: 'Email inválido',
                    },                    

                  }}
                  control={control}
                  name='Email'
                  render={({field:{value, onBlur, onChange}}) =>         
                  <InputText isInvalid={errors.Email !== undefined} theme={colorScheme as any} errorMessage={errors.Email?.message?.toString()}
                  label='Email' value={value} onBlur={onBlur} onChangeText={onChange}/>}/>
                  <Controller
                  rules={{
                    required: 'Senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'Senha deve ter pelo menos 6 caracteres',
                    },
                  }}
                    control={control}
                    name='Senha'
                    render={({field:{value, onBlur, onChange}}) =>         
                    <InputText isInvalid={errors.Senha !== undefined} theme={colorScheme as any} errorMessage={errors.Senha?.message?.toString()} label='Senha' hidden={true} value={value} onBlur={onBlur} onChangeText={onChange}/>}/>

                

                

              <Button onPress={handleSubmit(handleLogin)} colorScheme="primary" size="lg" width="100%" mt={1}>
                Entrar
              </Button>
              <HStack space={2} justifyContent="center">
              </HStack>
            </VStack>
          </Box>
        </SafeAreaView>

      
        {/* <ScrollView
          style={backgroundStyle}>
          <View style={{paddingRight: safePadding}}>
            <Header/>
          </View>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              paddingHorizontal: safePadding,
              paddingBottom: safePadding,
            }}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            Eu.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView> */}
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Login;
