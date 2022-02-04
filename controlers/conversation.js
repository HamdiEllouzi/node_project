const conversationSchema = require("../models/conversation");
const messageSchema = require("../models/message");

exports.createConversation = async (req, res) => {
  const newConversation = new conversationSchema({
    members: [req.userId, req.body.receiverId],
  });
  try {
    const conv = await conversationSchema.find({ members: [req.userId, req.body.receiverId] });
    if (conv.length !== 0) {
      res.status(400).json({ message: "conversation already exists" });
    } else {
      const saveConversation = await newConversation.save();
      res.status(201).json(saveConversation);
    }
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

exports.deleteConversation = async (req, res, next) => {
  const conversationId = req.params.conversationId;
  try {
    const conversation = await conversationSchema.findById(conversationId);
    if (!conversation) throw "Conversation not found";
    if (conversation.members[0].toString() !== req.userId) throw "request not authorized";
    await conversationSchema.deleteOne({ _id: conversationId });
    await messageSchema.deleteMany({ conversationId: conversationId });
    res.status(200).json("conversation deleted");
  } catch (error) {
    res.status(500).json({ error });
  }
};
