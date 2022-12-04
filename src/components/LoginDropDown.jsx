import React from 'react'
import { Menu,MenuItem } from '@mui/material'
import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import{ IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../Context/LoginContext';

const DropDownComponent = () => {

    const navigate = useNavigate()

    const [anchorEl,setAnchorEl] = useState(null)
    const [open,setOpen] = useState(false)

    const handleClose = () =>{
        setAnchorEl(null)
        setOpen(false)
    }
    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }
    //loginContext
    const logState = useContext(LoginContext)


  return (
    <div className='drop-down-show'>
        <IconButton
         onClick={(e)=>handleClick(e)}
        >
          <ArrowDropDownIcon/>
        </IconButton>
       
          {logState.authState&&
           <Menu anchorEl={anchorEl} 
           open={open}
           onClose={handleClose}
           >
           <MenuItem onClick={()=>navigate("/CreatePost")}>Write your story</MenuItem>
           <MenuItem onClick={logState.signOutG}>SignOut</MenuItem>
          </Menu>}
    </div>
  )
}

export default DropDownComponent