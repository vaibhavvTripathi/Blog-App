import React from 'react'
import { Button,ButtonGroup,Box} from '@mui/material'
import { useTheme } from '@emotion/react'
import { ColorModeContext, tokens } from '../theme/AppThemeProvider'
import ModeIcon from '@mui/icons-material/Mode';
import {IconButton} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext } from 'react';
import {signInWithPopup }from "firebase/auth"
import {auth,provider} from "../firebase-config"
import { useState } from 'react';
import {signOut} from "firebase/auth"
import {Avatar }from '@mui/material';
import { dFlex } from '../theme/commonStyles';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../Context/LoginContext';
import LoginDropDown from "../components/LoginDropDown"

const Login = () => {

  const navigate = useNavigate()

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  
  
  const isBack = theme.palette.mode==="dark"?colors.blueAccent[800]:colors.blueAccent[400]
  

  //login context
  const logState = useContext(LoginContext)


  return (
    <Box sx={dFlex}>
      
  
   {logState.authState &&
  
     <Box sx={dFlex} >
       <div className='login-responsive'>
    {window.location.pathname !=="/CreatePost"&&<Button
       variant="contained"
        sx={{fontWeight:"600",fontSize:17,borderColor:colors.blueAccent[200],background:isBack,marginRight:2,fontWeight:"600",fontSize:17}}
        onClick={()=>navigate("/CreatePost")}
      >Write Your Story <ModeIcon/></Button>
      }
    <Button 
    variant='outlined'
    sx={{fontWeight:"600",fontSize:17,borderColor:colors.blueAccent[500],color:colors.blueAccent[400]}}
    onClick={logState.signOutG}
   >
    SignOut
    </Button>
    </div> 
    <Avatar src={localStorage.getItem("link") } sx={{marginLeft:2}}></Avatar>
    <LoginDropDown/>
   </Box>
   
   
   }
    {!logState.authState && <Button 
      variant='outlined'
      sx={{fontWeight:"600",fontSize:17,borderColor:colors.blueAccent[500],color:colors.blueAccent[400]}}
      onClick={logState.signIn}
     >
      SignIn With Google
     </Button>}
    
      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{marginLeft:1}} >
         {theme.palette.mode==="dark"?<LightModeIcon/>:<DarkModeIcon/>}
      </IconButton>
    </Box>
  )
}

export default Login