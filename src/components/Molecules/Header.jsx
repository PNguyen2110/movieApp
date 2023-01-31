import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuanLyNguoiDung } from "../../storeToolKit/quanLyNguoiDung";
import { HeartOutlined, DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
export const Header = () => {
  const { t, i18n } = useTranslation();
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  const { userLogin } = useQuanLyNguoiDung();
  const [user, setUser] = useState(false);
  const [nav, setNav] = useState(1);
  const navigate = useNavigate();

  return (
    <header className="p-4 bg-black bg-opacity-40  text-white fixed w-full z-10 header ">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="	https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="cyberlearn.vn"
          />
        </NavLink>
        <ul
          className="items-stretch hidden ul space-x-3 lg:flex"
          style={{ fontSize: "15px" }}
        >
          <li className="flex">
            <NavLink
              className="flex items-center px-4 -mb-1 text-white font-medium "
              to="/home"
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              className="flex items-center px-4 -mb-1   text-white  font-medium "
              to="/news"
            >
              {t("news")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              className="flex items-center px-4 -mb-1   text-white  font-medium"
              to="/contact"
            >
              {t("contact")}
            </NavLink>
          </li>
        </ul>
        <div
          className="items-center flex-shrink-0 hidden lg:flex"
          style={{ fontSize: "15px" }}
        >
          <button
            className="self-center px-8 py-3
           "
          >
            {localStorage.getItem("USER_LOGIN") ? (
              <Component>
                <span
                  title="Click để xem thông tin"
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  <span className="text-red-600 ">
                    <HeartOutlined style={{ top: "-28px" }} />
                  </span>{" "}
                  {t("hi")} {userLogin.hoTen}
                  <span className="text-red-600 ">
                    <HeartOutlined style={{ top: "-28px" }} />
                  </span>{" "}
                </span>
                <span>
                  <span className="dropdown ">
                    <DownOutlined />

                    <div
                      className="dropdown-content border border-pink-400 rounded-lg"
                      onClick={() => {
                        localStorage.removeItem("USER_LOGIN");

                        setUser(!user);
                      }}
                    >
                      <p className="text-violet-700 mb-0 font-semibold">
                        Log Out
                      </p>
                    </div>
                  </span>
                </span>
              </Component>
            ) : (
              <NavLink to="login" className="text-white">
                {t("signin")}
              </NavLink>
            )}
          </button>
          <button className="self-center px-8 py-3  ">
            <NavLink to="register" className="text-white">
              {t("signup")}
            </NavLink>
          </button>

          <Select
            defaultValue="en"
            style={{
              width: 100,
              color: "red",
              borderRadius: "5px",
            }}
            onChange={handleChange}
            options={[
              {
                value: "en",
                label: "English",
              },
              {
                value: "vi",
                label: "Việt Nam",
              },
              {
                value: "chi",
                label: "Trung Quốc",
              },
            ]}
          />
        </div>
        <button
          className="p-4 lg:hidden"
          onClick={() => {
            setNav(nav + 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div style={{ display: `${nav % 2 === 0 ? "block" : "none"}` }}>
        <div className="lg:hidden">
          <div className="flex justify-center">
            <div className="pt-4 text-center">
              <ul id="navList" style={{ fontSize: "15px", marginBottom: "0" }}>
                <li className="mb-1">
                  <NavLink
                    className="home items-center px-4 -mb-1 text-white font-medium "
                    to="/home"
                    onClick={() => {
                      setNav(nav + 1);
                    }}
                  >
                    {t("home")}
                  </NavLink>
                </li>
                <li className="mb-1">
                  <NavLink
                    className=" items-center px-4 -mb-1   text-white  font-medium "
                    to="/news"
                    onClick={() => {
                      setNav(nav + 1);
                    }}
                  >
                    {t("news")}
                  </NavLink>
                </li>
                <li className="mb-1">
                  <NavLink
                    className=" items-center px-4 -mb-1   text-white  font-medium"
                    to="/contact"
                    onClick={() => {
                      setNav(nav + 1);
                    }}
                  >
                    {t("contact")}
                  </NavLink>
                </li>
              </ul>
              <div
                className=" items-center px-4 mb-1"
                style={{ fontSize: "15px" }}
              >
                <button>
                  {localStorage.getItem("USER_LOGIN") ? (
                    <Component>
                      <div className="acount">
                        <span
                          title="Click để xem thông tin"
                          onClick={() => {
                            navigate("/user");
                            setNav(nav + 1);
                          }}
                        >
                          <span className="text-red-600 ">
                            <HeartOutlined style={{ top: "-28px" }} />
                          </span>{" "}
                          {t("hi")} {userLogin.hoTen}
                          <span className="text-red-600 ">
                            <HeartOutlined style={{ top: "-28px" }} />
                          </span>{" "}
                        </span>
                        <span>
                          <span className="dropdown ">
                            <DownOutlined />

                            <div
                              className="dropdown-content border border-pink-400 rounded-lg "
                              onClick={() => {
                                localStorage.removeItem("USER_LOGIN");

                                setUser(!user);
                                setNav(nav + 1);
                              }}
                            >
                              <p className="text-violet-700 mb-0 font-semibold ">
                                Log Out
                              </p>
                            </div>
                          </span>
                        </span>
                      </div>
                    </Component>
                  ) : (
                    <NavLink
                      to="login"
                      className="text-white"
                      onClick={() => {
                        setNav(nav + 1);
                      }}
                    >
                      {t("signin")}
                    </NavLink>
                  )}
                </button>
                <br />
                <button className="my-1">
                  <NavLink
                    to="register"
                    className="text-white "
                    onClick={() => {
                      setNav(nav + 1);
                    }}
                  >
                    {t("signup")}
                  </NavLink>
                </button>
                <br />
                <Select
                  defaultValue="en"
                  style={{
                    width: 100,
                    color: "red",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "en",
                      label: "English",
                    },
                    {
                      value: "vi",
                      label: "Việt Nam",
                    },
                    {
                      value: "chi",
                      label: "Trung Quốc",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
const Component = styled.div`
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 8px 16px;
    z-index: 1;
    left: -80px;
    margin-top: -2px;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;
export default Header;
