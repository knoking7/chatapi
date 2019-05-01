const express = require('express');
var router = express.Router();
var Post = require('../models/Post.js');

const PageConstant = 10;

router.get('/list/:page', function(req, res) {
  const page = parseInt(req.params.page, 10) + 1;

  if (isNaN(page) || page < 0) {
    return res.status(400).json({errorName:'wrong number page'});
  }

  Post.getPost(page, PageConstant)
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((err) => {
      return next(err);
    })
});

router.post('/',  function(req, res) {

  if (Object.keys(req.body).length < 1) {
    return res.status(400).json({errorName:"empty request"});
  }

  Post.create(req.body)
    .then((post) => {
      return res.status(201).json(post);
    })
    .catch((err) => {
      return next(err);
    })
});

router.get('/single/:id',  function(req, res, next) {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({errorName:"not found one message"});
      } else {
        return res.status(200).json(post);
      }
    })
    .catch((err) => {
      return next(err);
    })
});

router.put('/single/:id', function(req, res, next) {

  if (req.params.id === void 0) {
    return res.status(400).json({errorName:"id is not defined"});
  }

  Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((err) => {
      return next(err);
    })
});

router.delete('/single/:id', function(req, res, next) {

  if (req.params.id === void 0) {
    return res.status(400).json({errorName:"id is not defined"});
  }

  Post.findByIdAndRemove(req.params.id) 
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((err) => {
      return next(err);
    })
});

module.exports = router;