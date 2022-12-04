import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { CardContent } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useTheme } from "@mui/material";
import { tokens } from "../theme/AppThemeProvider";
import { IconButton, Button } from "@mui/material";
import { Grid } from "@mui/material";
import { useState } from "react";
import BlogContent from "./BlogContent";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";
import { auth, db } from "../firebase-config";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import "./card.css";
import { addDoc } from "firebase/firestore";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useContext } from "react";
import { BookmarkContext } from "../Context/BookMarkContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import { TwitterShareButton } from "react-share";
import { LinkedinShareButton} from "react-share";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const CardCustom = ({ author, body, date, description, id, title, header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  //modal state
  const [isOpen, setIsOpen] = useState(false);

  const deletePost = async () => {
    const postDoc = doc(db, "BlogPosts", id);
    await deleteDoc(postDoc);
    window.location.reload();
  };

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

  //bookmarkContext
  const blog = useContext(BookmarkContext);
  const idArr = blog.blogIds;

  return (
    <>
      <Grid item lg={4} sm={6} xs={12}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.1 }}
          exit={{ opacity: 1 }}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 1 }}
        >
          {
            <Card
              sx={{
                bgcolor: theme.palette.mode === "dark" && colors.primary[500],
                borderRadius: 2,
                padding: 1,
                boxShadow: 2,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: colors.blueAccent[500] }}
                    aria-label="recipe"
                    src={author.photo}
                  />
                }
                action={
                  <MenuButton handleDelete={deletePost} author={author} />
                }
                titleTypographyProps={{
                  variant: "h7",
                  color: colors.grey[100],
                  fontSize: "700",
                }}
                title={author.name}
                subheader={
                  months[date.month] + " " + date.day + ", " + date.year
                }
              />
              <CardMedia component="img" height="194" image={header} />
              <CardContent>
                <Typography
                  className="customHeader"
                  variant="h6"
                  color={colors.grey[200]}
                  fontWeight="800"
                >
                  {title}
                </Typography>
                <Typography
                  className="customDes"
                  variant="p"
                  color={
                    theme.palette.mode == "dark"
                      ? colors.grey[200]
                      : colors.grey[700]
                  }
                >
                  {description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="contained"
                    sx={{}}
                    onClick={() => navigate(`/${id}`)}
                  >
                    Read this blog
                  </Button>
                </motion.div>

                {idArr.includes(id) ? (
                  <IconButton onClick={() => blog.removeFromBookMark(id)}>
                    <BookmarkIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => blog.addToBookMark(id)}>
                    <BookmarkBorderIcon />
                  </IconButton>
                )}

                <TwitterShareButton 
                 url="https://github.com/vaibhavvTripathi"
                 quote={"Check out this awesome guy"}
                 style={{marginTop:"7px"}}
                >
                  <TwitterIcon></TwitterIcon>
                </TwitterShareButton>
                
                <LinkedinShareButton 
                 url="https://github.com/vaibhavvTripathi"
                 quote={"Check out this awesome guy"}
                 style={{marginTop:"7px"}}
                >
                  <LinkedInIcon/>
                </LinkedinShareButton>
              </CardActions>
            </Card>
          }
        </motion.div>
      </Grid>
    </>
  );
};

export default CardCustom;
