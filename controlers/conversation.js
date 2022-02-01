const conversationSchema = require("../models/conversation");

exports.createConversation = async (req, res) => {
  const newConversation = new conversationSchema({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const saveConversation = await newConversation.save();
    res.status(201).json(saveConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getConversation = async (req, res) => {
  try {
    const Conversation = await conversationSchema.find({
      members: { $in: [req.params.userId] },
    });
    res.status(201).json(Conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};
