const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Имя обязательно"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Телефон обязателен"],
      unique: true,
      minlength: [13, "Телефон должен быть ровно 13 символов"],
      maxlength: [13, "Телефон должен быть ровно 13 символов"],
    },
    email: {
      type: String,
      required: [true, "Email обязателен"],
      validate: {
        validator: function (v) {
          return v.includes("@");
        },
        message: (props) => `${props.value} не является валидным email! (должен содержать @)`,
      },
    },
    age: {
      type: Number,
      required: [true, "Возраст обязателен"],
      min: [10, "Возраст должен быть не меньше 10 лет"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
