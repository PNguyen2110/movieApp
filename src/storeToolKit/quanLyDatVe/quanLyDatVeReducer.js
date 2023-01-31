import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyDatVeService } from "../../services/quanLyDatVeService";


const initialState = {
  detailTicketRoom: {
    // thongTinPhim:{},
    // danhSachGhe:[ ]
  },
  isFetchingTicket: false,
  danhSachGheDangDat: [],
  datVe: {
  },
  isFetchingBookingTicket: false,
  // danhSachGheKhachDangDat:[{maGhe:51881},{maGhe:51882}],
  // isFetchingDanhSachGheKhachDangDat:false
};

export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeActions } =
  createSlice({
    name: "quanLyDatVe",
    initialState,
    reducers: {
      bookSeats: (state, action) => {

        let index = state.danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === action.payload.maGhe)

        if (index !== -1) {
          state.danhSachGheDangDat.splice(index, 1)
        } else {
          state.danhSachGheDangDat.push(action.payload)
        }
      },
      deleteSeats: (state, action) => {
        let indexDelete = state.danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === action.payload.maGhe)
        if (indexDelete !== -1) {
          state.danhSachGheDangDat.splice(indexDelete, 1)
        }
      }
    },

    extraReducers: (builder) => {

      builder
        //get info rap
        .addCase(getMovieTicket.pending, (state, action) => {
          state.isFetchingTicket = true;
        })
        .addCase(getMovieTicket.fulfilled, (state, action) => {
          state.isFetchingTicket = false;
          state.detailTicketRoom = action.payload;
        })
        .addCase(getMovieTicket.rejected, (state, action) => {
          state.isFetchingTicket = false;
          state.detailTicketRoom = action.payload;
        })
        //post booking ticket
        .addCase(postTicket.pending, (state, action) => {
          state.isFetchingBookingTicket = true;
        })
        .addCase(postTicket.fulfilled, (state, action) => {
          state.isFetchingBookingTicket = false;
          state.datVe = action.payload;
          state.danhSachGheDangDat = []
        })
        .addCase(postTicket.rejected, (state, action) => {
          state.isFetchingBookingTicket = false;
          state.datVe = action.payload;
        })
    },
  });


export const getMovieTicket = createAsyncThunk(
  "quanLyDatVe/getMovieTicket",
  async (maLichChieu, { rejectWithValue }) => {
    try {
      const result = await quanLyDatVeService.getMovieTicket(maLichChieu);

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postTicket = createAsyncThunk(
  "quanLyDatVe/postTicket",

  async (data, { dispatch, rejectWithValue }) => {
    try {

      const result = await quanLyDatVeService.postTicket(data);

      alert(result.data.content)
      await dispatch(getMovieTicket(data.maLichChieu))
      return result.data.content;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const taoLichChieu = createAsyncThunk(
  "quanLiDatVe/taoLichChieu",
  async (data, { }) => {
    try {
      const result = await quanLyDatVeService.taoLichChieu(data);
      alert(result.data.content);
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

