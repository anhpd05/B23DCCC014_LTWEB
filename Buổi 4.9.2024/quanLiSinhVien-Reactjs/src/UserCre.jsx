import { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
const ModalCre = (props) => {
  const [form] = Form.useForm();
  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const { isModalOpenCre, dataAllUser, setIsModalOpenCre, setDataAllUser } =
    props;

  const handleOk = () => {
    // setIsModalOpenCre(false);
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpenCre(false);
  };
  const onFinish = (values) => {
    values.id = randomIntFromInterval(1, 9999999);
    console.log("Success:", values);
    setDataAllUser([...dataAllUser, values]);
    localStorage.setItem("user", JSON.stringify(dataAllUser));
    form.resetFields();
    setIsModalOpenCre(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // console.log(dataAllUser);
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpenCre}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
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
              {
                max: 100,
                message: "Hãy nhập chính xác tuổi",
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
export default ModalCre;
