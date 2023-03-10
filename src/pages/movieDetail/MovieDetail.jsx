import React from "react";
import { Tabs } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail, useQuanLiPhim } from "../../storeToolKit/quanLiPhim";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getLichChieuMovieDetail,
  useQuanLyRap,
} from "../../storeToolKit/quanLyRap";
import moment from "moment";
import { useTranslation } from "react-i18next";

const MovieDetail = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { movieDetail } = useQuanLiPhim();
  const { lichChieuMovieDetail } = useQuanLyRap();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetail(params.movieIds));
    dispatch(getLichChieuMovieDetail(params.movieIds));
  }, [params.movieIds]);
  return (
    <div>
      <div
        className="detailMovie "
        style={{
          backgroundImage: `url(${movieDetail.hinhAnh})`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="box1 md:grid md:grid-cols-4 container  flex flex-col ">
          <div className="col-span-1">
            <img
              src={movieDetail.hinhAnh}
              alt="123"
              style={{
                width: "100%",
                height: "400px",
                padding: "45px 0px 10px 30px",
              }}
            />
          </div>
          <div className="col-span-3 ">
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
              <h2 className="mb-2 text-3xl font-semibold leading-tight text-white">
                {t("moviedetail")}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full  text-left">
                  <thead className="dark:bg-gray-700"></thead>
                  <tbody>
                    <tr className="border-b border-opacity-20 dark:border-gray-700">
                      <td style={{ fontSize: "12px" }}>
                        <p>{t("moviename")} :</p>
                      </td>
                      <td>
                        <p style={{ fontSize: "17px", color: "#83c641" }}>
                          {movieDetail.tenPhim}
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-opacity-20 dark:border-gray-700">
                      <td>
                        <p style={{ fontSize: "12px" }}>{t("describe")} :</p>
                      </td>
                      <td>
                        <p>{movieDetail.moTa}</p>
                      </td>
                    </tr>
                    <tr className="border-b border-opacity-20 dark:border-gray-700">
                      <td>
                        <p style={{ fontSize: "12px" }}>
                          {t("premieredate")} :
                        </p>
                      </td>
                      <td>
                        <p>
                          {moment(movieDetail.ngayKhoiChieu).format(
                            "DD.MM.YYYY"
                          )}
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-opacity-20 dark:border-gray-700">
                      <td>
                        <p style={{ fontSize: "12px" }}>{t("rate")} :</p>
                      </td>
                      <td>
                        <p>{movieDetail.danhGia} / 10</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="pb-4 pt-2">
                  <button
                    type="button"
                    className="px-10 py-2 font-semibold rounded-full dark:bg-pink-400 dark:text-gray-800 mr-2 transition hover:bg-white "
                  >
                    <a
                      target={"_blank"}
                      href={movieDetail.trailer}
                      className="text-black hover:text-black"
                    >
                      Trailer
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="p-2 container  box2">
          {lichChieuMovieDetail.heThongRapChieu?.length !== 0 ? (
            <Tabs
              tabPosition={tabPosition}
              items={lichChieuMovieDetail.heThongRapChieu?.map(
                (item, index) => {
                  return {
                    label: (
                      <div className={index}>
                        <img
                          src={item.logo}
                          alt={item.logo}
                          className="rounded-full w-10 h-10 sm:w-14 sm:h-14"
                        />
                        <div>
                          <p className="text-center text-white mt-2 test-base md:text-xl">
                            {item.tenHeThongRap}
                          </p>
                        </div>
                      </div>
                    ),
                    key: index,
                    children: (
                      <div className={Date.now()}>
                        {item.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div className="mb-4" key={index}>
                              <div className="flex flex-col md:flex-row text-left ">
                                <img
                                  src={cumRap.hinhAnh}
                                  alt=""
                                  style={{ width: "100px", height: "100px" }}
                                  className="rounded-md"
                                />
                                <div className="ml-2">
                                  <p
                                    class="text-sm md:text-lg mt-2"
                                    style={{
                                      fontWeight: "bold",
                                      lineHeight: 1,
                                      color: "white",
                                    }}
                                  >
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p className="text-white text-xs">
                                    {cumRap.diaChi}
                                  </p>
                                  <div className="thong-tin-lich-chieu grid grid-cols-4  gap-5">
                                    {cumRap.lichChieuPhim
                                      ?.slice(0, 12)
                                      .map((lichChieu, index) => {
                                        return (
                                          <div className="cols-span-1">
                                            <button
                                              onClick={() =>
                                                navigate(
                                                  `/ticketroom/${lichChieu.maLichChieu}`
                                                )
                                              }
                                              className="text-red-600 flex "
                                              style={{
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                width: "120px",
                                              }}
                                            >
                                              {moment(
                                                lichChieu.ngayChieuGioChieu
                                              ).format("hh:mm A")}
                                            </button>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ),
                  };
                }
              )}
            />
          ) : (
            <p className="text-white text-3xl p-20">{t("unavailable")}</p>
          )}
        </div>

        <br />
      </div>
    </div>
  );
};

export default MovieDetail;
