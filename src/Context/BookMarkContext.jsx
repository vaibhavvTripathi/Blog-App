import React, { createContext, useEffect } from 'react'
import { useState } from 'react'

export const BookmarkContext = createContext({
    blogIds : [],
    addToBookMark : ()=>{},
    removeFromBookMark : ()=>{} 
})


export function BlogProvider({children}) {

    const [Ids,setBlogIds] = useState(localStorage.getItem("ids")?JSON.parse(localStorage.getItem("ids")):[])

    useEffect(()=>{
       localStorage.setItem("ids",JSON.stringify(Ids))
    },[Ids])

    function addToBookMark(id) {
        setBlogIds((prevArr)=>{
          return ([...prevArr,id])
        })
    }
    function removeFromBookMark(id) {
        setBlogIds(prevArr=>{
            return prevArr.filter((x)=>{
                return x !== id
            })
        })
    }

    const contextValue = {
        blogIds : Ids,
        addToBookMark,
        removeFromBookMark
    }

    return (
        <BookmarkContext.Provider value={contextValue}>
           {children}
        </BookmarkContext.Provider>
    )
}

export default BlogProvider