const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const mongoose = require("mongoose");
require("dotenv/config");
const {Questions} = require("./Model/Question");
const {Topic} = require("./Model/Topic");
const topic_routes = require('./Routes/topic_routes');
const question_routes = require('./Routes/question_routes');

/**
 *  General Middleware for json responses.
 */
app.use(express.json());
app.use(cors());

/**
 *  Mongo Connection
 */
mongoose.connect('mongodb+srv://behloleaqil:a5121472z@meanstack.a8obi.mongodb.net/frontendBe', {useNewUrlParser: true})
    .then(() => {
        console.log("Database connected ..");
    })
    .catch((e) => {
        console.log("Database connection failed...", e.message);
    });
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/topic', topic_routes);
app.use('/question', question_routes);


app.listen(port, () => {
    console.log(`PencilBE at http://localhost:${port}`)
});
