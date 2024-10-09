import { Progress, Typography } from "antd";

const ProcessPage = (props) => {
  const { statistics } = props;
  return (
    <>
      <div style={{ marginTop: "24px" }}>
        <Typography.Title level={4}>Tiến độ tổng quát</Typography.Title>
        <Progress
          percent={Math.round((statistics.completed / statistics.total) * 100)}
          status="active"
          strokeColor={{
            from: "#108ee9",
            to: "#87d068",
          }}
        />
      </div>
    </>
  );
};
export default ProcessPage;
