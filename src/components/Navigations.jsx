import React from 'react'
import {Link} from "react-router-dom"
import { Stack,Button, Divider } from '@mui/material'
import { useTheme } from '@emotion/react'
import { tokens } from '../theme/AppThemeProvider'
import {Typography} from '@mui/material'
import { useState } from 'react'
import { auth } from '../firebase-config'
import{ Container }from '@mui/material'
import '../App.css'
import DropDownComponent from './DropDownComponent'

const Navigations = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [num,setNum] = useState(0)
  
 
  return (
    <>
    <DropDownComponent />
      <div className='nav-res'>
     <Container >
       <Link
        to={"/"}
        style={{"textDecoration":"none"}}
       >
        <Button
        onClick={()=>setNum(0)}
        variant='text'
        sx={{fontWeight:"600",fontSize:17,color:colors.grey[100],}}
        style={num===0 ?{"borderBottom":"3px solid grey"}:{}}
       >
          Home
       </Button>
       </Link>
       <Link
       to={localStorage.getItem("isAuth")?"/MyBlogs":"/error"}
       style={{"textDecoration":"none"}}
       >  
       <Button
        onClick={()=>setNum(1)}
       variant='text'
       sx={{fontWeight:"600",fontSize:17,color:colors.grey[100]}}
       style={num===1?{"borderBottom":"3px solid grey"}:{}}
      >
         My Blogs
      </Button>
       </Link>
       <Link
       to={localStorage.getItem("isAuth")?"/BookMarks":"/error"}
       style={{"textDecoration":"none"}}
       >
        <Button
         onClick={()=>setNum(2)}
        variant='text'
        sx={{fontWeight:"600",fontSize:17,color:colors.grey[100]}}
        style={num===2 ?{"borderBottom":"3px solid grey"}:{}}
       >
          BookMarks
       </Button>
       </Link>
     </Container>
    </div>
    </>
  
  )
}

export default Navigations