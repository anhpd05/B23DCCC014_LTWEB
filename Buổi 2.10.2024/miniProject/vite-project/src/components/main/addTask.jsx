import { Button, DatePicker, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const AddTask = (props) => {
  const {
    newTask,
    setNewTask,
    newDate,
    setNewDate,
    newPriority,
    setNewPriority,
    newCategory,
    setNewCategory,
    addTask,
  } = props;
  return (
    <div
      style={{
        marginBottom: "30px",
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Space.Compact style={{ width: "100%" }}>
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nhập công việc mới"
          prefix={<PlusOutlined />}
          style={{ width: "40%" }}
        />
        <DatePicker
          value={newDate}
          onChange={(date) => setNewDate(date)}
          placeholder="Chọn ngày"
          style={{ width: "20%" }}
        />
        <Select
          value={newPriority}
          onChange={(value) => setNewPriority(value)}
          style={{ width: "15%" }}
        >
          <Option value="high">Cao</Option>
          <Option value="medium">Trung bình</Option>
          <Option value="low">Thấp</Option>
        </Select>
        <Select
          value={newCategory}
          onChange={(value) => setNewCategory(value)}
          style={{ width: "15%" }}
        >
          <Option value="học tập">Học tập</Option>
          <Option value="công việc">Công việc</Option>
          <Option value="cá nhân">Cá nhân</Option>
        </Select>
        <Button type="primary" onClick={addTask} icon={<PlusOutlined />}>
          Thêm
        </Button>
      </Space.Compact>
    </div>
  );
};
export default AddTask;
