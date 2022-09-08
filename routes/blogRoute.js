const express = require('express');
const router = express.Router();
const Blog = require('../model/blogSchema');


  router.get('/get_blog/:id', async (req, res, next) => {
    try {
      const blog_id =req.params.id;
      const blogPosts = await Blog.find({_id:blog_id}).populate('authorDetail', '-email -password');
      res.json({blogPosts});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });

  router.put('/add_comment', async(req, res, next)=>{
    console.log(req.body);
    const comment= req.body.comment;
    const id= req.user.id;
    const name= req.user.name;
    const blog_id= req.body.id;

    console.log(name);
    try {
      const added_comment = await Blog.findOneAndUpdate({_id:blog_id},{$push:{ Comments:{userId: id,userName: name, comment: comment}}}, {new:true});
      console.log(added_comment);
      res.json({added_comment});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  })
  
  router.post('/create_blog', async (req, res, next) => {
    console.log(req.body);
    const {title,tagline, content} = req.body;
    const id= req.user.id;
    try {
      const blogPost = await Blog.create({title,tagline, content, authorDetail: id});
      console.log(blogPost);
      res.json({blogPost});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });
  
  router.put('/update_blog', async (req, res, next) => {
    console.log(req.body);
    const {_id,title,tagline, content} = req.body;
    
    try {
      const blogPost = await Blog.findByIdAndUpdate(_id,{$set:{ title:title, tagline:tagline,content:content}}, {new:true});
      console.log(blogPost);
      res.json({message:"Blog Updated sucessfully!", blogPost});
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  });
  
  router.delete('/delete_blog/:id?', async(req, res, next) =>{
    const {id}= req.params;
    if (!id){
      res.json({status:404,message:'Id is missing!'});
    };

    try{
      data=await Blog.findByIdAndDelete(id);
      res.json({message: 'Blog deleted!', data});
    }
    catch(error){
      next({status: 500, message:error});
    }
  })

  router.get('/get_your_blogs', async (req, res, next) => {
    try {
      const id = req.user.id;
      const blogPosts = await Blog.find({authorDetail:id}).populate('authorDetail', '-email -password');
      res.json({blogPosts});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });


  router.get('/get_all_blogs', async (req, res, next) => {
    try {
      const blogPosts = await Blog.find({}).populate('authorDetail', '-email -password');
      res.json({blogPosts});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });

  module.exports = router;