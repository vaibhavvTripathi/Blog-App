import React from 'react'
import BookIcon from '@mui/icons-material/Book';
import { Box } from '@mui/system';
import { Typography, useTheme } from '@mui/material';
import { dFlex } from '../theme/commonStyles';
import { tokens } from '../theme/AppThemeProvider';
const Logo = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

  return (
    <>
      <Box
       sx = {dFlex}
      >
        <BookIcon sx={{fontSize: "2.5em",color: colors.blueAccent[400]}}/>
        <Typography
         variant='h4'
         component='p'
         fontWeight={400}
         sx={{fontWeight:"700"}}
        >
          Orwell
        </Typography>
      </Box>
    </>
  )
}

export default Logo