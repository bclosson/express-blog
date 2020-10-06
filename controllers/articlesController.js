const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Current Path = '/article'


// GET index
router.get('/', (req, res) => {
    // Get data for all articles
    db.Article.find({}, (err, allArticles) => {
        if (err) return console.log(err);

        const context = {
            allArticles: allArticles
        }
        
        res.render('articles/index', context);
    });
});

// GET new
router.get('/new', (req, res) => {
    res.render('articles/new');
});

// Get show

router.get('/:articleId', (req, res) => {
    db.Article.findById(req.params.articleId, (err, articleById) => {
        if (err) return console.log(err);
        
        const context = {
            title: articleById.title,
            body: articleById.body,
        };

        res.render('articles/show', context);
     });
});

// Post Create
router.post('/', (req, res) => {
    console.log(req.body);

    db.Article.create(req.body, (err, newArticle) => {
        if (err) return console.log(err);


        res.redirect(`/articles/${newArticle.id}`);
    });
});
module.exports = router;