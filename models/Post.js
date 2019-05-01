const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        match: /^.{1,100}$/
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

Post.getPost = (page, PageConstant) => {
    return Post.find({})
        .skip((PageConstant * page) - PageConstant)
        .limit(PageConstant)
        .exec();
};

module.exports = Post;