import React,{createContext,useEffect} from "react";
import { useState } from "react";
import {signInWithPopup }from "firebase/auth"
import {auth,provider} from "../firebase-config"
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export const LoginContext = createContext({
    authState:false,
    signIn:()=>{},
    signOut:()=>{}
})
function AuthProvider({children}) {

   

    const [authState,setAuthState] = useState(localStorage.getItem("authStateCurr")?JSON.parse(localStorage.getItem("authStateCurr")):false)

    useEffect(()=>{
        localStorage.setItem("authStateCurr",JSON.stringify(authState))
        
    },[authState])

  function signIn() {

        signInWithPopup(auth,provider).then((result)=>{
            localStorage.setItem("link",result.user.photoURL)
            setAuthState(true)
        })
    }
    function signOutG() {
        
        signOut(auth).then(()=>{
            setAuthState(false)
          })
    }
    const contextValue = {
        authState,
        signIn,
        signOutG
    }
    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}
export default AuthProvider