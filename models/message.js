const mongoose = require("mongoose");

const messageScheam = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
    },
    sender: {
      type: String,
    },
    msg: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Messages", messageScheam);
