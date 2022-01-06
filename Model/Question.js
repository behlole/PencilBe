const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    topic_id: {
        type: String,
        required: true,
    }

});

exports.Questions = new mongoose.model("Questions", questionSchema);
