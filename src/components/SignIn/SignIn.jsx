import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import './SignIn.css';
import {
  FormInputLabel,
  FormInputWrapper,
  SmallTextWrapper,
  H3Typo,
  BigRedButton
} from '../../shared/Styles';
import { Link } from 'react-router-dom';
import TumblbugApis from '../../shared/api';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/auth-slice';

const SignIn = (props) => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log('login clicked!');
    TumblbugApis.loginUser({
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
      .then((res) => {
        console.log('----login----');
        console.log(res);
        if (res.headers.authorization) {
          // console.log(jwtDecode(res.data.token));
          console.log(jwtDecode(res.headers.authorization));
          alert('로그인에 성공하였습니다');
          // localStorage.setItem("token", res.data.token)
          //
          localStorage.setItem('token', res.headers.authorization);
          const username = jwtDecode(res.headers.authorization).NAME;
          dispatch(authActions.userLogin(username));
          navigate('/');
        }
      })
      .catch((err) => {
        alert('로그인에 실패하였습니다');
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <>
    <SignInHeader>
      <Link to="/">
      <div>
        <img src={process.env.PUBLIC_URL + "/tumblbug_logo.svg"}/>
      </div>
      </Link>
    </SignInHeader>
      <MembershipContainer>
        <CenterContainer>
          <SignInContainer>
            <H3Typo>이메일로 로그인</H3Typo>
            <FormInputLabel>이메일 주소</FormInputLabel>
            <FormInputWrapper>
              <span className="style-signin">
                <input
                  ref={emailRef}
                  type="text"
                  placeholder="이메일 주소를 입력해주세요"
                />
              </span>
            </FormInputWrapper>
            <FormInputLabel>비밀번호</FormInputLabel>
            <FormInputWrapper>
              <span>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onKeyPress={(e) => {
                    if (e.key == 'Enter') {
                        e.preventDefault();
                        handleLogin()
                    }
                }}
                />
              </span>
            </FormInputWrapper>
            <BigRedButton onClick={handleLogin}>
              <span>로그인</span>
            </BigRedButton>
            <BigRedButton style={{backgroundColor: "#Fee500", marginTop: ".5em"}}>
              <a href={process.env.REACT_APP_KAKAO_LOGIN}>
                <img src="/images/kakaologin.png" style={{height: "100%"}}/>
              </a>
            </BigRedButton>
            
            <SmallTextWrapper>
              아직 텀블벅 계정이 없으신가요?
              <span>
                <Link to="../signUp">회원가입</Link>
              </span>
            </SmallTextWrapper>
          </SignInContainer>
        </CenterContainer>
        <RightBackground />
      </MembershipContainer>
    </>
  );
};

const SignInHeader = styled.div`
@media only screen and (min-width: 1080px){
    height: 88px;
}
      position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    height: 66px;
    /* background-color: antiquewhite; */
    a{
      display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    max-width: 1080px;
    padding: 0px 16px;
    margin: 0px auto;
    }
    img{
      @media only screen and (min-width: 1080px){
    width: 140px;
}
width: 110px;
    }
`

const MembershipContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SignInContainer = styled.div`
  @media only screen and (min-width: 1080px) {
    margin: 0px;
    max-width: 414px;
  }
  width: 100%;
  max-width: 328px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightBackground = styled.div`
  @media only screen and (min-width: 1080px) {
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50%;
    height: 100%;
    background-image: url(https://tumblbug-assets.s3.ap-northeast-1.amazonaws.com/static_assets/login/bg_login_email.jpg);
    background-size: cover;
    background-position: center center;
  }
`;

const CenterContainer = styled.div`
  @media only screen and (min-width: 1080px) {
    /* min-height: calc(100% - 66px); */
    padding: 80px 16px;
  }
  flex-direction: column;
  box-sizing: border-box;

  display: flex;
  -webkit-box-align: center;
  align-items: flex-start;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  max-width: 1080px;
  /* min-height: calc(100% - 66px); */
  height: 100%;
  padding: 80px 16px 20px;
  margin: 0px auto;
`;

export default SignIn;
