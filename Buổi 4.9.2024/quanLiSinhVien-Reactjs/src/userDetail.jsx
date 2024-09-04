import { Badge, Descriptions, Drawer } from "antd";

const UserDetail = (props) => {
  const { open, setOpen, userDetail, setUserDetail } = props;
  return (
    <>
      <Drawer
        width={"45vw"}
        title="Thông tin chi tiết"
        onClose={() => setOpen(false)}
        open={open}
      >
        <>
          {userDetail ? (
            <Descriptions title="User Info" bordered column={2}>
              <Descriptions.Item label="ID">{userDetail.id}</Descriptions.Item>
              <Descriptions.Item label="Tên hiển thị">
                {userDetail.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {userDetail.bod}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {userDetail.address}
              </Descriptions.Item>
              <Descriptions.Item label="tuổi">
                {userDetail.age}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={2}>
                <Badge status="processing" text="Hoạt dộng" />
              </Descriptions.Item>
            </Descriptions>
          ) : (
            []
          )}
        </>
      </Drawer>
    </>
  );
};
export default UserDetail;
