import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("User Info", "thongTinCaNhan", <UserOutlined />),
  getItem("Booking history", "lichSuDatVe", <FileOutlined />),
];
const UserTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            className="logo"
            style={{
              height: "32px",
              margin: "16px",
              // background: "rgba(255, 255, 255, 0.3)",
            }}
          >
            <h1
              style={{ cursor: "pointer" }}
              className="text-blue-400 text-[100%] lg:text-[150%] text-center"
              onClick={() => navigate("/home")}
            >
              Profile
            </h1>
          </div>
          <Menu
            onClick={(item) => {
              console.log(item.key);
              if (item.key === "thongTinCaNhan") {
                navigate("/user/thongTinCaNhan");
              } else if (item.key === "lichSuDatVe") {
                navigate("/user/lichSuDatVe");
              }
            }}
            theme="dark"
            defaultSelectedKeys={["thongTinCaNhan"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          {/* <Header
            className="site-layout-background"
            style={{ padding: 0, background: "#fff" }}
          /> */}
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360, background: "#fff" }}
            >
              <Outlet />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </>
  );
};
export default UserTemplate;
