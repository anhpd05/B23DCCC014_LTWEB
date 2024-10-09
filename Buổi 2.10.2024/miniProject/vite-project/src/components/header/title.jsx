import { Typography } from "antd";

const TitlePage = () => {
  return (
    <Typography.Title
      level={2}
      style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "#1890ff",
      }}
    >
      Quản Lý Công Việc{" "}
      <span role="img" aria-label="target">
        📝
      </span>
    </Typography.Title>
  );
};
export default TitlePage;
