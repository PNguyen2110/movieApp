import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getBookResult,
  useQuanLyNguoiDung,
} from "../../storeToolKit/quanLyNguoiDung";
import _ from "lodash";
import { Fragment } from "react";
import { Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

const BookResult = () => {
  const { t } = useTranslation();
  const { inFoUser, isFetchinginFoUser } = useQuanLyNguoiDung();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBookResult());
  }, []);

  if (isFetchinginFoUser) {
    return (
      <div className="container pt-40">
        <div className="grid grid-cols-3 gap-9 container">
          {[...Array(10)].map((e) => {
            return (
              <div
                className="col-span-1 mt-4"
                key={Math.floor(Math.random() * 1000000) + 100000}
              >
                <Skeleton.Button active block style={{ height: "350px" }} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="text-gray-600 body-font bg-pink-100">
        <div className="container px-5 py-32 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-purple-600">
            {t('bookinghistory')}
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {t('Thank you for using our service. Have a nice day')}!!!
            </p>
          </div>
          <div className="flex flex-wrap -m-2  overflow-scroll" style={{height:'550px'}}>
            {inFoUser.thongTinDatVe?.map((ticket) => {
              return (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={ticket.maVe}>
                  <div className="h-full flex items-center border-pink-400 border p-4 rounded-lg bg-white">
                    <img
                      alt="phim"
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src={ticket.hinhAnh}
                    />
                    <div className="flex-grow">
                      <h2 className="text-pink-400 title-font font-medium text-xl">
                        {ticket.tenPhim}
                      </h2>
                      <p className="text-gray-500">
                        <i className="font-semibold">  {t('time')}:</i>{" "}
                        {moment(ticket.ngayDat).format("hh:mm A ")} -{" "}
                        <i className="font-semibold">  {t('date')}:</i>{" "}
                        {moment(ticket.ngayDat).format("DD-MM-YYYY")}
                      </p>
                      <p>
                        <i className="font-semibold">  {t('address')}:</i>{" "}
                        {_.first(ticket.danhSachGhe).tenHeThongRap}
                      </p>
                      <p>
                        <i className="font-semibold">{t('Theater Name')}:</i>{" "}
                        {_.first(ticket.danhSachGhe).tenCumRap}
                      </p>
                      <p>
                        {" "}
                        <i className="font-semibold">{t('Chair')}: </i>{" "}
                        {ticket.danhSachGhe.map((ghe, index) => {
                          return (
                            <Fragment>
                              <span key={ghe.maGhe} className="text-green-400">
                                [{ghe.tenGhe}] ,{" "}
                              </span>
                              {(index + 1) % 20 === 0 ? <br /> : ""}
                            </Fragment>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-right text-xl mt-6 pt-9">
            <Link
              className="text-red-500 inline-flex items-center  py-2 px-4 rounded-lg  hover:text-black cursor-pointer bg-purple-200 hover:bg-white"
              onClick={() => navigate(-1)}
            >
              {t('Back to booking page')}
              <RollbackOutlined className="pl-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookResult;
