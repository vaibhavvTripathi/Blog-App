import { Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import React from "react";
import { auth } from "../firebase-config";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material";
import { tokens } from "../theme/AppThemeProvider";
import { IconButton } from "@mui/material";
import { db } from "../firebase-config";
import { collection } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { getDocs } from "firebase/firestore";
import CardCustom from "../components/CardCustom";
import { motion } from "framer-motion";

const MyBlogs = () => {

  const [inputField , setInputFeild] = useState("")

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [postLists, setPostList] = useState([]);

  const postCollectionRef = collection(db, "BlogPosts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    
  }, []);

 
  return (
    <>
    
      <Container maxWidth="lg" sx={{ marginTop: 9,marginBottom: 10 }}>
        <Grid container>
        <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0}}
        style={{width:"fit-content",margin:"0 auto"}}
        className="search-wrapper-responsive"
      >
         <Container
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              component={"p"}
              sx={{
                textAlign: "center",
                color:
                  theme.palette.mode === "light"
                    ? colors.primary[600]
                    : colors.primary[100],
                marginBottom: 1,
              }}
            >
              Your Blogs
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
          </Container>
      </motion.div>
         
          <Grid id={"cards"} container sx={{ marginTop: 5 }} spacing={3}>
            {postLists.length!==0&&postLists.
            filter((x)=>x.author.id===auth.currentUser.uid).
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
        </Grid>
        
      </Container>
    </>
  );
};

export default MyBlogs;
