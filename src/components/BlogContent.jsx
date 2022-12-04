import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme/AppThemeProvider";
import Logo from "../components/Logo";
import { Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { collection, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect } from "react";
import { doc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useState } from "react";
import { Avatar } from "@mui/material";


const BlogContent = () => {
  const [blogData, setBlogData] = useState({});
  const [user, setUser] = useState({});

  const { articleID } = useParams();

  console.log(articleID);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //firebase import
  const docRef = doc(db, "BlogPosts", articleID);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const getPost = async () => {
      const data = await getDoc(docRef);
      const author = data.data().author;
      const date = data.data().date;
      const body = data.data().body;
      const description = data.data().description;
      const title = data.data().title;
      const header = data.data().header;

      const obj = { author, date, body, description, title, header };
      setBlogData(obj);
    };
    getPost();
  }, []);

  return (
    <>
      <motion.div
       animate={{scale: 1}}
       initial={{scale: 0}}
      >
        <Box
          maxWidth="xl"
          sx={{
            margin: "0 auto",
            padding: 3,
            marginTop: 5,
            bgcolor: theme.palette.mode === "dark" ? colors.primary[500] : "",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box marginTop={3}>
            <Typography
              variant="h2"
              component={"p"}
              fontWeight="800"
              textAlign={"center"}
            >
              {blogData.title}
            </Typography>
            <Typography
              variant="h5"
              component={"p"}
              fontWeight="200"
              textAlign={"center"}
              margin=" 1em 0"
            >
              {blogData.description}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItem: "center",
                width: "fir-content",
                width: "fit-content",
                margin: "0 auto",
                marginBottom: 10,
              }}
            >
              <Avatar src={blogData.author && blogData.author.photo} />

              <Typography variant="h6" marginLeft={1} fontWeight="600">
                {blogData.author && blogData.author.name} |
              </Typography>

              <Typography variant="h6" marginLeft={1}>
                {blogData.date === undefined
                  ? ""
                  : months[blogData.date.month] +
                    " " +
                    blogData.date.day +
                    ", " +
                    blogData.date.year}
              </Typography>
            </div>

            <div style={{ margin: "0 auto", width: "fit-content" }}>
              <img
                style={{ height: "500px", width: "1200px" }}
                src={blogData.header}
                alt=""
              />
            </div>

            <Typography
              variant={"h6"}
              style={{ width: "1200px", textAlign: "justify" }}
              marginTop={2}
              paddingBottom={3}
            >
              {blogData.body}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

export default BlogContent;
