import React from 'react'
import { Typography } from '@mui/material'
import {Button} from '@mui/material'
import {useTheme} from '@mui/material'
import { tokens } from '../theme/AppThemeProvider'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { LoginContext } from '../Context/LoginContext'

const ErrorCatch = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const logState = useContext(LoginContext)
  return (
   <motion.div
    style={{display:"flex",flexDirection:"column",alignItems:"center"}}
    animate={{scale: 1}}
    initial={{scale:0}}
   >
    <Typography
     variant="h1"
     sx={{width:"fit-content",margin:"0 auto",marginTop:15}}
    >
       You need to SignIn first
    </Typography>
    <Button
              variant="contained"
              sx={{
                bgcolor:colors.blueAccent[600],
                fontWeight:800,
                width:"fit-content"
                ,marginTop:5,
                fontSize: 20
                
              }}
              onClick={logState.signIn}
            >
              {"Click here to SignIn" } 
    </Button>
   </motion.div>
  )
}

export default ErrorCatch