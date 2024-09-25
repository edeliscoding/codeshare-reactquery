// // File: models/Snippet.js
// import mongoose from "mongoose";

// const SnippetSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Please provide a title for this snippet."],
//       maxlength: [60, "Title cannot be more than 60 characters"],
//     },
//     code: {
//       type: String,
//       required: [true, "Please provide the code for this snippet."],
//     },
//     language: {
//       type: String,
//       required: [true, "Please specify the programming language."],
//     },
//     isPublic: {
//       type: Boolean,
//       default: true,
//     },
//     // userId: {
//     //   type: String,
//     //   required: [true, "User ID is required"],
//     // },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   },

//   {
//     timestamps: true,
//   }
// );

// export default mongoose.models.Snippet ||
//   mongoose.model("Snippet", SnippetSchema);

// File: models/Snippet.js
import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this snippet."],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    code: {
      type: String,
      required: [true, "Please provide the code for this snippet."],
    },
    language: {
      type: String,
      required: [true, "Please specify the programming language."],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Snippet ||
  mongoose.model("Snippet", SnippetSchema);
