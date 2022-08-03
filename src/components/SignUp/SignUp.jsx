import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import '../SignIn/SignIn.css';
import {
  H1Typo,
  FormInputLabel,
  FormInputWrapper,
  ErrorHelperText,
  BigRedButton,
  SmallTextWrapper,
  CopyrightFooter
} from '../../shared/Styles';
import TumblbugApis from '../../shared/api';

const SignUp = (props) => {
  const [errors, setErrors] = useState({
    nameError: false,
    emailValidError: false,
    emailConfirmError: false,
    emailConfirmValidError: false,
    passwordValidError: false,
    passwordConfirmValidError: false,
    passwordConfirmError: false
  });
  const [focuses, setFocuses] = useState({
    nameFocus: false,
    emailFocus: false,
    emailConfirmFocus: false,
    passwordFocus: false,
    passwordConfirmFocus: false
  });

  const navigate = useNavigate()

  const nameRef = useRef();
  const emailRef = useRef();
  const emailConfirmRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const emailRegEx =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const passwordRegEx =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+])[A-Za-z@#$!%\^*&]{8,16}$/;

  const handleClickSignUp = () => {
    let newErrors = { ...errors };
    if (nameRef.current.value.length < 2 || nameRef.current.value.length > 20)
      newErrors = { ...newErrors, nameError: true };
    if (!emailRegEx.test(emailRef.current.value))
      newErrors = { ...newErrors, emailValidError: true };
    if (!emailRegEx.test(emailConfirmRef.current.value))
      newErrors = { ...newErrors, emailConfirmValidError: true };
    if (emailConfirmRef.current.value !== emailRef.current.value)
      newErrors = { ...newErrors, emailConfirmError: true };
    if (!passwordRegEx.test(passwordRef.current.value))
      newErrors = { ...newErrors, passwordValidError: true };
    if (!passwordRegEx.test(passwordConfirmRef.current.value))
      newErrors = { ...newErrors, passwordConfirmValidError: true };
    if (passwordConfirmRef.current.value !== passwordRef.current.value)
      newErrors = { ...newErrors, emailConfirmError: true };

    if (Object.values(newErrors).filter((x) => x == true).length !== 0) {
      alert('회원가입 양식을 확인해주세요');
    } else {
      TumblbugApis.signUp({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: passwordConfirmRef.current.value
      })
        .then((res) => {
          alert('환영합니다!');
          navigate("../signIn")
        })
        .catch((err) => {
          alert(err.data);
        });
    }
    setErrors({ ...newErrors });
  };

  return (
    <>
      <SignUpHeader>
        <a href="/">
          <img src={process.env.PUBLIC_URL + '/tumblbug_logo.svg'} />
        </a>
      </SignUpHeader>
      <SignUpContainer>
        <SignUpContent>
          <H1Typo>이메일로 가입하기</H1Typo>

          {/* // ----------------------- 이름 --------------------------- */}
          <FormInputLabel>이름</FormInputLabel>
          <FormInputWrapper error={errors.nameError} focus={focuses.nameFocus}>
            <span>
              <input
                ref={nameRef}
                onChange={(e) => {
                  if (e.target.value.length < 2 || e.target.value.length > 20) {
                    setErrors({ ...errors, nameError: true });
                  } else {
                    setErrors({ ...errors, nameError: false });
                  }
                }}
                onFocus={() => {
                  setFocuses({ ...focuses, nameFocus: true });
                }}
                onBlur={() => {
                  setFocuses({ ...focuses, nameFocus: false });
                }}
                type="text"
                placeholder="사용하실 이름을 입력해주세요."
              />
            </span>
          </FormInputWrapper>
          {errors.nameError && (
            <ErrorHelperText>
              이름은 2자 이상, 20자 이하로 입력하세요.
            </ErrorHelperText>
          )}

          {/* // ----------------------- 메일 --------------------------- */}
          <FormInputLabel>이메일 주소</FormInputLabel>
          <FormInputWrapper
            error={errors.emailValidError || errors.emailConfirmError}
            focus={focuses.emailFocus}
          >
            <span>
              <input
                ref={emailRef}
                onChange={(e) => {
                  if (!emailRegEx.test(e.target.value)) {
                    setErrors({ ...errors, emailValidError: true });
                  } else {
                    if (
                      emailConfirmRef.current.value !== '' &&
                      emailRef.current?.value != emailConfirmRef.current?.value
                    ) {
                      setErrors({
                        ...errors,
                        emailConfirmError: true,
                        emailValidError: false
                      });
                    } else {
                      setErrors({
                        ...errors,
                        emailConfirmError: false,
                        emailValidError: false
                      });
                    }
                  }
                }}
                onFocus={() => {
                  setFocuses({ ...focuses, emailFocus: true });
                }}
                onBlur={() => {
                  setFocuses({ ...focuses, emailFocus: false });
                }}
                type="text"
                placeholder="이메일 주소를 입력해주세요."
              />
            </span>
          </FormInputWrapper>
          {errors.emailValidError && (
            <ErrorHelperText>유효하지 않은 이메일 형식입니다.</ErrorHelperText>
          )}
          <FormInputWrapper
            error={errors.emailConfirmValidError || errors.emailConfirmError}
            focus={focuses.emailConfirmFocus}
          >
            <span>
              <input
                ref={emailConfirmRef}
                onChange={(e) => {
                  if (!emailRegEx.test(e.target.value)) {
                    setErrors({ ...errors, emailConfirmValidError: true });
                  } else {
                    if (
                      emailConfirmRef.current.value !== '' &&
                      emailRef.current?.value != emailConfirmRef.current?.value
                    ) {
                      setErrors({
                        ...errors,
                        emailConfirmError: true,
                        emailConfirmValidError: false
                      });
                    } else {
                      setErrors({
                        ...errors,
                        emailConfirmError: false,
                        emailConfirmValidError: false
                      });
                    }
                  }
                }}
                onFocus={() => {
                  setFocuses({ ...focuses, emailConfirmFocus: true });
                }}
                onBlur={() => {
                  setFocuses({ ...focuses, emailConfirmFocus: false });
                }}
                type="text"
                placeholder="이메일 주소를 확인합니다."
              />
            </span>
          </FormInputWrapper>
          {errors.emailConfirmValidError && (
            <ErrorHelperText>유효하지 않은 이메일 형식입니다.</ErrorHelperText>
          )}
          {!errors.emailConfirmValidError && errors.emailConfirmError && (
            <ErrorHelperText>이메일 주소가 일치하지 않습니다</ErrorHelperText>
          )}

          {/* // ----------------------- 비밀번호 --------------------------- */}
          <FormInputLabel>비밀번호</FormInputLabel>
          <FormInputWrapper
            error={errors.passwordConfirmError || errors.passwordValidError}
            focus={focuses.passwordFocus}
          >
            <span>
              <input
                ref={passwordRef}
                onChange={(e) => {
                  if (!passwordRegEx.test(e.target.value)) {
                    setErrors({ ...errors, passwordValidError: true });
                  } else {
                    if (
                      passwordConfirmRef.current.value !== '' &&
                      e.target.value !== '' &&
                      passwordRef.current?.value !=
                        passwordConfirmRef.current?.value
                    ) {
                      setErrors({
                        ...errors,
                        passwordConfirmError: true,
                        passwordValidError: false
                      });
                    } else {
                      setErrors({
                        ...errors,
                        passwordConfirmError: false,
                        passwordValidError: false
                      });
                    }
                  }
                }}
                onFocus={() => {
                  setFocuses({ ...focuses, passwordFocus: true });
                }}
                onBlur={() => {
                  setFocuses({ ...focuses, passwordFocus: false });
                }}
                type="password"
                placeholder="비밀번호를 입력해주세요."
              />
            </span>
          </FormInputWrapper>
          {errors.passwordValidError && (
            <ErrorHelperText>
              비밀번호는 영문자+특수기호(!@#$%^&*) 8-16자로 입력해주세요
            </ErrorHelperText>
          )}
          <FormInputWrapper
            error={
              errors.passwordConfirmError || errors.passwordConfirmValidError
            }
            focus={focuses.passwordConfirmFocus}
          >
            <span>
              <input
                ref={passwordConfirmRef}
                onChange={(e) => {
                  if (!passwordRegEx.test(e.target.value)) {
                    setErrors({ ...errors, passwordConfirmValidError: true });
                  } else {
                    if (
                      passwordRef.current.value !== '' &&
                      e.target.value !== '' &&
                      passwordRef.current?.value != e.target.value
                    ) {
                      setErrors({
                        ...errors,
                        passwordConfirmError: true,
                        passwordConfirmValidError: false
                      });
                    } else {
                      setErrors({
                        ...errors,
                        passwordConfirmError: false,
                        passwordConfirmValidError: false
                      });
                    }
                  }
                }}
                onFocus={() => {
                  setFocuses({ ...focuses, passwordConfirmFocus: true });
                }}
                onBlur={() => {
                  setFocuses({ ...focuses, passwordConfirmFocus: false });
                }}
                type="password"
                placeholder="비밀번호를 확인합니다."
              />
            </span>
          </FormInputWrapper>
          {errors.passwordConfirmValidError && (
            <ErrorHelperText>
              비밀번호는 영문자+특수기호(!@#$%^&*) 8-16자로 입력해주세요
            </ErrorHelperText>
          )}
          {!errors.passwordConfirmValidError && errors.passwordConfirmError && (
            <ErrorHelperText>비밀번호가 일치하지 않습니다</ErrorHelperText>
          )}

          {/* // ----------------------- 가입/로그인 --------------------------- */}
          <BigRedButton onClick={handleClickSignUp}>가입하기</BigRedButton>
          <SmallTextWrapper
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            이미 텀블벅 계정이 있으신가요?
            <span>
              <Link to="../signIn">기존 계정으로 로그인하기</Link>
            </span>
          </SmallTextWrapper>
        </SignUpContent>
      </SignUpContainer>
      <CopyrightFooter>© 2022 Tumblbug Inc.</CopyrightFooter>
    </>
  );
};

const SignUpHeader = styled.div`
  height: 58px;
  background-color: rgb(255, 255, 255);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: rgb(10 10 10 / 10%) 0px 1px 2px 0px;
  z-index: 999;
  padding: 0px 16px;
  min-height: 58px;
  /* background-color: aliceblue; */
  img {
    @media only screen and (min-width: 1080px) {
      width: 85px;
      height: 22.4px;
    }
    width: 85px;
    height: 22px;

    @media (min-width: 1080px) {
      width: 85px;
      height: 22.36px;
    }
    fill: rgb(0, 0, 0);
    width: 70px;
    height: 18.41px;
  }
`;

const SignUpContainer = styled.div`
  @media only screen and (min-width: 768px) {
    width: 400px;
    padding: 72px 0px 0px;
    margin: 0px auto 12px;
  }
  text-align: center;
  padding: 32px 0px 0px;
  margin: 0px 0px 34px;
  @media only screen and (min-width: 1200px) {
    max-width: 1160px;
  }
  @media only screen and (min-width: 1080px) {
    max-width: 1080px;
    margin: 0px auto;
  }
`;

const SignUpContent = styled.div`
  @media only screen and (min-width: 768px) {
    padding: 32px;
    border-radius: 5px;
    border: 1px solid rgb(228, 228, 228);
  }
  padding: 0px 16px;
  text-align: left;
`;
export default SignUp;
