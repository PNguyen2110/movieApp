import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachNguoiDung,
  timKiemNguoiDung,
  xoaNguoiDung,
} from "../../../storeToolKit/quanLyNguoiDung";
import { useNavigate } from "react-router-dom";
// const data = danhSachNguoiDung;
const { Search } = Input;
const QuanLiNguoiDung = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(layDanhSachNguoiDung());
  }, []);
  const { danhSachNguoiDung } = useSelector(
    (state) => state.quanLyNguoiDungReducer
  );
  console.log("danhSachNguoiDung", danhSachNguoiDung);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
  };
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: "15%",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      width: "15%",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      width: "15%",
    },
    {
      title: "Thao tác",
      dataIndex: "thaotac",
      render: (text, data) => {
        return (
          <React.Fragment key={Date.now()}>
            <button
              onClick={() => {
                const user = danhSachNguoiDung.find(
                  (item) => item.taiKhoan === data.taiKhoan
                );
                localStorage.setItem("user", JSON.stringify(user));
                navigate(`/admin/chinhSuaNguoiDung/${data.taiKhoan}`);
              }}
              title="chỉnh sửa"
              className="text-2xl text-blue-500"
            >
              <EditOutlined />
            </button>
            <button
              title="Xoá"
              className="ml-3 text-2xl text-red-400"
              onClick={() => dispatch(xoaNguoiDung(data.taiKhoan))}
            >
              <DeleteOutlined />
            </button>
          </React.Fragment>
        );
      },
      width: "10%",
    },
  ];
  const data = danhSachNguoiDung;
  console.log(data);

  const onSearch = (value) => {
    dispatch(layDanhSachNguoiDung(value));
  };
  return (
    <>
      <button
        onClick={() => navigate("/admin/themNguoiDung")}
        className="text-1xl mb-5 bg-blue-400 text-white p-3 rounded-md"
      >
        {t("adduser")}
      </button>
      <br />
      <Search
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
        allowClear
      />
      <Table rowKey="taiKhoan" columns={columns} dataSource={data} bordered />
    </>
  );
};
export default QuanLiNguoiDung;
