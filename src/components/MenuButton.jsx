import React from 'react'
import { Menu,MenuItem,IconButton } from '@mui/material'
import { useState } from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'

const MenuButton = ({handleDelete,authState,author}) => {

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
    const handleDeleteAndClose = () => {
        handleDelete()
        handleClose()
        
    }
  return (
    <>
    <IconButton onClick={handleClick}>
        <MoreVertIcon/>
    </IconButton>
     <Menu anchorEl={anchorEl} 
     open = {open}
     onClose = {handleClose}
     >
       {auth.currentUser!==null && auth.currentUser.uid===author.id && <MenuItem onClick={handleDeleteAndClose}>Delete this blog</MenuItem>}
        <MenuItem onClick={handleClose}>Bookmark this blog</MenuItem>
     </Menu>
    </>
  )
}

export default MenuButton