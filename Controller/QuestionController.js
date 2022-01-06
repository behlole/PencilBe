const {Questions} = require("../Model/Question");
const {Topic} = require("../Model/Topic");
module.exports = {
    index: async (req, res) => {
        res.send({Question: await Questions.find({}), message: "Question Successfully Added"}).status(200);
    },
    create: async (req, res) => {
        // if(req.body)
        try {
            let questions = await Questions.create(req.body).catch((error) => {
                res.send(error.message);
            })
            res.send({Question: questions, message: "Question Successfully Added"}).status(200);
        } catch (e) {
            res.send({message: "Error has occurred", error: e.message}).status(200);

        }
    },
    search: async (req, res) => {
        // res.send(req.query.search);
        let topics = await Topic.findOne({topic_name: req.query.search}).lean();
        if (topics) {
            let topics_ids = [];
            topics_ids.push(String(topics._id))
            await getChilds(String(topics._id), topics_ids);
            let questions = [];
            for (const ques of topics_ids) {
                try {
                    const queses = await Questions.find({topic_id: ques}).lean();
                    for (let i = 0; i < queses.length; i++) {
                        questions.push(String(queses[i].question));
                    }

                } catch (e) {
                    console.log(e);
                }

            }
            res.send({Topic_Ids: topics_ids, Questions: questions, message: "Topics Fetched Successfully"});
        } else
            res.send({message: "No Record Found Successfully"});
    },
    update: async (req, res) => {
        try {
            let Question = await Questions.findOne({_id: req.params.id}).update(req.body);
            res.send({Questions: Question, message: "Questions Updated Successfully"});
        } catch (e) {
            res.send({message: "Error has occurred", error: e.message}).status(200);
        }
    },
    delete: async (req, res) => {
        try {
            let Question = await Questions.deleteOne({_id: req.params.id});
            res.send({Questions: Question, message: "Questions Deleted Successfully"});
        } catch (e) {
            res.send({message: "Error has occurred", error: e.message}).status(200);
        }
    }
}

async function getChilds(id, topics_array) {
    let topics = await Topic.find({parent_id: id}).sort({name: 1}).lean()
    if (topics.length > 0)
        for (let i = 0; i < topics.length; i++) {
            if (!topics_array.includes(String(topics[i]._id)))
                topics_array.push(String(topics[i]._id));
            await getChilds(String(topics[i]._id), topics_array);
            if (i + 1 < topics.length) {
                if (!topics_array.includes(String(topics[i + 1]._id)))
                    topics_array.push(String(topics[i + 1]._id));
                await getChilds(String(topics[i + 1]._id), topics_array);
            }
        }
    else
        return topics_array;
}
