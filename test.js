const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {userNewUrlParser: true});

BlogPost.create({
    title: 'The Mythbuster\'s Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense...' 
}, (error, blogpost) => {
    console.log(error, blogpost)
})

BlogPost.find({
    title:'The Mythbuster\'s Guide to Saving Money on Energy Bills'
}, (error, blogspot) => {
    console.log(error, blogspot)
})