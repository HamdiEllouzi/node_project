const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("conversations", conversationSchema);
