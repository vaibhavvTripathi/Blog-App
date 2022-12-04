import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  IconButton,
} from "@mui/material";
import { dFlex } from "../theme/commonStyles";
import { flexCenter } from "../theme/commonStyles";
import { Grid } from "@mui/material";
import Navigations from "../components/Navigations";
import { tokens } from "../theme/AppThemeProvider";
import CardCustom from "../components/CardCustom";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import { Input, Paper, Card, CardContent } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";
import CarouselCustom from "../components/CarouselCustom";
import { useEffect } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BlogContent from "../components/BlogContent";
import { motion } from "framer-motion";
import ErrorCatch from "./ErrorCatch";
import {FacebookShareButton} from 'react-share'

const Home = () => {
  const [postLists, setPostList] = useState([]);
  const [inputField, setInputFeild] = useState("");

 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    
      <Carousel
        className="header-custom-carousel"
        sx={{
          margin: "0 auto",
          maxWidth: "lg",
          boxDecorationBreak: 2,
          marginTop: 15,
          backgroundImage:
            "https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?w=1380&t=st=1668670192~exp=1668670792~hmac=416169f773c99b514d5d1a1e8b22ea323c77ad13d33805d01c043c5afc0d4b0c",
        }}
        animation="slide"
        interval="2000"
        duration="100"
        stopAutoPlayOnHover={false}
      >
        {postLists
          .filter((x, i) => i < 3)
          .map((x, i) => {
            return (
              <CarouselCustom
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
      </Carousel>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0}}
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
            variant="h2"
            component={"p"}
            sx={{
              textAlign: "center",
              fontWeight: 400,
              color:
                theme.palette.mode === "light"
                  ? colors.primary[600]
                  : colors.primary[100],
              marginBottom: 1,
            }}
          >
            Want to Read Something?
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
              display:"flex"
            }}
          >
            <input
             className="search-bar-responsive"
              onChange={(e) => setInputFeild(e.target.value)}
              placeholder="Search.."
              type="text"
            />
            <IconButton>
              <SearchIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </div>
        </Container>
      </motion.div>

      <Box
        sx={{
          ...flexCenter,
          minHeight: 50,
          marginTop: 4,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ borderColor: colors.grey[800], marginTop: 5, marginBottom: 5 }}
        >
          <Grid id={"cards"} container spacing={5}>
            {postLists
              .filter((x) =>
                inputField === ""
                  ? x
                  : x.title
                      .split(" ")
                      .join("")
                      .toLowerCase()
                      .includes(
                        inputField.trim().split(" ").join("").toLowerCase()
                      )
              )
              .map((x) => {
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
      </Box>
    </>
  );
};

export default Home;
