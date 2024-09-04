import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoginOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import UserCreate from "./UserCre";
import UserUpdate from "./userUpdate";
import UserDetail from "./userDetail";
// import ModalUpdate from "./modalCreate";

const TableUser = () => {
  const data = [
    {
      id: "1",
      fullName: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      bod: "5/7/2005",
    },
    {
      id: "2",
      fullName: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      bod: "2/7/2005",
    },
    {
      id: "3",
      fullName: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      bod: "22/7/2005",
    },
  ];
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  let dataLocalJSON = localStorage.getItem("user");
  let dataLocalReal = JSON.parse(dataLocalJSON);
  // if (dataLocalReal.length < 1) {
  //   dataLocalJSON = localStorage.setItem("user", JSON.stringify(data));
  //   dataLocalReal = JSON.parse(dataLocalJSON);
  // }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataAllUser, setDataAllUser] = useState(dataLocalReal);
  const [userDetail, setUserDetail] = useState();
  const [isModalOpenCre, setIsModalOpenCre] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(dataAllUser);
  localStorage.setItem("user", JSON.stringify(dataAllUser));
  const [open, setOpen] = useState(false);

  // console.log(dataLocalReal);

  useEffect(() => {
    setDataAllUser(dataLocalReal);
  }, []);
  const handleClickDelete = (record) => {
    console.log(record);
    let index = dataAllUser.filter((obj) => obj.id !== record.id);
    console.log(index);
    setDataAllUser(index);
    localStorage.setItem("user", JSON.stringify(index));
  };
  const downloadExcel = (data) => {
    if (dataAllUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "Dữ liệu Sinh Viên.xlsx");
    } else {
      alert("Không có dữ liệu user.");
    }
  };
  const columns = [
    {
      title: "ID ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tuổi ",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Ngày sinh",
      dataIndex: "bod",
      key: "bod",
    },
    {
      title: "Quê Quán",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <div
              style={{ color: "orange", fontSize: "19px", cursor: "pointer" }}
            >
              <EditOutlined
                onClick={() => {
                  setIsModalOpen(true);
                  setDataUpdate(record);
                }}
              />
            </div>
            <div style={{ color: "red", cursor: "pointer", fontSize: "19px" }}>
              <Popconfirm
                title="Delete User"
                description="Bạn có chắc chắn muốn xóa!"
                onConfirm={() => {
                  handleClickDelete(record);
                }}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>
            </div>
            <div
              style={{ color: "while", cursor: "pointer", fontSize: "19px" }}
            >
              <EyeOutlined
                onClick={() => {
                  setUserDetail(record);
                  setOpen(true);
                }}
              />
            </div>
          </Space>
        </>
      ),
    },
  ];

  const title = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <b>Danh Sách Sinh Viên</b>
        </span>
        <span style={{ display: "flex", gap: "15px" }}>
          <span>
            <Button
              onClick={() => downloadExcel(dataAllUser)}
              icon={<LoginOutlined />}
              type="primary"
            >
              Export
            </Button>
          </span>
          <span>
            <Button
              onClick={() => {
                setIsModalOpenCre(true);
              }}
              icon={<PlusOutlined />}
              type="primary"
            >
              Thêm mới
            </Button>
          </span>
        </span>
      </div>
    );
  };
  return (
    <>
      <Table
        bordered
        title={() => title()}
        columns={columns}
        dataSource={dataAllUser}
        rowKey={"id"}
      />
      <UserUpdate
        setIsModalOpenCre={setIsModalOpenCre}
        dataAllUser={dataAllUser}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        setDataAllUser={setDataAllUser}
      />
      <UserCreate
        isModalOpenCre={isModalOpenCre}
        setIsModalOpenCre={setIsModalOpenCre}
        dataAllUser={dataAllUser}
        setDataAllUser={setDataAllUser}
      />
      <UserDetail
        open={open}
        setOpen={setOpen}
        setUserDetail={setUserDetail}
        userDetail={userDetail}
      />
    </>
  );
};

export default TableUser;
