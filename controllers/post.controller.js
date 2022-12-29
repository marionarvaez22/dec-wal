const Helper = require('../helpers/index');
const PostsModel = require('../models/posts.model');

const moment = require('moment');

class PostController {
    constructor(){

    }

    async wonderwall(req, res){
        if(req.session.user_data){
            let messages = await PostsModel.fetchMessages();
            res.render("wonderwall.ejs", {user_data: req.session.user_data, messages: messages.result, moment: moment});
        }
        else{
            res.redirect("/");
        }
    }

    async addMessage(req, res){
        let response_data = {status: false, result: {}, error: null};

        let validate_input = await Helper.validateInput({require: "message"}, req);

        if(validate_input.status){
            let add_message = await PostsModel.addMessage({user_id: req.session.user_data.id, message: req.body.message});

            if(add_message.status){
                response_data.status = true;
                response_data.result = add_message.result;
            }
            else{
                response_data.message = add_message.message;
            }
        }
        else{
            response_data.message = validate_input.message;
        }

        res.json(response_data);
    }

    async addComment(req, res){
        let response_data = {status: false, result: {}, error: null};

        let validate_input = await Helper.validateInput({require: "comment"}, req);

        if(validate_input.status){
            let add_comment = await PostsModel.addComment({user_id: req.session.user_data.id, comment: req.body.comment, message_id: parseInt(req.body.message_id)});

            if(add_comment.status){
                response_data.status = true;
                response_data.result = add_comment.result;
            }
            else{
                response_data.message = add_comment.message;
            }
        }
        else{
            response_data.message = validate_input.message;
        }

        res.json(response_data);
    }

    async deleteMessage(req, res){
        let response_data = {status: false, result: {}, error: null};

        let delete_message = await PostsModel.deleteMessage({user_id: req.session.user_data.id, message_id: parseInt(req.body.message_id)});

        if(delete_message.status){
            response_data.status = true;
            response_data.result = delete_message.result;
        }
        else{
            response_data.message = delete_message.message;
        }

        res.json(response_data);
    }

    async deleteComment(req, res){
        let response_data = {status: false, result: {}, error: null};
        let delete_comment = await PostsModel.deleteComment({user_id: req.session.user_data.id, comment_id: parseInt(req.body.comment_id)});

        if(delete_comment.status){
            response_data.status = true;
            response_data.result = delete_comment.result;
        }
        else{
            response_data.message = delete_comment.message;
        }

        res.json(response_data);
    }
}

module.exports = PostController;