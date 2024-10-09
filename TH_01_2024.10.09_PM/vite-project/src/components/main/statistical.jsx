import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
const Statistical = (props) => {
  const { statistics } = props;
  return (
    <>
      <Row gutter={16} style={{ marginBottom: "24px", marginLeft: "74px" }}>
        <Col span={6}>
          <Statistic
            title="Tổng số công việc"
            value={statistics.total}
            prefix={<FilterOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Đã hoàn thành"
            value={statistics.completed}
            prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Đang thực hiện"
            value={statistics.pending}
            prefix={<MinusCircleOutlined style={{ color: "#1890ff" }} />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Đã hủy"
            value={statistics.rejected}
            prefix={<CloseCircleOutlined style={{ color: "#f5222d" }} />}
          />
        </Col>
      </Row>
    </>
  );
};
export default Statistical;
