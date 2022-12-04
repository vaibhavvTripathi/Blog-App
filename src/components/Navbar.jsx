import React from 'react'
import { Box,Container,Typography} from '@mui/system'
import BoltIcon from '@mui/icons-material/Bolt';
import {dFlex,flexBetweenCenter }from "../theme/commonStyles"
import Logo from './Logo';
import Navigations from './Navigations';
import Login from './Login';
import { useState } from 'react';
import {useTheme} from '@mui/material';
import { tokens } from '../theme/AppThemeProvider';

const Navbar = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [scWidth,setWidth] = useState(window.innerWidth)
  console.log(scWidth)
  

  return (
    <>
     <Box
      sx={{
        ...dFlex,
        minHeight: 50,
        position: "fixed",
        top: 0,
        width:"100%",
        zIndex: "5",
        bgcolor:theme.palette.mode==="light"?"white":colors.primary[600]
      }}
     >
      <Container
       maxWidth="xxl"
       sx={{paddingBottom:1,boxShadow:1}}
      >
          <Box
             sx = {{
              ...flexBetweenCenter,
              minHeight: 50,
              px: 4,
              py:1,
           
              
            }}
          >
            <div style={{"display":"flex","alignItems":"center"}}>
              <Logo/>
              <Navigations />
            </div>
           
            <Login/>
          </Box>
      </Container> 
     </Box>
    </>
  )
}

export default Navbar