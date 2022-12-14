const { Schema, model } = require("mongoose");
require("./User.model");

const PostSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    pinned: Boolean, //pinned post or not.
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    redweedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }], //its an array of users
    redweedPost: { type: Schema.Types.ObjectId, ref: "Post" }, //id of the post that is being redweeded
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    }, //To keep track postID that we are replying to
    pinned: Boolean, // pin the post.
  },
  // this second object adds extra properties: `createdAt` and `updatedAt`

  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
