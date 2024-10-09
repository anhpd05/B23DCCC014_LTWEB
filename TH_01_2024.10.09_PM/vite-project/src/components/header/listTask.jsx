import { Button, List, Select, Spin, Tag } from "antd";

const ListTask = (props) => {
  const { getPaginatedData } = props;
  return (
    <>
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
    </>
  );
};
export default ListTask;
