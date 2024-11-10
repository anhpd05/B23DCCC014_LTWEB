// Model cho công việc cần làm
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Bắt buộc phải có
    },
    completed: {
      type: Boolean,
      default: false, // Mặc định là chưa hoàn thành
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Liên kết với người dùng
    },
  },
  {
    timestamps: true, // Tự động thêm thời gian tạo/cập nhật
  }
);

module.exports = mongoose.model("Todo", todoSchema);
