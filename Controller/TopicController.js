const {Topic} = require("../Model/Topic");
const TopicController = require("./TopicController");
module.exports = {
    index: async (req, res) => {
        res.send({topic: await Topic.find({}), message: "Topic Successfully Fetched"}).status(200);
    },
    create: async (req, res) => {
        try {
            let topic = await Topic.create(req.body).catch((error) => {
                res.send(error.message);
            })
            res.send({topic: topic, message: "Topic Successfully Added"}).status(200);
        } catch (e) {
            res.send({message: "Error has occurred", error: e.message}).status(200);

        }
    },
    search: async (req, res) => {
        let topics = await Topic.find({topic_name: req.query.search});
        if (topics)
            res.send({topics: topics, message: "Topics Fetched Successfully"});
        else
            res.send({message: "No Record Found Successfully"});
    },
    update: async (req, res) => {
        try {
            let topic = await Topic.findOne({_id: req.params.id}).update(req.body);
            res.send({topics: topic, message: "Topics Updated Successfully"});
        } catch (e) {
            res.send({message: "Error has occurred", error: e.message}).status(200);
        }
    },
    delete: async (req, res) => {
        let topics = [];
        try {
            if (req.params.id) {
                let topics = [];
                topics.push(req.params.id);
                let new_topic = await getChilds(req.params.id, topics);

                res.send({topic_id: topics})
            } else {
                res.send({message: 'Id is required'});
            }
        } catch (e) {
            res.send({message: "Error has occurred", error: e.message}).status(200);
        }
    },

}

async function getChilds(id, topics_array) {
    let topics = await Topic.find({parent_id: id}).sort({name: 1}).lean()
    if (topics.length != 0) {
        topics.forEach((single_child) => {
            let single_child_id = String(single_child._id);
            topics_array.push(single_child_id);
            return getChilds(single_child_id, topics_array);
        })
    } else {
        return topics_array;
    }
}
