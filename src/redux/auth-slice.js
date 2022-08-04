import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
  isLogin: false,
  NAME: ""
};

export const kakaoLogin = createAsyncThunk(
  "auth/kakaologin",
  async (code, thunkAPI) => {
    console.log("kakaologin");
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_SERVER}/kakao/callback?code=${code}`,
    })
      .then((res) => {
        console.log(res);
        
        const ACCESS_TOKEN = res.headers.authorization;
        if(ACCESS_TOKEN){
          localStorage.setItem("token", ACCESS_TOKEN);  
          thunkAPI.dispatch(authSlice.actions.userLogin(jwtDecode(ACCESS_TOKEN).NAME))
        }
        
        
        }).catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // window.location.href = "/signIn"
        })
    }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin(state, action) {
      state.isLogin = true
      state.NAME = action.payload
    },
    userLogout(state, action) {
      state.isLogin = false;
      state.NAME = '';
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(kakaoLogin.fulfilled, (state, action) => {
      console.log(action.payload);
      return true
    });
  }
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
