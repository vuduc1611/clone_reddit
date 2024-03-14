const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const messageController = {
    createMessage: async (req, res) => {
        const newMsg = new Message(req.body);
        try {
            const savedMsg = newMsg.save();
            await Conversation.findOneAndUpdate(
                {
                    _id: req.body.conversationId
                },
                {
                    $inc: {messageCount: 1}
                }
            );
            res.status(200).json(savedMsg);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getMessage: async (req, res) => {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId
            });
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = messageController;