const messageSchema = require("../models/message");
const userSchema = require("../models/user");

exports.createMessage = (req, res) => {
  userSchema.findById(req.body.sender).then((user) => {
    const newMessage = new messageSchema({
      conversationId: req.body.conversationId,
      sender: req.body.sender,
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
};

exports.getMessage = async (req, res) => {
  try {
    const message = await messageSchema.find({
      conversationId: req.params.conversationId,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ err });
  }
};
