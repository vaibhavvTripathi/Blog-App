import React from 'react'
import {Box, TextareaAutosize} from "@mui/material"
import {Input,Button,TextField} from "@mui/material"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useTheme }from '@mui/material';
import {tokens} from "../theme/AppThemeProvider"
import { color, padding } from '@mui/system';
import { useState } from 'react';
import {addDoc, collection} from "firebase/firestore"
import {auth, db} from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase-config';
import {v4} from "uuid"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import "./fileInput.css"
import { motion } from 'framer-motion';

const CreatePost = () => {


  const navigate = useNavigate()

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isBack = theme.palette.mode==="dark"?colors.blueAccent[800]:colors.blueAccent[400]

  //dates 
  const currDate = new Date()
  const currDay = currDate.getDate()
  const currMonth = currDate.getMonth()
  const currYear = currDate.getFullYear()
 
  //blogContent State
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [body,setBody] = useState("")

  //posting information to the firebase
  const postCollectionRef = collection(db,"BlogPosts")

  //uploading images
  const [imageUpload,setImageUpload] = useState(null)
  const[blogHeaderImages,setHeaderImages] = useState("")

  //image button state
  const [showImgButton,setButton] = useState(true)

  const uploadImage = () => {
    if(imageUpload==null) {
      return
    }
    const imageRef = ref(storage,`images/${imageUpload.name+v4()}`)
    uploadBytes(imageRef,imageUpload).then((data)=>{
      alert("image uploaded")
      getDownloadURL(imageRef).then((data)=>{
        setHeaderImages(data)
        
      })
      
    })
  }

  const createPost = async () =>{
    await addDoc(postCollectionRef,{
      title : title,
      description: description,
      body: body,
      author: {
        name : auth.currentUser.displayName,
        id: auth.currentUser.uid,
        photo: auth.currentUser.photoURL
      },
      date: {
        day: currDay,
        month: currMonth,
        year: currYear
      },
      header: blogHeaderImages
    })
    setBody("")
    setDescription("")
    setTitle("")
    navigate("/#cards")
  }
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0}}
       
      >
        <Box
       maxWidth="lg"
       sx = {{margin: "0 auto",marginTop: 10,display: "flex", flexDirection: "column",marginBottom :2}}
     >
      <div className="file-input" style={{"display":"flex","alignItems":"baseline"}} >
        <input type="file" id="file" className="file" onChange={e=>{setImageUpload(e.target.files[0])}}/>
        <label htmlFor="file"><CameraAltIcon sx={{marginRight:1}}/> Add an image</label>
        <Button
        variant="contained"
          sx={{fontWeight:"600",fontSize:17,borderColor:colors.blueAccent[200],background:isBack,marginRight:2,fontWeight:"600",fontSize:17,marginBottom: 2}}
          onClick = {uploadImage}
        >Click here to save the image</Button>
      </div>
       
     
      <Input
       placeholder='Add Title..'
       sx = {{fontSize: 70,paddingTop: 2,marginBottom: 5,color: colors.grey[100] }}
       onChange={(e)=>setTitle(e.target.value)}
       value={title}
      >
      </Input>

      <Input
       placeholder='Add Description..'
       sx = {{fontSize: 30,paddingTop: 2,marginBottom: 5,color: colors.grey[100] }}
       onChange={(e)=>setDescription(e.target.value)}
       value={description}
      >
      </Input>

      <TextareaAutosize
       style = {{outline: "none",border:"none",fontSize:"1.5em",background:colors.blueAccent[800],color:colors.grey[100],
       padding: 20, borderRadius: 10, marginBottom: 20
      }}
       onChange={(e)=>setBody(e.target.value)}
       minRows = {10}
       placeholder="Add Your Story.."
       value={body}
      ></TextareaAutosize>
      <Box>
        <Button
        variant="contained"
          sx={{fontWeight:"600",fontSize:17,borderColor:colors.blueAccent[200],background:isBack,marginRight:2,fontWeight:"600",fontSize:17,marginBottom: 2}}
          onClick = {createPost}
        >Publish</Button>
      </Box>
      
     </Box>
      </motion.div>
     
    </>
  )
}

export default CreatePost