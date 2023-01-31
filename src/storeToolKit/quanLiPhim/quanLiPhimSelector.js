import { useSelector } from "react-redux";

export const useQuanLiPhim = () =>
  useSelector((state) => state.quanLiPhimReducer);
