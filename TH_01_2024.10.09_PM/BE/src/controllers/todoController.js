const Todo = require("../model/todos");

// Lấy danh sách công việc
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo công việc mới
exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      user: req.user.id,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật công việc
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.user.toString() === req.user.id) {
      todo.title = req.body.title || todo.title;
      todo.completed = req.body.completed ?? todo.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: "Không tìm thấy công việc" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa công việc
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.user.toString() === req.user.id) {
      await todo.remove();
      res.json({ message: "Đã xóa công việc" });
    } else {
      res.status(404).json({ message: "Không tìm thấy công việc" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
