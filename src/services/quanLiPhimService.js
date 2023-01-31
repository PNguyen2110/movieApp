import { api } from "../constants/api";

export const quanLiPhimService = {
  getMovieList: (value) => {
    if (!value.trim()) {
      return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP13`);
    } else {
      return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP13&tenPhim=${value}`);
    }
  },
  getMovieDetail: (idFilm) => {
    return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`);
  },
  // postFilm trang admin
  postFilm: (film) => {
    return api.post("QuanLyPhim/ThemPhimUploadHinh", film);
  },
  // lấy thong tin phim về trang edit
  getInfoMovies: (idFilm) => {
    return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`);
  },
  // post phim đã cập nhật
  postFilmUpdate: (formData) => {
    return api.post(`QuanLyPhim/CapNhatPhimUpload`, formData);
  },
  // xoá phim
  deleteFilm: (idFilm) => {
    return api.delete(`QuanLyPhim/XoaPhim?MaPhim=${idFilm}`);
  },
  getMovieBannerList: () => {
    return api.get(`QuanLyPhim/LayDanhSachBanner`);
  },
};
