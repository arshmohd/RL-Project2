const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, //Validation directly on schema: It basically removes any spaces before inserting
    },

    lastName: {
      type: String,
      required: true,
      trim: true, //Validation directly on schema: It basically removes any spaces before inserting
    },

    userName: {
      type: String,
      required: true,
      trim: true, //Validation directly on schema: It basically removes any spaces before inserting
      unique: true,
    },

    gitHubUserName: {
      type: String,
      trim: true, //Validation directly on schema: It basically removes any spaces before inserting
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true, //Validation directly on schema: It basically removes any spaces before inserting
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    userAvatar: {
      type: String,
      default: "/images/userAvatar.png",
    },

    likes: [{ type: Schema.Types.ObjectId, ref: "Post" }], //likes array
    redweeds: [{ type: Schema.Types.ObjectId, ref: "Post" }], //redweed
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  { timestamps: true }
  // this second object adds extra properties: `createdAt` and `updatedAt`
);

const User = model("User", userSchema);

module.exports = User;
