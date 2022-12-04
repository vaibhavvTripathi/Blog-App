import React from 'react'
import { Menu,MenuItem } from '@mui/material'
import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import{ IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  return (
    <div className='drop-down-show'>
        <IconButton
         onClick={(e)=>handleClick(e)}
        >
          <ArrowDropDownIcon/>
        </IconButton>
        <Menu anchorEl={anchorEl} 
        open={open}
        onClose={handleClose}
        >
          <MenuItem onClick={()=>navigate("/")}>Home</MenuItem>
          <MenuItem onClick={()=>navigate("/MyBlogs")}>My Blogs</MenuItem>
          <MenuItem onClick={()=>navigate('/BookMarks')}>Bookmarks</MenuItem>
        </Menu>
    </div>
  )
}

export default DropDownComponent