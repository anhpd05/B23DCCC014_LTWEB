import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Select, List, Modal, message, Space, Tag, Spin } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import PaginationPage from "./components/footer/pagination";
import ProcessPage from "./components/footer/process";
import Statistical from "./components/main/statistical";
import { DEFAULT_TASK } from "./helper/format";
import TitlePage from "./components/header/title";
import AddTask from "./components/main/addTask";

const { Option } = Select;
const { confirm } = Modal;

const App = () => {
  const DEFAULT_TASKS = DEFAULT_TASK;
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState(null);
  const [newPriority, setNewPriority] = useState("medium");
  const [newCategory, setNewCategory] = useState("học tập");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Thêm state cho phân trang và loading
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  // Khởi tạo state với dữ liệu từ localStorage hoặc default tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        return Array.isArray(parsedTasks) ? parsedTasks : DEFAULT_TASKS;
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        return DEFAULT_TASKS;
      }
    }
    // Nếu không có dữ liệu trong localStorage, lưu DEFAULT_TASKS và trả về
    localStorage.setItem("tasks", JSON.stringify(DEFAULT_TASKS));
    return DEFAULT_TASKS;
  });

  // useEffect để lưu tasks vào localStorage mỗi khi tasks thay đổi
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Tính toán thống kê
  const statistics = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "done").length,
    pending: tasks.filter((task) => task.status === "todo").length,
    rejected: tasks.filter((task) => task.status === "reject").length,
  };

  // Lọc tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    const matchesCategory =
      filterCategory === "all" || task.category === filterCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Hàm xóa task với cập nhật localStorage
  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    message.success("Đã xóa công việc thành công!");
  };

  // Hàm xác nhận xóa
  const showDeleteConfirm = (taskId, taskText) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa công việc này?",
      icon: <ExclamationCircleOutlined />,
      content: `Task: "${taskText}"`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleDelete(taskId);
      },
    });
  };

  // Hàm cập nhật trạng thái task với localStorage
  const updateTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    message.success("Đã cập nhật trạng thái!");
  };

  // Hàm thêm task mới với việc lưu vào localStorage
  const addTask = () => {
    if (newTask.trim() !== "" && newDate) {
      const newTaskItem = {
        id: Date.now(),
        text: newTask,
        date: newDate.format("YYYY-MM-DD"),
        status: "todo",
        priority: newPriority,
        category: newCategory,
      };

      const updatedTasks = [...tasks, newTaskItem];
      setTasks(updatedTasks);

      // Reset form
      setNewTask("");
      setNewDate(null);
      setNewPriority("medium");
      setNewCategory("học tập");

      message.success("Đã thêm công việc mới!");
    } else {
      message.warning("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  // Tính toán tasks đã được phân trang
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTasks.slice(startIndex, endIndex);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "blue";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return (
          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "20px" }} />
        );
      case "reject":
        return (
          <CloseCircleOutlined style={{ color: "#f5222d", fontSize: "20px" }} />
        );
      default:
        return (
          <MinusCircleOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
        );
    }
  };

  const getDateColor = (dateString) => {
    const today = new Date();
    const taskDate = new Date(dateString);
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (diffDays < 0) return "#f5222d";
    if (diffDays === 0) return "#fa8c16";
    if (diffDays <= 3) return "#faad14";
    if (diffDays <= 7) return "#52c41a";
    return "#1890ff";
  };

  const formatDate = (dateString) => {
    const today = new Date();
    const taskDate = new Date(dateString);
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (diffDays < 0) return "Quá hạn";
    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Ngày mai";
    if (diffDays < 7) return `Còn ${diffDays} ngày`;
    return taskDate.toLocaleDateString("vi-VN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <TitlePage />

        {/* Thống kê */}
        <Statistical statistics={statistics} />

        {/* Form thêm công việc mới */}
        <AddTask
          newTask={newTask}
          setNewTask={setNewTask}
          newDate={newDate}
          setNewDate={setNewDate}
          newPriority={newPriority}
          setNewPriority={setNewPriority}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          addTask={addTask}
        />
        {/* Thanh tìm kiếm và lọc */}
        <div style={{ marginBottom: "20px" }}>
          <Space wrap>
            <Search
              placeholder="Tìm kiếm công việc..."
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)}
              style={{ width: 120 }}
              placeholder="Trạng thái"
            >
              <Option value="all">Tất cả</Option>
              <Option value="todo">Cần làm</Option>
              <Option value="done">Hoàn thành</Option>
              <Option value="reject">Đã hủy</Option>
            </Select>
            <Select
              value={filterPriority}
              onChange={(value) => setFilterPriority(value)}
              style={{ width: 120 }}
              placeholder="Độ ưu tiên"
            >
              <Option value="all">Tất cả</Option>
              <Option value="high">Cao</Option>
              <Option value="medium">Trung bình</Option>
              <Option value="low">Thấp</Option>
            </Select>
            <Select
              value={filterCategory}
              onChange={(value) => setFilterCategory(value)}
              style={{ width: 120 }}
              placeholder="Danh mục"
            >
              <Option value="all">Tất cả</Option>
              <Option value="học tập">Học tập</Option>
              <Option value="công việc">Công việc</Option>
              <Option value="cá nhân">Cá nhân</Option>
            </Select>
          </Space>
        </div>
        {/* Danh sách công việc */}
        <Spin spinning={loading} tip="Đang tải...">
          <List
            itemLayout="horizontal"
            dataSource={getPaginatedData()} // Thay đổi từ filteredTasks sang getPaginatedData()
            locale={{
              emptyText: "Chưa có công việc nào! Hãy thêm công việc mới.",
            }}
            renderItem={(task) => (
              <List.Item
                style={{
                  padding: "16px",
                  marginBottom: "8px",
                  background: task.status === "done" ? "#f6ffed" : "#fff",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                actions={[
                  <Select
                    value={task.status}
                    style={{ width: 120 }}
                    onChange={(value) => updateTaskStatus(task.id, value)}
                  >
                    <Option value="todo">Cần làm</Option>
                    <Option value="done">Hoàn thành</Option>
                    <Option value="reject">Hủy bỏ</Option>
                  </Select>,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => showDeleteConfirm(task.id, task.text)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={getStatusIcon(task.status)}
                  title={
                    <Space>
                      <span
                        style={{
                          textDecoration:
                            task.status === "done" ? "line-through" : "none",
                          color: task.status === "reject" ? "#999" : "#000",
                        }}
                      >
                        {task.text}
                      </span>
                      <Tag color={getPriorityColor(task.priority)}>
                        {task.priority === "high"
                          ? "Cao"
                          : task.priority === "medium"
                          ? "Trung bình"
                          : "Thấp"}
                      </Tag>
                      <Tag color="blue">{task.category}</Tag>
                    </Space>
                  }
                  description={
                    <span style={{ color: getDateColor(task.date) }}>
                      {formatDate(task.date)}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </Spin>

        {/* Phân trang với nhiều tùy chọn hơn */}
        <PaginationPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setLoading={setLoading}
          filteredTasks={filteredTasks}
        />
        {/* Tiến độ tổng quát */}
        <ProcessPage statistics={statistics} />
      </div>
    </div>
  );
};

export default App;
