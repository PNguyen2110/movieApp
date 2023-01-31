import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMovieTicket,
  postTicket,
  quanLyDatVeActions,
  useQuanLyDatVe,
} from "../../storeToolKit/quanLyDatVe";
import { useQuanLyNguoiDung } from "../../storeToolKit/quanLyNguoiDung";
import style from "./BookTicket.module.css";
import "./BookTicket.css";
import _ from "lodash";
import {
  UserOutlined,
  HistoryOutlined,
  MehOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

class ThongTinDatVe {
  maLichChieu = 0;
  danhSachVe = [];
}
const BookTicket = () => {
  const { userLogin } = useQuanLyNguoiDung();
  const { detailTicketRoom, danhSachGheDangDat, isFetchingBookingTicket } =
    useQuanLyDatVe();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem("USER_LOGIN")) {
      return navigate("/login");
    }

    dispatch(getMovieTicket(params.id));
  }, []);

  const renderSeats = () => {
    return detailTicketRoom.danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let gheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      // let classGheKhachDangDat = '';
      // let indexGheKhachDangDat = danhSachGheKhachDangDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)
      // if (indexGheKhachDangDat !== -1) {
      //   classGheKhachDangDat = 'gheKhachDangDat'
      // }
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      if (indexGheDD !== -1) {
        classGheDangDat = "gheDangDat";
      }

      return (
        <Fragment key={ghe.maGhe}>
          <button
            onClick={() => {
              dispatch(quanLyDatVeActions.bookSeats(ghe));
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${gheDaDat} ${classGheDangDat} ${classGheDaDuocDat}  `}
          >
            {ghe.daDat ? (
              classGheDaDuocDat !== "" ? (
                <span className="flex justify-center">
                  {" "}
                  <UserOutlined />
                </span>
              ) : (
                <span
                  className="flex justify-center text-black"
                  style={{ fontSize: "13px" }}
                >
                  <CloseOutlined />
                </span>
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  if (isFetchingBookingTicket) {
    return (
      <div className="container">
        <div className="grid grid-cols-12 pt-24 container">
          {[...Array(100)].map((e) => {
            return (
              <div
                className="col-span-1 mt-4"
                key={Math.floor(Math.random() * 10000000) + 1000001}
              >
                <Skeleton.Button active />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-green-100 bg-opacity-50">
      <div className="container grid grid-cols-12 pt-24 pb-12">
        <div className="col-span-12 lg:col-span-8 text-center">
          <div className="text-2xl display-4 font-bold">
            {t("BOOKINGMOVIETICKET")}
          </div>
          <div style={{ fontSize: "20px " }} className="mt-3 font-medium">
            <i> {t("screen")}</i>
          </div>
          <div
            className="mt-1"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div className={`${style["bookTicket-screen"]}`}></div>
          </div>
          <div>{renderSeats()}</div>
          <div className=" pl-14  container">
            <div className="pt-2 text-left font-semibold">
              <i style={{ fontSize: "16px" }}> {t("ticketstatus")}</i> :
            </div>
            <div className="flex flex-row pt-4 flex-wrap gap-2">
              <div className="flex w-[200px]">
                <button className="gheDaDat ">
                  {" "}
                  <span
                    className="flex  justify-center text-black"
                    style={{ fontSize: "12px" }}
                  >
                    <CloseOutlined />
                  </span>
                </button>

                <span className="pr-4 pl-1 text-left">
                  : {t("seatsbooked")}
                </span>
              </div>

              <div className="flex w-[200px]">
                <button className="gheDangDat  "> </button>
                <span className="pr-4 pl-1 text-left">
                  : {t("seatsarebooked")}
                </span>
              </div>
              <div className="flex w-[200px]">
                <button className="gheButton "> </button>
                <span className="pr-4 pl-1 text-left">
                  : {t("regularchair")}
                </span>
              </div>
              <div className="flex w-[200px]">
                <button className="gheVip "> </button>
                <span className="pr-4 pl-1 text-left">: {t("vipchair")}</span>
              </div>
              <div className="flex w-[200px]">
                <button className="gheDaDuocDat  ">
                  <span className="flex justify-center">
                    {" "}
                    <UserOutlined />
                  </span>
                </button>
                <span className="pr-4 pl-1 text-left">
                  : {t("thechairyoubought")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-span-12 lg:col-span-4 pt-16 totalTicket"
          style={{ fontSize: "16px" }}
        >
          <h3 className="text-center pb-6">
            <span className="text-red-300  text-2xl  font-bold">
              {t("total")} :{" "}
            </span>
            <span className="text-warning text-pink-200 text-xl underline underline-offset-4">
              {danhSachGheDangDat
                .reduce((sum, seats) => {
                  return (sum += seats.giaVe);
                }, 0)
                .toLocaleString()}{" "}
            </span>
            <span className="text-pink-200 text-sm"> (vnd)</span>
          </h3>
          <h3 className="text-xl">{detailTicketRoom.thongTinPhim?.tenPhim}</h3>
          <p>
            {t("address")}: {detailTicketRoom.thongTinPhim?.tenCumRap} -{" "}
            {detailTicketRoom.thongTinPhim?.tenRap}
          </p>
          <p>
            {t("date")} : {detailTicketRoom.thongTinPhim?.ngayChieu} -{" "}
            {detailTicketRoom.thongTinPhim?.gioChieu}
          </p>
          <hr />
          <div className="my-2">
            <i>{t("email")}</i>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-2 ">
            <i>{t("phone")}</i>
            <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div id="table-wrapper">
            <div className="mt-2 " id="table-scroll">
              <table className="table-auto">
                <thead className="pt-4">
                  <tr className="text-light" style={{ fontSize: "16px" }}>
                    <th
                      className="textfix text-rose-600 "
                      style={{ left: "-25px" }}
                    >
                      {t("seats")}
                    </th>
                    <th
                      className="textfix  text-rose-600 "
                      style={{ left: "130px" }}
                    >
                      {t("price")} (vnd)
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {_.sortBy(danhSachGheDangDat, ["maGhe"]).map(
                    (gheDD, index) => {
                      return (
                        <tr key={index} className="text-light">
                          <td className="px-2 border border-slate-600 text-center py-1">
                            {gheDD.stt}
                          </td>
                          <td className="pl-8 border border-slate-600 text-right">
                            {gheDD.giaVe.toLocaleString()}
                          </td>
                          <td className="border border-slate-600 text-center">
                            <button
                              className=" bg-red-600 px-2 rounded-md text-white"
                              onClick={() => {
                                dispatch(quanLyDatVeActions.deleteSeats(gheDD));
                              }}
                            >
                              {t("cancel")}
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="pt-6 flex-row "
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              type="button"
              className="px-10 py-2 font-semibold rounded-full dark:bg-pink-400 dark:text-black transition  hover:bg-yellow-200 cursor-pointer"
              onClick={() => {
                let thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                dispatch(postTicket(thongTinDatVe));
              }}
            >
              {t("buyticket")}
            </button>

            <div className="text-red-600 hover:text-yellow-400">
              {" "}
              <HistoryOutlined className="text-xl" />
              <a
                href=""
                onClick={() => {
                  navigate(`/bookResult`);
                }}
                className="cursor-pointer text-red-600 hover:text-yellow-400"
                style={{ fontSize: "18px", paddingTop: "20px" }}
              >
                {t("bookinghistory")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;
