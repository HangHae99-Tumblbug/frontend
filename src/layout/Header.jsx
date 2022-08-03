import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const isHeaderFixed = useSelector((state) => state.layout.headerFixed); // 홈에서만 헤더 고정

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
            <Link
              to="/project-editor/default"
              style={{ textDecoration: 'none' }}
            >
              <ProjectEditorButton>프로젝트 올리기</ProjectEditorButton>
            </Link>
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
            <Link to="/signIn" style={{ textDecoration: 'none' }}>
              <UserButtonWrapper>
                <UserButton>
                  <UserAvatar>
                    <ProfileImage>
                      <UserName>{`임`}</UserName>
                    </ProfileImage>
                  </UserAvatar>
                  <UserText>{`로그인/회원가입`}</UserText>
                </UserButton>
              </UserButtonWrapper>
            </Link>
            <UserButton onClick={() => {
              localStorage.removeItem("token")
              window.location.reload()
            }}>임시 로그아웃 버튼</UserButton>
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
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  border-radius: 24px;
  font-weight: bold;
  background: rgb(217, 217, 217);
`;

const ProfileImage = styled.span`
  display: inline-block;
  justify-content: center;
  background-color: rgb(208, 208, 208);
  color: rgb(255, 255, 255);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: rgb(208 208 208) 0px 0px 1px 0px inset,
    rgb(208 208 208) 0px 0px 1px 0px;
  /* margin-right: 0px;
  margin-top: 5px; */
`;

const UserName = styled.span`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 1rem;
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
