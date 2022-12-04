import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme/AppThemeProvider';
import Navbar from './components/Navbar';
import React, { useContext, useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import MyBlogs from "./pages/MyBlogs"
import BookMarks from "./pages/BookMarks"
import BlogContent from './components/BlogContent';
import { BlogProvider} from './Context/BookMarkContext';
import { auth } from './firebase-config';
import ErrorCatch from './pages/ErrorCatch';
import AuthProvider, { LoginContext } from './Context/LoginContext';


function App() {
 
  const [theme, colorMode] = useMode()
  const logState = useContext(LoginContext)
  console.log(logState.authState)
  return (
    <div className="App">
     
      <BlogProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>
           <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/CreatePost' element={logState.authState?<CreatePost/>:<ErrorCatch/>}/>
              <Route path='/MyBlogs' element={logState.authState?<MyBlogs/>:<ErrorCatch/>}/>
              <Route path='/BookMarks' element={logState.authState?<BookMarks/>:<ErrorCatch/>}></Route>
              <Route path='/:articleID' element={<BlogContent/>}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
      </BlogProvider>
 
    </div>
  );
}

export default App;
