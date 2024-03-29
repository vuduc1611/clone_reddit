const Conversation = require("../models/Conversation");

const conversationController = {
    createConversation: async (req, res) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })
        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getConversation: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: {$in: [req.params.userId]}
            })
            res.status(200).json(conversation);
        } catch (error) {
            res.status(500).json(error);
        }

    },
    getAvailableConversation: async (req, res) => {
        try {
            const conversation = await Conversation.findOne({
                members: {$all: [req.params.first, req.params.second]}
            });
            res.status(200).json(conversation);
        } catch (error) {
            res.status(500).json(error);
        }
    }   
};

module.exports = conversationController;