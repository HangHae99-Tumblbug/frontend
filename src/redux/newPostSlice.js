import { createSlice } from '@reduxjs/toolkit';

const newPostSlice = createSlice({
  name: 'newpost',
  initialState: {
    post: {
      category: 'game',
      summary: '',
      title: '',
      thumbnails: [],
      goal: '',
      startDate: '',
      endDate: '',
      rewards: [
        {
          rewardItem: '선물없이 후원하기',
          fundingPrice: 1000
        }
      ],
      plan: "<p><br></p>",
      creatorName: "",
      creatorBiography: "",
    },
    tmpImages: []
  },
  reducers: {
    setCategory(state, action) {
      state.post.category = action.payload;
    },
    setSummary(state, action) {
      state.post.summary = action.payload;
    },
    setTitle(state, action) {
      console.log(action.payload);
      state.post.title = action.payload;
    },
    setThumbnails(state, action) {
      // if(state.post.thumbnails) state.post.thumbnails = action.payload
      // else state.post.thumbnails = [action.payload]
      state.post.thumbnails = action.payload;
    },
    setGoal(state, action) {
      state.post.goal = action.payload;
    },
    setStartDate(state, action) {
      state.post.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.post.endDate = action.payload;
    },
    setRewards(state, action) {
      state.post.rewards = action.payload;
    },
    setPlan(state, action) {
      console.log(action.payload);
      state.post.plan = action.payload;
    },
    setCreatorName(state, action) {
      state.post.creatorName = action.payload;
    },
    setCreatorBiography(state, action) {
      state.post.creatorBiography = action.payload;
    },
    setTmpImage(state, action){
        state.tmpImages = [...state.tmpImages, action.payload]
    },
    removeRewards(state, action){
        // const index = state.post.rewards.indexOf(action.payload)
        const newRewards = [...state.post.rewards]
        console.log(action.payload);

        newRewards.splice(action.payload, 1)
        state.post.rewards = newRewards
    }
  },
  extraReducers: {}
});

export default newPostSlice.reducer;
export const {
  setCategory,
  setSummary,
  setTitle,
  setThumbnails,
  setGoal,
  setStartDate,
  setEndDate,
  setRewards,
  setPlan,
  setCreatorName,
  setCreatorBiography,
  setTmpImage,
  removeRewards
} = newPostSlice.actions;
