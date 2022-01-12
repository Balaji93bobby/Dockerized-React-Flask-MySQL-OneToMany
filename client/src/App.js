
import { Router } from "@reach/router";
import React, { useState } from 'react'

import './App.css';


import ViewArticle from './components/ViewArticle';
import EditArticle from './components/EditArticle';
import Login from './components/Login';
import ArticleForm from './components/ArticleForm';
import Navbar from "./components/Navbar";
import ArticleList from "./components/ArticleList";
import { ViewBlogger } from "./components/ViewBlogger";
import BloggerForm from "./components/BloggerForm";
import EditBlogger from "./components/EditBlogger";


function App() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="App">



      <Navbar />
      <Router>
        <Login path="/" />
        <ArticleList path="/dashboard" setSubmitted={setSubmitted} submitted={submitted} />
        <ViewArticle path="/articles/view/:id" />
        <EditArticle path="/articles/edit/:id" />
        <ViewBlogger path="/bloggers/view/:id" />
        <EditBlogger path="/bloggers/edit/:id" />
        <BloggerForm path="/bloggers/register" />
        <ArticleForm path="/create_article" setSubmitted={setSubmitted} submitted={submitted} />
      </Router>
      
    </div>
  );
}

export default App;
