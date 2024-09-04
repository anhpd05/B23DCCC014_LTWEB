import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
const UserUpdate = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    dataUpdate,
    setDataUpdate,
    setDataAllUser,
    dataAllUser,
  } = props;
  const [form1] = Form.useForm();

  const handleOk = () => {
    // setIsModalOpen(false);
    form1.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDataUpdate([]);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(dataUpdate);
    console.log(values.id);
    let index = dataAllUser.findIndex((obj) => obj.id === values.id);
    if (index !== -1) {
      dataAllUser[index] = {
        ...dataAllUser[index],
        id: values.id,
        fullName: values.fullName,
        address: values.address,
        bod: values.bod,
        age: values.age,
      };
    }
    console.log(index);
    console.log(dataAllUser);

    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (dataUpdate) {
      form1.setFieldsValue({
        id: dataUpdate.id,
        fullName: dataUpdate.fullName,
        age: dataUpdate.age,
        bod: dataUpdate.bod,
        address: dataUpdate.address,
      });
    }
  }, [dataUpdate]);
  // console.log(dataUpdate);
  return (
    <>
      <Modal
        forceRender
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form1}
          name="basic"
          layout="vertical"
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your id!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Tên hiển thị"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tuổi"
            name="age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="bod"
            rules={[
              {
                required: true,
                message: "Please input your bod!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quê quán"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserUpdate;
