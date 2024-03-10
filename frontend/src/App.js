import './App.css';
import Nav from './components/Nav'

import React from 'react';
import Accueil from './components/Accueil';
import Manga from './components/Manga';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Search from './components/Search';



export default function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:
       <div className='body-container'>
        <Nav />
        <Accueil />
      </div>
    },
    {
      path:'/mangas',
      element:
      <div>
        <Nav />
        <Search />
      </div>
    },
    {
      path:'/manga',
      element: 
      <div className='body-container'>
        <Nav />
        <Manga/>
      </div>
    }

  ])
  return (
    <RouterProvider router={router}/>
    );

    
}

