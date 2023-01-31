import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLiPhimService } from "../../services/quanLiPhimService";

const initialState = {
  bannerList: [],
  movieDetail: {},
  isFetching: false,
  isFetchingDetail: false,
  isFetchingBanner: false,
  error: undefined,
  infoMovie: {},
  movieList: [],
};

export const { reducer: quanLiPhimReducer, actions: quanLiPhimActions } =
  createSlice({
    name: "quanLiPhim",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder
        //get movie banner list
        .addCase(getMovieBannerList.pending, (state, action) => {
          state.isFetchingBanner = true;
        })
        .addCase(getMovieBannerList.fulfilled, (state, action) => {
          state.isFetchingBanner = false;
          state.bannerList = action.payload;
        })
        .addCase(getMovieBannerList.rejected, (state, action) => {
          state.isFetchingBanner = false;
          state.bannerList = action.payload;
        })
        // get movieList
        .addCase(getMovieList.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getMovieList.fulfilled, (state, action) => {
          state.isFetching = false;
          state.movieList = action.payload;
        })
        .addCase(getMovieList.rejected, (state, action) => {
          state.isFetching = false;
          state.movieList = action.payload;
        })
        // get movie details

        .addCase(getMovieDetail.pending, (state, action) => {
          state.isFetchingDetail = true;
        })
        .addCase(getMovieDetail.fulfilled, (state, action) => {
          state.isFetchingDetail = false;
          state.movieDetail = action.payload;
        })
        .addCase(getMovieDetail.rejected, (state, action) => {
          state.isFetchingDetail = false;
          state.movieDetail = action.payload;
        })

        // lấy thong tin phim về trang edit
        .addCase(getInfoMovies.pending, (state, action) => {
          state.isFetchingDetail = true;
        })
        .addCase(getInfoMovies.fulfilled, (state, action) => {
          state.isFetchingDetail = false;
          state.infoMovie = action.payload;
        })
        .addCase(getInfoMovies.rejected, (state, action) => {
          state.isFetchingDetail = false;
          state.infoMovie = action.payload;
        });
    },
  });

export const getMovieList = createAsyncThunk(
  "quanLiPhim/getMovieList",
  async (value = "", { rejectWithValue }) => {
    try {
      const result = await quanLiPhimService.getMovieList(value);
      console.log(result.data.content);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "quanLiPhim/getMovieDetail",
  async (idFilm, { rejectWithValue }) => {
    try {
      const result = await quanLiPhimService.getMovieDetail(idFilm);

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getMovieBannerList = createAsyncThunk(
  "quanLiPhim/getMovieBannerList",
  async (rejectWithValue) => {
    try {
      const result = await quanLiPhimService.getMovieBannerList();

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postFilm = createAsyncThunk(
  "quanLiPhim/postFilm",
  async (film, { dispatch }) => {
    try {
      const result = await quanLiPhimService.postFilm(film);
      localStorage.setItem("addFilm", JSON.stringify(result.data.content));
      console.log(3);
      alert("thêm phim thành công");
    } catch (error) {
      alert(error.response.data.content);
    }
  }
);

// lấy thông tin phim về trang edit

export const getInfoMovies = createAsyncThunk(
  "quanLiPhim/getInfoMovies",
  async (idFilm, { rejectWithValue }) => {
    try {
      const result = await quanLiPhimService.getInfoMovies(idFilm);
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const postFilmUpdate = createAsyncThunk(
  "quanLiPhim/postFilmUpdate",
  async (formData) => {
    try {
      const result = await quanLiPhimService.postFilmUpdate(formData);
      localStorage.setItem("filmUpdate", JSON.stringify(result.data.content));
      alert("Cập nhật phim thành công");
    } catch (err) {
      alert(err.response.data.content);
    }
  }
);

export const deleteFilm = createAsyncThunk(
  "quanLiPhim/deleteFilm",
  async (idFilm, { dispatch, rejectWithValue }) => {
    try {
      await quanLiPhimService.deleteFilm(idFilm);
      alert("xoá phim thành công");
      dispatch(getMovieList());
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
