"use strict"

const { findOne } = require("../models/article");
var Article = require("../models/article")

//This object contains the route methods

var controller = {

    //Save article
    save: (req, res) =>{
        var params = req.body;
        var article = new Article();
        
        //Asign values to each field
        article.title = params.title;
        article.content = params.content;
        article.author = params.author;

        article.save((err, articleStored) => {
            if(err || !articleStored) {
                return res.status(404).send({
                    status: "error",
                    message: "An error occurred while trying to save the article."
                })
            }
            return res.status(200).send({
                status: "success",
                articleStored
            })
        })
    },
    //List Articles
    getArticles: (req, res) => {
        var query = Article.find({})

        query.sort("-date").exec((err, articles) => {
            if(err) {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while trying to get the requested data."
                });
            }
            if(!articles){
                return res.status(404).send({
                    status: "error",
                    message: "There are no articles to display."
                })
            }
            return res.status(200).send({
                status: "success",
                articles
            })
        })
    },
    //Delete Article

    delete: (req, res) => {
        //Get id from url

        var articleId = req.params.id;
        Article.findOneAndDelete({_id: articleId}, (err, articleRemove) => {
            if(err) {
                return res.status(500).send({
                    status: "error",
                    message: "Error deleting article"
                })
            }
            if(!articleRemove){
                return res.status(404).send({
                    status: "error",
                    message: "Article to delete was not found"
                })
            }
            return res.status(200).send({
                status: "success",
                article: articleRemove
            })
        })
    }
}

module.exports = controller;