const messageSchema = require("../models/message");
const userSchema = require("../models/user");
const conversationSchema = require("../models/conversation");

exports.createMessage = async (req, res) => {
  try {
    const conversation = await conversationSchema.findById(req.body.conversationId);
    !conversation && res.status(400).json("conversation not found");
    conversation &&
      userSchema.findById(req.userId).then((user) => {
        const newMessage = new messageSchema({
          conversationId: req.body.conversationId,
          sender: req.userId,
          msg: req.body.msg,
          userName: `${user.userFirstName} ${user.userLastName}`,
          userImage: user.userImage,
        });
        newMessage
          .save()
          .then((msg) => {
            res.status(201).json({ msg, message: "Message created" });
          })
          .catch((err) => res.status(400).json({ err }));
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const message = await messageSchema.find({ conversationId: req.params.conversationId });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ err });
  }
};
