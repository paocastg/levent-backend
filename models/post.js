const mongoose = require("mongoose");

const postFields = {
  company: {
    type: String,
    required: [true, "Por favor indica la empresa"],
    trim: true,
    maxLength: 25,
  },
  category: {
    type: String,
    required: [true, "Por favor indica la categoria"],
    trim: true,
    maxLength: 25,
  },
  ubication: {
    type: String,
    required: [true, "Por favor indica la ubicación"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Por favor indica la descripción"],
    trim: true,
  },
  mainPhoto: {
    type: Number,
    default: 0,
  },
  links: {
    facebook: {
      type: String,
      trim: true,
      required: [true, "Por favor indica el link de facebook"],
    },
    instagram: {
      type: String,
      trim: true,
      required: [true, "Por favor indica  el link de instagram"],
    },
    page: {
      type: String,
      required: [true, "Por favor indica el  el link de la pagina"],
      trim: true,
    },
  },
  rate: {
    type: String,
    trim: true,
    maxLength: 50,
  },

  photos: [String],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Por favor indica el usuario"],
  },
};

const postSchema = new mongoose.Schema(postFields, { timestamps: true });

postSchema.post("save", function (doc, next) {
  doc.populate("user", { username: 1, email: 1, number: 1 }).then(function () {
    next();
  });
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post, postFields };
