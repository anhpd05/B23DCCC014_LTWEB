const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const router = express.Router();

router
  .route("/")
  .get(getTodos) // Lấy danh sách
  .post(createTodo); // Tạo mới

router
  .route("/:id")
  .put(updateTodo) // Cập nhật
  .delete(deleteTodo); // Xóa

module.exports = router;
