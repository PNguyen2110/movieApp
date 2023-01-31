import { api } from "../constants/api";

export const quanLyDatVeService = {
  getMovieTicket: (maLichChieu) => {
    return api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
  },
  taoLichChieu: (data) => {
    return api.post(`QuanLyDatVe/TaoLichChieu`, data);
  },
  postTicket: (data) => { 
  //   data: {
  //   "maLichChieu": 0,
  //   "danhSachVe": [
  //     {
  //       "maGhe": 0,
  //       "giaVe": 0
  //     }
  //   ]
  // }
    return api.post("QuanLyDatVe/DatVe", data);
  },

};
