import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  project: {}
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.projects = [...action.payload];
    },
    setPost: (state, action) => {
      state.project = { ...action.payload };
    },
    setResetPost: (state, action) => {
      state.project = {};
    },
    setCategory: (state, action) => {
      state.category = { ...action.payload };
    },
    setSort: (state, action) => {
      state.category = { ...action.payload };
    }
  },
  extraReducers: {}
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
