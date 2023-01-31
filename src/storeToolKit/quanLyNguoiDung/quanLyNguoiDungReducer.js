import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService";

let user = {};
if (localStorage.getItem("USER_LOGIN")) {
  user = JSON.parse(localStorage.getItem("USER_LOGIN"));
}
const initialState = {
  userLogin: user,
  isFetchingLogin: false,
  inFoUser: {},
  isFetchinginFoUser: false,
  isFetchingDanhSachNguoiDung: false,
  isFetchingTimKiem: false,
  timKiemNguoiDung: [],
  danhSachNguoiDung: [],
  danhSachLoaiNguoiDung: [],
  isFetchingLoaiNguoiDung: false,
};

export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(postUser.pending, (state, action) => {
        state.isFetchingLogin = true;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.isFetchingLogin = false;
        state.userLogin = action.payload;
      })
      .addCase(postUser.rejected, (state, action) => {
        state.isFetchingLogin = false;
        state.userLogin = action.payload;
      })
      .addCase(getBookResult.pending, (state, action) => {
        state.isFetchinginFoUser = true;
      })
      .addCase(getBookResult.fulfilled, (state, action) => {
        state.isFetchinginFoUser = false;
        state.inFoUser = action.payload;
      })
      .addCase(getBookResult.rejected, (state, action) => {
        state.isFetchinginFoUser = false;
        state.inFoUser = action.payload;
      })
      // lấy danh sách người dùng
      .addCase(layDanhSachNguoiDung.pending, (state, action) => {
        state.isFetchingDanhSachNguoiDung = true;
      })
      .addCase(layDanhSachNguoiDung.fulfilled, (state, action) => {
        state.isFetchingDanhSachNguoiDung = false;
        state.danhSachNguoiDung = action.payload;
      })
      .addCase(layDanhSachNguoiDung.rejected, (state, action) => {
        state.isFetchingDanhSachNguoiDung = false;
        state.danhSachNguoiDung = action.payload;
      })
      // danh sách loại người dùng
      .addCase(layDanhSachLoaiNguoiDung.pending, (state, action) => {
        state.isFetchingLoaiNguoiDung = true;
      })
      .addCase(layDanhSachLoaiNguoiDung.fulfilled, (state, action) => {
        state.isFetchingLoaiNguoiDung = false;
        state.danhSachLoaiNguoiDung = action.payload;
      })
      .addCase(layDanhSachLoaiNguoiDung.rejected, (state, action) => {
        state.isFetchingLoaiNguoiDung = false;
        state.danhSachLoaiNguoiDung = action.payload;
      });
  },
});

export const postUser = createAsyncThunk(
  "quanLyNguoiDung/postUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.postUser(data);
      localStorage.setItem("USER_LOGIN", JSON.stringify(result.data.content));
      localStorage.setItem("TOKEN", result.data.content.accessToken);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBookResult = createAsyncThunk(
  "quanLyNguoiDung/getBookResult",
  async (rejectWithValue) => {
    try {
      const result = await quanLyNguoiDungService.getBookResult();
      localStorage.setItem("infoUser", JSON.stringify(result.data.content));
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const layDanhSachNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/layDanhSachNguoiDung",
  async (data = "", {}) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(data);
      return result.data.content;
    } catch (err) {
      alert(err.response.data.message);
    }
  }
);

export const xoaNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/xoaNguoiDung",
  async (taiKhoan, { dispatch }) => {
    try {
      await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      dispatch(layDanhSachNguoiDung());
      alert("Xoá thành công");
    } catch (err) {
      alert(err.response.data.content);
    }
  }
);

export const themNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/themNguoiDung",
  async (data, { dispatch }) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(data);
      localStorage.setItem("addUser", JSON.stringify(result.data.content));
      await alert("Thêm thànhcông");
    } catch (err) {
      alert(err.response.data.content);
      console.log(err.response.data);
    }
  }
);

export const capNhatThongTinNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/capNhatThongTinNguoiDung",
  async (data, {}) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        data
      );
      localStorage.setItem("userUpdate", JSON.stringify(result.data.content));
      alert("cập nhật người dùng thành công");
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  }
);
export const capNhatThongTinNguoiDungPut = createAsyncThunk(
  "quanLyNguoiDung/capNhatThongTinNguoiDungPut",
  async (data, {}) => {
    try {
      await quanLyNguoiDungService.capNhatThongTinNguoiDungPut(data);
      alert("cập nhật người dùng thành công");
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.content);
    }
  }
);

export const layDanhSachLoaiNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/layDanhSachLoaiNguoiDung",
  async (data, {}) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();

      return result.data.content;
    } catch (err) {
      alert(err.response.data.message);
    }
  }
);

export const dangKy = createAsyncThunk(
  "quanLyNguoiDung/dangKy",
  async (data) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(data);

      localStorage.setItem("userSignUp", JSON.stringify(result.data.content));
      alert("Đăng kí thành công");
    } catch (err) {
      alert(err.response.data.content);
      console.log(err.response.data.message);
    }
  }
);
