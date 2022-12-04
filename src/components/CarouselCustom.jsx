import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme/AppThemeProvider";
import { useNavigate } from "react-router-dom";

const CarouselCustom = ({
  author,
  body,
  date,
  description,
  id,
  title,
  header,
}) => {
  const imgStyles = {
    width: "100%",
    height: "600px",
    backgroundImage: `url(${header})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: " black",
  };
  const overlay = {
    background: "linear-gradient(45deg,rgba(0,0,0,0.7),rgba(0,0,0,0.3))",
    width: "100%",
    height: "100%",
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  return (
    <>
      <Box style={imgStyles} sx={{ borderRadius: 10 }} sm={{"display":"none"}}>
        
          <Box
            sx={{ paddingLeft: 2, paddingTop: 10, borderRadius: 10 }}
            style={overlay}
          >
           
            <Typography
              variant="h3"
              sx={{
                fontWeight: "800",
                marginBottom: 5,
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.grey[800],
              }}
            >
              {title }
            </Typography>
            <Typography
              component="p"
              sx={{
                fontWeight: "800",
                marginBottom: 5,
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.grey[800],
                width: "45%",
              }}
            >
              {description}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.grey[800],
                borderColor:
                  theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.grey[800],
                fontSize: 20
              }}
              onClick={() => navigate(`/${id}`)}
            >
              {"Click Here to Read" } 
            </Button>
          </Box>
       
      </Box>
    </>
  );
};

export default CarouselCustom;
