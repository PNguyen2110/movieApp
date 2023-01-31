import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import {
  capNhatThongTinNguoiDung,
  capNhatThongTinNguoiDungPut,
  getBookResult,
} from "../../storeToolKit/quanLyNguoiDung";

export const ThongTinNguoiDung = () => {
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
  const { inFoUser } = useSelector((state) => state.quanLyNguoiDungReducer);

  const { hoTen, matKhau, email, taiKhoan, soDT, maLoaiNguoiDung, maNhom } =
    handleUSerStorage() || inFoUser;
  useEffect(() => {
    dispatch(getBookResult());
    reset({
      hoTen,
      matKhau,
      email,
      taiKhoan,
      soDT,
    });
  }, []);
  const dispatch = useDispatch();
  return (
    <div className="lg:container">
      <div className="flex   mb-[80px] ml-[100px]">
        <img
          className="rounded-[50%] w-[60px] h-[60px] md:w-[90px] md:h-[90px]"
          src={"https://picsum.photos/90/90"}
          alt="..."
        />
        <h3 className="self-end ml-5 text-2xl">{hoTen}</h3>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(
            capNhatThongTinNguoiDungPut({ ...data, maLoaiNguoiDung, maNhom })
          );
        })}
        className="container "
      >
        <div className="grid grid-cols-1  gap-0 md:grid md:grid-cols-2 md:gap-14">
          <div>
            <Component className="form-control mb-14">
              <input
                name="taiKhoan"
                {...register("taiKhoan", {
                  required: "* Vui lòng nhập thông tin",
                })}
                className="inputText"
                placeholder=" "
                type="text"
                disabled
              />
              <label className="pb-4" htmlFor="">
              {t('account')}
              </label>

              <p className="text-red-400 mt-0 errors">
                {errors?.taiKhoan?.message}
              </p>
            </Component>

            <Component className="form-control mb-14">
              <input
                {...register("matKhau", {
                  required: "* Vui lòng nhập thông tin",
                  minLength: {
                    value: 5,
                    message: "Mật khẩu phải có độ dài từ 5-10 kí tự",
                  },
                  maxLength: {
                    value: 10,
                    message: "Mật khẩu phải có độ dài từ 5-10 kí tự",
                  },
                })}
                name="matKhau"
                className="inputText"
                placeholder=" "
                type="text"
              />
              <label className="pb-4" htmlFor="">
              {t('password')}
              </label>
              <p className="text-red-400 mt-0 errors">
                {errors?.matKhau?.message}
              </p>
            </Component>

            <Component className="form-control mb-14">
              <input
                {...register("hoTen", {
                  required: "* Vui lòng nhập thông tin",
                  minLength: {
                    value: 3,
                    message: "Họ tên tối thiểu phải 5 kí tự}",
                  },
                })}
                name="hoTen"
                className="inputText"
                placeholder=" "
                type="text"
              />
              <label className="pb-4" htmlFor="">
              {t('fullname')}
              </label>
              <p className="text-red-400 mt-0 errors">
                {errors?.hoTen?.message}
              </p>
            </Component>
          </div>
          <div>
            <Component className="form-control mb-14">
              <input
                {...register("email", {
                  required: "* Vui lòng nhập thông tin",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email không đúng định dạng",
                  },
                })}
                name="email"
                className="inputText"
                placeholder=" "
                type="text"
              />
              <label className="pb-4" htmlFor="">
              {t('email')}
              </label>
              <p className="text-red-400 mt-0 errors">
                {errors?.email?.message}
              </p>
            </Component>

            <Component className="form-control mb-14">
              <input
                {...register("soDT", {
                  required: "* Vui lòng nhập thông tin",
                  minLength: {
                    value: 9,
                    message: "Số điện thoại phải  từ 9-11 kí tự",
                  },
                  maxLength: {
                    value: 11,
                    message: "Số điện thoại phải  từ 9-11 kí tự",
                  },
                })}
                name="soDT"
                className="inputText"
                placeholder=" "
                type="number"
              />
              <label className="pb-4" htmlFor="">
              {t('phone')}
              </label>
              <p className="text-red-400 mt-0 errors">
                {errors?.soDT?.message}
              </p>
            </Component>
            <div className="flex mr-[100px]">
              <button
                disabled={disabled}
                className={` ${cursor} disabled:opacity-2   hover:bg-blue-500 transition-all duration-500 block ml-auto bg-blue-400 text-white w-full py-3 rounded-xl`}
              >
               {t('update')}
              </button>
            </div>
          </div>
        </div>
      </form>
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
