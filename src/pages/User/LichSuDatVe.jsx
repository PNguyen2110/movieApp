import _ from "lodash";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
export const LichSuDatVe = () => {
  const { t } = useTranslation();
  const handleThongTinDatVe = () => {
    if (localStorage.getItem("infoUser")) {
      return JSON.parse(localStorage.getItem("infoUser"));
    }
  };
  const { thongTinDatVe } = handleThongTinDatVe();
  console.log(thongTinDatVe);
  return (
    <Component>
      <div className="h-[480px]">
        <div className="text-center">
          <h2 className="text-3xl text-pink-500">{t('bookinghistory')}</h2>
          <p className="text-xl text-pink-400 ">
          {t('Thank you for using our service. Have a nice day')}
          </p>
        </div>
        <div className=" wrapper container  grid-cols-1 md:grid-cols-2 grid xl:grid-cols-3 h-[440px] overflow-auto">
          {thongTinDatVe?.map((item, index) => (
            <div key={index} className="card flex flex-col pb-3 items-center">
              <div className="face face1">
                <div className="content  flex-col justify-between">
                  <img
                    className="w-[100px] h-[100px] pt-4"
                    src={item.hinhAnh}
                    alt="..."
                  />
                  <h3 className="pb-3 h-[50px]">{item.tenPhim}</h3>
                </div>
              </div>
              <div className="face face2 pt-5 ">
                <div className="content pt-3">
                  <div className="flex justify-between">
                    <p>
                      <span>{t('time')}: </span>
                      <span>{moment(item.ngayDat).format("hh:mm")}</span>
                    </p>
                    <p>
                      <span>{t('date')}:</span>
                      <span>{moment(item.ngayDat).format("DD-MM-YYYY")}</span>
                    </p>
                  </div>
                  <p>
                    <span>{t('address')}:</span>
                    <span>{_.first(item.danhSachGhe).tenHeThongRap}</span>
                  </p>
                  <p>
                    <span>{t('Theater Name')}:</span>
                    <span>{_.first(item.danhSachGhe).tenRap}</span>
                  </p>
                  <p>
                    <span>{t('price')}:</span>
                    <span>{item.giaVe} VND</span>
                  </p>
                  <p className="wrapper-seat h-[70px] overflow-auto">
                    <span>{t('seats')}:</span>
                    {item.danhSachGhe.map((dsGhe, index) => (
                      <span key={index} className="seat">
                        [{dsGhe.tenGhe}],
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Component>
  );
};

const Component = styled.div`
  .wrapper::-webkit-scrollbar,
  .wrapper-seat::-webkit-scrollbar {
    width: 8px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  nt .wrapper-seat::-webkit-scrollbar,
  .wrapper::-webkit-scrollbar-track {
    max-height: 50%;
    height: 50%;
  }
  nt .wrapper-seat::-webkit-scrollbar,
  .wrapper::-webkit-scrollbar-button {
    background-color: transparent;
    display: none;
  }
  .wrapper::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-top: 80px solid #ec93d7;
    border-radius: 5px;
  }
  .content .wrapper-seat::-webkit-scrollbar-thumb {
    border-top: 5px;
    background-color: transparent;
    border-top: 80px solid #ec93d7;
    border-radius: 5px;
  }
  /* .wrapper, */
  .wrapper-seat {
    height: 70px;
    overflow-y: auto;
    overflow-x: hidden;
    display: inline-block;
  }
  .container {
    width: 1000px;
    position: relative;
  }

  .container .card {
    position: relative;
    cursor: pointer;
  }

  .container .card .face {
    width: 300px;
    height: 200px;
    transition: 0.5s;
  }

  .container .card .face.face1 {
    position: relative;
    background: #333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
    padding-left: 20px;
  }

  .container .card:hover .face.face1 {
    background: #ffc1e3;
    transform: translateY(0);
  }

  .container .card .face.face1 .content {
    opacity: 0.2;
    transition: 0.5s;
  }

  .container .card:hover .face.face1 .content {
    opacity: 1;
  }

  .container .card .face.face1 .content img {
    max-width: 100px;
  }

  .container .card .face.face1 .content h3 {
    margin: 10px 0 0;
    padding: 0;
    color: #fff;
    /* text-align: center; */
    font-size: 1.5em;
  }

  .container .card .face.face2 {
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px);
  }

  .container .card:hover .face.face2 {
    transform: translateY(0);
  }

  .container .card .face.face2 .content p {
    margin: 0;
    padding: 0;
  }

  .container .card .face.face2 .content a {
    margin: 15px 0 0;
    display: inline-block;
    text-decoration: none;
    font-weight: 900;
    color: #333;
    padding: 5px;
    border: 1px solid #333;
  }

  .container .card .face.face2 .content a:hover {
    background: #333;
    color: #fff;
  }
  .face2 .content p {
    font-weight: 400;
    span:first-of-type {
      display: inline-block;
      width: 55px;
    }
    .seat {
      color: #60adfb;
    }
    span:last-of-type {
      color: #60adfb;
    }
  }
`;
