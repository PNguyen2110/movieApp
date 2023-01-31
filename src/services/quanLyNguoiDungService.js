import { api } from "../constants/api";

export const quanLyNguoiDungService = {
  postUser: (data) => {
    return api.post("QuanLyNguoiDung/DangNhap", data);
  },
  getBookResult: () => {
    return api.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  getMovieDetail: (idFilm) => {
    return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`);
  },
  layDanhSachNguoiDung: (value) => {
    if (!value.trim()) {
      return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP13`);
    }
    return api.get(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP13&tuKhoa=${value}`
    );
  },
  xoaNguoiDung: (taiKhoan) => {
    return api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },
  themNguoiDung: (data) => {
    return api.post(`QuanLyNguoiDung/ThemNguoiDung`, data);
  },
  capNhatThongTinNguoiDung: (data) => {
    return api.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data);
  },
  capNhatThongTinNguoiDungPut: (data) => {
    return api.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data);
  },
  layDanhSachLoaiNguoiDung: () => {
    return api.get(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  },
  dangKy: (data) => {
    return api.post(`/QuanLyNguoiDung/DangKy`, data);
  },
};
