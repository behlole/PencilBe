const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    topic_name: {
        type: String,
        required: true,
    },
    parent_id: {
        type: String,
        required: false,
    }

});

exports.Topic = new mongoose.model("Topics", topicSchema);
