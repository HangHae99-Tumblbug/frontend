import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import { authActions } from '../redux/auth-slice';

const Header = () => {
  const isHeaderFixed = useSelector((state) => state.layout.headerFixed); // 홈에서만 헤더 고정

  const name = useSelector((state) => state.auth.NAME);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenu, setIsMenu] = useState(false);

  const onMenu = () => {
    if (!isLogin) {
      navigate('/signIn');
    } else {
      setIsMenu(!isMenu);
    }
  };

  const onProject = () => {
    // 로그인 되어있으면?
    if (isLogin) {
      navigate('/project-editor/default');
    } else {
      // 로그인이 안 되어있으면?
      alert('로그인 권한이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/signIn');
    }
  };

  const onLogOut = () => {
    dispatch(authActions.userLogout());
    alert('로그아웃 되었습니다.');
    navigate('/signIn');
  };

  // FIXME: 태그들을 다 스타일컴포넌트 태그로 만듬
  return (
    <HeaderLayOut isHeaderFixed={isHeaderFixed}>
      <HeaderWrapper>
        <HeaderUpperLayOut>
          <Link to="/">
            <LogoWrapper>
              <img src={'/images/tumblbug.svg'} alt="logo" />
            </LogoWrapper>
          </Link>
          <StatusWrapper>
            <ProjectEditorButton onClick={onProject}>
              프로젝트 올리기
            </ProjectEditorButton>

            <ButtonWrapper>
              <IconWrapper>
                <img src={'/images/like.svg'} alt="like" />
              </IconWrapper>
            </ButtonWrapper>
            <ButtonWrapper>
              <IconWrapper>
                <img src={'/images/notification.svg'} alt="notification" />
              </IconWrapper>
            </ButtonWrapper>
            <UserButtonWrapper onClick={onMenu}>
              <UserButton>
                {isLogin && (
                  <UserAvatar>
                    <FaceIcon />
                  </UserAvatar>
                )}
                <UserText>{isLogin ? name : '로그인/회원가입'}</UserText>
              </UserButton>
            </UserButtonWrapper>
            {isMenu && isLogin && (
              <MenuWrapper>
                <MenuList>
                  <Link to="/pledges" style={{textDecoration: "none"}}>
                  <MenuItem>후원현황</MenuItem>
                  </Link>
                  <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
                </MenuList>
              </MenuWrapper>
            )}
          </StatusWrapper>
        </HeaderUpperLayOut>
      </HeaderWrapper>
    </HeaderLayOut>
  );
};

const HeaderLayOut = styled.header`
  width: 100%;

  position: ${(props) => (props.isHeaderFixed ? 'fixed' : 'static')};
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  height: 100px;

  border-bottom: 1px solid #ececec;

  @media (max-width: 750px) {
    height: 120px;
  }

  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const HeaderWrapper = styled.div`
  width: 75%;
  @media (max-width: 1300px) {
    width: 90%;
  }

  @media (max-width: 1080px) {
    width: 95%;
  }
`;

const HeaderUpperLayOut = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  box-sizing: border-box;
  padding: 10px 10px;

  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  /* width: 132px; */
  min-height: 35px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
  transition: scale 0.3s ease-in-out 0s;

  img {
    width: 120px;
    /* height: 200px; */
  }

  @media (max-width: 750px) {
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 750px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ProjectEditorButton = styled.div`
  padding: 16px;
  display: inline-flex;
  width: auto;
  color: rgb(25, 25, 25);
  /* font-size: 1rem; */
  line-height: 28px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 750px) {
    padding-left: 0;
  }
`;

const ButtonWrapper = styled.div`
  padding: 12px;
  display: inline-flex;
  width: auto;
  min-width: 30px;
  min-height: 44px;
  color: rgb(25, 25, 25);
  /* font-size: 12px; */
  line-height: 28px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;

  @media (max-width: 400px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  overflow: hidden;
  position: relative;
  display: inline-flex;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const UserButtonWrapper = styled.div`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 100;
`;

const UserButton = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 1rem;
  display: inline-flex;
  width: auto;
  min-width: 30px;
  max-height: 44px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;

const UserAvatar = styled.div`
  overflow: hidden;
  padding-top: 3px;
  display: inline-flex;
  width: 24px;
  height: 24px;
  color: rgb(25, 25, 25);
  font-size: 12px;
  line-height: 28px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;

const MenuWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 80px;
  right: 10px;
  width: 240px;
  transition: all 0.3s ease-in-out 0s;
  border: 1px solid rgb(228, 228, 228);
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 1200;

  & ::before {
    position: absolute;
    top: -5px;
    right: 35px;
    width: 8px;
    height: 8px;
    background-color: rgb(255, 255, 255);
    content: ' ';
    transform: rotate(45deg);
    border-top: 1px solid rgb(228, 228, 228);
    border-left: 1px solid rgb(228, 228, 228);
    z-index: 1002;
  }

  @media only screen and (min-width: 640px) {
    /* min-height: 200px; */
    max-height: 85vh;
    /* overflow-y: auto; */
  }
`;

const MenuList = styled.div`
  /* overflow-y: auto; */
  padding: 16px 0px;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  border-radius: 4px;
  user-select: none;
  z-index: 1001;

  & :hover {
    background-color: #ececec;
  }
`;

const MenuItem = styled.div`
  padding: 4px 16px;
  display: flex;
  width: 100%;
  height: 46px;
  min-height: 46px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  font-size: 14px;
  line-height: 22px;
  color: rgb(13, 13, 13);
  cursor: pointer;
  transition: all 0.3s ease-in-out 0s;
  box-sizing: border-box;
`;

const UserText = styled.div`
  margin-left: 10px;
  display: inline-flex;
  color: rgb(25, 25, 25);
  /* font-size: 12px; */
  line-height: 28px;
  font-weight: bold;
  flex-shrink: 0;
`;

export default Header;
