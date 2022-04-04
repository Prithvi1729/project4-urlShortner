const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://group-project:hI0Hyzj3TPK3cVYp@project.xqpst.mongodb.net/group08Database", { useNewUrlParser: true })
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err))




app.use('/', route);


 

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


