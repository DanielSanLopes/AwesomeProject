
import { NativeBaseProvider, FormControl, VStack, HStack, Box, Heading, Button, Text,   } from 'native-base';
import React from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../Store';

import { getManufacturer } from 'react-native-device-manufacturer-info';


function Home(): React.JSX.Element {

  const isDarkMode = useTheme((state)=> state.isDarkMode)
  const colorScheme = useTheme((state)=> state.colorScheme)
  const manufacturer = getManufacturer()
  const isAndroid = Platform.OS === 'android'

  console.log("Manufacturer ", getManufacturer())

  const backgroundStyle = {
    backgroundColor: isDarkMode?"#363636":"#b3b3b3",
  };

  const maxHeight = Dimensions.get('window').height
  const maxWidth = Dimensions.get('window').width;



  return (
    <NativeBaseProvider>
      <View style={{...backgroundStyle, width:maxWidth, height:maxHeight, justifyContent:"center", alignItems:"center" }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <SafeAreaView>
          <Box alignItems={"center"}>   
            <Heading size="lg" color={isDarkMode?'white':'dark.200'}>{isAndroid?"Fabricante:":"Perdão, o PC era Windows 🙏"}</Heading>
            <Text color={isDarkMode?'white':'dark.200'} fontSize={30} >
              {isAndroid?manufacturer:""}
            </Text> 
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

export default Home;
