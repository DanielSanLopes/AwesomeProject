import { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const api = axios.create({
    baseURL: Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://10.0.2.2:4000',
})

type  AuthContextType = {
    useAuth:()=>{token:string, loadingAuth:boolean, loggedIn:boolean},
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setMessage:React.Dispatch<React.SetStateAction<string>>,
    SignIn:(email:string, senha:string)=>Promise<void>,
    SignUp:()=>object,
    SingOut:()=>object,
    Consult:()=>object,
    message:string,
    loadingAuth:boolean
}

export const AuthContext = createContext<AuthContextType>(new Object() as AuthContextType);

async function grantToken(){
        const tk = await AsyncStorage.getItem("token");
        if(!tk){
            await AsyncStorage.setItem("token", "");
        }
    }

    grantToken();

 api.interceptors.request.use(async (req) => {
        const token =  await AsyncStorage.getItem("token");
        console.log('token ', token)
        req.headers.Authorization = `Bearer ${token}`
        console.log("getAuth ",req.headers.getAuthorization())
        return req;
    }, (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    });


function AuthProvider({children}:any){

    const [loadingAuth, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [token, setToken] = useState<string>("");

        

    async function grantStateToken(){
        const tk = await AsyncStorage.getItem("token");
        if(tk){
            setToken(tk);
        } else {
            setToken("");
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (loadingAuth) grantStateToken();
    },[loadingAuth])
    

    console.log(token)

   
    const SignIn = async (email:string, senha:string)=>{ 
        setLoading(true)  
        try {
            const response = await api.post('/login', {email, password:senha});
            await AsyncStorage.setItem("token", response.data.token);
            ;
            setToken(response.data.token);
            setLoggedIn(true);
        } catch (error:any) {
            console.error("Login error:", error.response?.data?.message);
            setMessage(error.response?.data?.message)
            setLoggedIn(false);
            throw error; // Re-throw the error to handle it in the component
        }
        setLoading(false);
    };

   ;

    const SignUp = ()=>({});
    const SingOut = ()=>({});
    const Consult = ()=>({});

    async function getAuth(){
        if(loggedIn || token.length > 0){
            const response = await api.get('/auth')
            if (response.status === 200){
                setLoggedIn(true)
                return
            }else{
                setLoggedIn(false)
                return
            }
        }
        return
    }
    

    const useAuth = () => {
        getAuth()
        return { token, loadingAuth:false, loggedIn };
    }

    return(
        <AuthContext.Provider value={{useAuth, setLoading, setMessage, loadingAuth, SignIn, SignUp, SingOut, Consult, message}}>
            {children}
        </AuthContext.Provider>
    )
    

}

export default AuthProvider