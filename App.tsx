
// import { NavigationContainer } from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack'
import { Switch,} from 'native-base';
import AuthProvider from './contexts/AuthContext';
import Login from './screens/Login';
import { SafeAreaView, useColorScheme } from 'react-native';
import Switcher from './screens/Switcher';
import { useTheme } from './Store';

// const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const setDarkMode = useTheme(state => state.setDarkMode)
  setDarkMode(useColorScheme() === 'dark');


  return (
      <AuthProvider>
        <Switcher/>
      </AuthProvider>
   
    
      // <NavigationContainer>
      //   <SafeAreaView>
      //     <Stack.Navigator initialRouteName="Login">
      //     <Stack.Screen name="Login" component={Login} />
      //   </Stack.Navigator>
      //   </SafeAreaView>
      // </NavigationContainer>
    
  );
}


export default App;
