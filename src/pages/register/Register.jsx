import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dangKy } from "../../storeToolKit/quanLyNguoiDung";
import { useTranslation } from "react-i18next";
const Register = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({ mode: "onBlur" });
  let disabled;
  let cursor;

  if (isDirty) {
    disabled = false;
    cursor = "";
  } else {
    cursor = "cursor-not-allowed";
    disabled = true;
  }
  const handleUSerStorage = () => {
    if (localStorage.getItem("infoUser")) {
      return JSON.parse(localStorage.getItem("infoUser"));
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className=" pt-32 pb-12 bg-pink-200 bg-opacity-60">
      <div className=" p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 container">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-white">{t("signup")}</h1>
        </div>
        <form
          noValidate={true}
          className="space-y-12 ng-untouched ng-pristine ng-valid "
          onSubmit={handleSubmit((data) => {
            dispatch(dangKy({ ...data, maNhom: "GP13" }));
          })}
        >
          <div className="flex-col flex md:flex-row justify-center gap-5 items-center ">
            <div className=" w-[80%] flex flex-col px-[4rem]">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  {t("username")}
                </label>
                <input
                  type="text"
                  name="taiKhoan"
                  id="taiKhoan"
                  placeholder="Enter Your UserName"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  {...register("taiKhoan", {
                    required: "* Vui l??ng nh???p th??ng tin",
                  })}
                />
                <p className="text-red-400 mt-0 errors">
                  {errors?.taiKhoan?.message}
                </p>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    {t("password")}
                  </label>
                </div>
                <input
                  type="password"
                  name="matKhau"
                  id="matKhau"
                  placeholder="Enter Your Password"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  {...register("matKhau", {
                    required: "* Vui l??ng nh???p th??ng tin",
                    minLength: {
                      value: 5,
                      message: "M???t kh???u ph???i c?? ????? d??i t??? 5-10 k?? t???",
                    },
                    maxLength: {
                      value: 10,
                      message: "M???t kh???u ph???i c?? ????? d??i t??? 5-10 k?? t???",
                    },
                  })}
                />
                <p className="text-red-400 mt-0 errors">
                  {errors?.matKhau?.message}
                </p>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    {t("fullname")}
                  </label>
                </div>
                <input
                  type="text"
                  name="hoTen"
                  id="hoTen"
                  placeholder="Enter Your Full Name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  {...register("hoTen", {
                    required: "* Vui l??ng nh???p th??ng tin",
                    minLength: {
                      value: 3,
                      message: "H??? t??n t???i thi???u ph???i 5 k?? t???}",
                    },
                  })}
                />
                <p className="text-red-400 mt-0 errors">
                  {errors?.hoTen?.message}
                </p>
              </div>
            </div>

            <div className="w-[80%] flex flex-col px-[4rem] mt-[44px]">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  {t("email")}
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter Your Phone Email"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  {...register("email", {
                    required: "* Vui l??ng nh???p th??ng tin",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email kh??ng ????ng ?????nh d???ng",
                    },
                  })}
                />
                <p className="text-red-400 mt-0 errors">
                  {errors?.email?.message}
                </p>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  {t("phone")}
                </label>
                <input
                  type="text"
                  name="soDt"
                  id="soDt"
                  placeholder="Enter Your Phone Number"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  {...register("soDt", {
                    required: "* Vui l??ng nh???p th??ng tin",
                    minLength: {
                      value: 9,
                      message: "S??? ??i???n tho???i ph???i  t??? 9-11 k?? t???",
                    },
                    maxLength: {
                      value: 11,
                      message: "S??? ??i???n tho???i ph???i  t??? 9-11 k?? t???",
                    },
                  })}
                />
                <p className="text-red-400 mt-0 errors">
                  {errors?.soDt?.message}
                </p>
              </div>
              <div className="block mb-2 text-sm">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 mt-8 mb-4 py-2 bg-pink-300 font-semibold rounded-md dark:bg-violet-700 dark:text-gray-900 transition hover:bg-pink-500 hover:text-black"
                  >
                    {t("signup")}
                  </button>
                </div>
                <p className="px-6 text-sm text-center dark:text-gray-400">
                  Don't have an account yet?
                  <a
                    className="hover:underline dark:text-violet-400 pl-2"
                    onClick={() => navigate("/login")}
                  >
                    {t("signin")}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Component = styled.div`
  position: relative;
  select,
  input {
    width: 80%;
    border-bottom: 1px solid #60a5fa;
    font-size: 15px;
    height: 40px;
    padding: 0 30px;
    transition: all 0.2s;
    border-radius: 15px;

    &:focus {
      border-bottom: 3px solid #60a5fa;
      box-shadow: none;
      outline: none;
    }
    &:not(:placeholder-shown) + label,
    &:focus + label {
      top: 0px;
      color: #60a5fa;
      font-size: 16px;
    }
  }
  /* option, */
  label {
    line-height: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 16px;

    pointer-events: none;
    user-select: none;
    transition: 0.3s ease;
    color: #999;
    font-size: 14px;
    padding: 0 15px 30px;
    /* background-color: #fff; */
  }

  /* .errors:empty {
    display: none;
  } */
  .errors {
    padding-left: 30px;
  }
`;
export default Register;
