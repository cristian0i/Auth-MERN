import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  authenticated: false,
  errors: [],
  updated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingStar: (state) => {
      state.loading = true;
    },
    requestSuccess: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.loading = false;
      state.errors = [];
    },
    requestFailure: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    updateSuccess: (state ) => {
      state.updated = !state.updated;
    },
    logoutSuccess: (state) => {
      state.user = null, 
      state.authenticated = false,
      state.loading = false;
      state.errors = [];
    },
    deleteErrors: (state) => {
      state.errors = [];
    },
  },
});

export const {
  loadingStar,
  requestSuccess,
  requestFailure,
  updateSuccess,
  logoutSuccess,
  deleteErrors,
} = userSlice.actions;
export default userSlice.reducer;
