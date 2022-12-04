import React from 'react'
import { Container } from '@mui/system'
import { Theme } from '@mui/material'
import {useTheme,Typography} from '@mui/material'
import { tokens } from '../theme/AppThemeProvider'
import { useState } from 'react'
import {IconButton} from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useEffect } from 'react'
import {Grid} from '@mui/material'
import { auth } from '../firebase-config'
import CardCustom from '../components/CardCustom'
import { BookmarkContext } from '../Context/BookMarkContext'
import { useContext } from 'react'
import { motion } from 'framer-motion'


const BookMarks = () => {

  const [inputField,setInputFeild] = useState("")
  let [postLists,setPostList] = useState([])

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const postCollectionRef = collection(db,"BlogPosts")
  useEffect(()=>{
    const getBookMarks = async () =>{
      const data = await getDocs(postCollectionRef)
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getBookMarks()
  },[])
 
  const blog = useContext(BookmarkContext)
  const idArr = blog.blogIds
  postLists = postLists.filter((x)=>idArr.includes(x.id))
   console.log(postLists)
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 15,marginBottom: 10 }} >
        <Container
         sx={{
          marginTop: 3,
          display:"flex",
          flexDirection:"column",
          alignItems: "center"
         }}
        >
             <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0}}
        style={{width:"fit-content",margin:"0 auto"}}
        
      >
<Typography
           variant='h3'
           component={"p"}
           sx={{
            textAlign : "center",
            color:
                  theme.palette.mode === "light"
                    ? colors.primary[600]
                    : colors.primary[100],
              marginBottom: 1,
           }}
          >
              BookMarked Blogs
          </Typography>
          <Typography
              variant="h5"
              component={"p"}
              sx={{
                textAlign: "center",
                fontWeight: 500,
                color:
                  theme.palette.mode === "light"
                    ? colors.primary[700]
                    : colors.primary[100],
                marginBottom: 4,
              }}
            >
              Search Your Blogs Here
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: 1,
                borderColor: "grey",
              }}
            >
              <input
                className='search-bar-responsive'
                placeholder="Search.."
                type="text"
                onChange={(e)=>setInputFeild(e.target.value)}
              />
              <IconButton>
                <SearchIcon sx={{ fontSize: 50 }} />
              </IconButton>
            </div>
      </motion.div>
          
        </Container>
        <Grid id={"cards"} container sx={{ marginTop: 5 }} spacing={3}>
        {postLists.length!==0&&postLists.
            filter((x)=>inputField===""?x:
            x.title.split(" ").join("").toLowerCase().includes(inputField.trim().split(" ").join("").toLowerCase())
            ).map((x) => {
              return (
                <CardCustom
                  author={x.author}
                  body={x.body}
                  date={x.date}
                  description={x.description}
                  id={x.id}
                  title={x.title}
                  key={x.id}
                  header={x.header}
                />
              );
            })}
        </Grid>
      </Container>
    </>
  )
}

export default BookMarks