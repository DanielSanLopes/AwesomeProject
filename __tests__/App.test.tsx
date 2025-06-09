/**
 * @format
 */

import React, { useContext } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { useTheme } from '../Store';
import { State } from 'react-native-gesture-handler';
import AuthProvider, { AuthContext } from '../contexts/AuthContext';
import { act, render, waitFor } from '@testing-library/react-native';
import { create } from 'zustand';


// test('renders correctly', async () => {
//   await ReactTestRenderer.act(() => {
//     ReactTestRenderer.create(<App />);
//   });
// });

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("zustand", ()=>({
  create:jest.fn()
}))

jest.mocked(useTheme)

describe('useTheme Zustand Store', ()=>{


  test('Must be light mode on start', ()=>{
    const Component = ()=>{
        const {colorScheme, isDarkMode} = useTheme(state => state)
        expect(colorScheme).toBe('light');
        expect(isDarkMode).toBe(false)
      return(<></>)
    }
  })
})



describe('authContext and useAuth', ()=>{
  test('useAuth return values must be "", false and false at first time', async ()=>{

    let useauth = { token: 'default', loadingAuth: true, loggedIn: true };

    const Component = () =>{
      const {useAuth} = useContext(AuthContext)
      useauth = useAuth()
      return(<></>)
    }

     
    render(<AuthProvider>
      <Component/>
    </AuthProvider>)    

    await waitFor(()=>{
    expect(useauth.token).toBe("")
    expect(useauth.loadingAuth).toBe(false)
    expect(useauth.loggedIn).toBe(false)
  })

      
  })
})
