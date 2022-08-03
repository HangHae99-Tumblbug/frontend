import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';
import './ProjectEditor.css';
import PEDefault from './PEDefault';
import PEFunding from './PEFunding';
import PEStory from './PEStory';
import PEReward from './PEReward';
import PECreator from './PECreator';
import { useDispatch, useSelector } from 'react-redux';
import TumblbugApis from '../../shared/api';
import { useMutation } from '@tanstack/react-query';
import { setTmpImage } from '../../redux/newPostSlice';

const ProjectEditor = (props) => {
  const params = useParams();
  const postData = useSelector((state) => state.post.post);
  const dispatch = useDispatch()
  const location = useLocation()
  const [savable, setSavable] = useState(false)
  const newPost = () => {
    TumblbugApis.newPost(postData);
  };
  const { mutate } = useMutation(newPost, {
    onSuccess: () => {
      dispatch(setTmpImage([]))
      location("/")
    }
  });
  // const images = postData.thumbnails.map(x => x?.filename)
  const tmpImages = useSelector((state) => state.post.tmpImages);

  // const
  useEffect(() => {
    if(postData.title.length <= 32 && postData.title.length > 0
      && postData.summary.length <= 50 && postData.summary.length > 0
      && postData.goal < 2100000000 && postData.goal > 0
      && postData.rewards.length > 0
      && postData.thumbnails.length > 0
      && postData.category !== ""
      && postData.startDate !== ""
      && postData.endDate !== ""
      && postData.plan !== ""
      && postData.creatorName.length <= 20 && postData.creatorName.length > 0
      && postData.creatorBiography.length <= 300 && postData.creatorBiography.length > 0
      ){
        setSavable(true)
      }
      else setSavable(false)
  }, [postData]);

  useEffect(() => {
    return () => {
      console.log(tmpImages);
      TumblbugApis.deleteImages({ tmpImages }).then((res) => {
        console.log('이미지 삭제 완료');
      });
    };
  }, []);
  return (
    <PEContainer>
      <PEHeader>
        <HeaderLeft>
          <HeaderLink to="/">
            <img
              style={{ width: '14px', height: '14px' }}
              src={process.env.PUBLIC_URL + '/left-arrow.svg'}
            />
          </HeaderLink>
        </HeaderLeft>
        <HeaderRight>
          <HeaderButton
            onClick={() => {
              mutate();
            }}
            disabled={!savable}
          >
            {savable ? "저장" : "기획중"}
          </HeaderButton>
        </HeaderRight>
      </PEHeader>
      <Title>프로젝트 기획</Title>
      <div
        style={{
          zIndex: 1,
          boxShadow: 'rgb(0 0 0 / 4%) 0px 1px 8px, rgb(0 0 0 / 2%) 0px 1px 0px'
        }}
      >
        <CategoryWrapper>
          <PETabsWrapper>
            <PETabItem selected={params.tab === 'default'}>
              <Link to="../project-editor/default">
                기본정보<span>4</span>
              </Link>
            </PETabItem>
            <PETabItem selected={params.tab === 'funding'}>
              <Link to="../project-editor/funding">
                펀딩 계획<span>2</span>
              </Link>
            </PETabItem>
            <PETabItem selected={params.tab === 'reward'}>
              <Link to="../project-editor/reward">
                선물 구성<span>1</span>
              </Link>
            </PETabItem>
            <PETabItem selected={params.tab === 'story'}>
              <Link to="../project-editor/story">
                프로젝트 계획<span>1</span>
              </Link>
            </PETabItem>
            <PETabItem selected={params.tab === 'creator'}>
              <Link to="../project-editor/creator">
                창작자 정보<span>2</span>
              </Link>
            </PETabItem>
          </PETabsWrapper>
        </CategoryWrapper>
      </div>
      <PEContentContainer>
        {params.tab == 'default' && <PEDefault postData={postData} />}
        {params.tab == 'funding' && <PEFunding postData={postData} />}
        {params.tab == 'story' && <PEStory postData={postData} />}
        {params.tab == 'reward' && <PEReward postData={postData} />}
        {params.tab == 'creator' && <PECreator postData={postData} />}
      </PEContentContainer>
    </PEContainer>
  );
};

const PEContainer = styled.div`
  background: #fcfcfc;
  height: 100%;
  /* &::before{
    width: 100%;
    height: 168px;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    background-color: #ffffff;
    content: "";
  } */
`;

const PEHeader = styled.div`
  @media (min-width: 1080px) {
    height: 64px;
    width: 1080px;
    padding: 0px;
  }
  @media (min-width: 1080px) {
    width: 1080px;
  }
  position: fixed;
  top: 0px;
  z-index: 100;
  /* width: 100%; */
  height: 60px;
  background: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.015em;
  padding: 0px 16px;
  box-shadow: none;
  transform: translateY(0px);
  margin: 0px auto;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: relative;
`;

const HeaderLeft = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
  color: rgb(13, 13, 13);
`;

const HeaderLink = styled(Link)`
  position: relative;
  z-index: 1;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
  color: rgb(13, 13, 13);
`;

const HeaderRight = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const HeaderButton = styled.button`
  @media (min-width: 1080px) {
    width: 120px;
  }
  &:hover,
  &:active {
    opacity: ${props => props.disabled ? 1 : 0.6};
  }
  cursor: ${props => props.disabled ? "auto" : "pointer"};
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 40px;
  white-space: nowrap;
  border-radius: 1px;
  margin: 0px;
  border: 0px;
  outline: none;
  font-weight: normal;
  box-sizing: border-box;
  padding: 0px 16px;
  background-color: ${props => props.disabled ? "rgb(240, 240, 240)" : "rgb(248, 100, 83)"};
  color: ${props => props.disabled ? "rgb(61,61,61)" : "rgb(255, 255, 255)"};
`;

const Title = styled.div`
  @media (min-width: 1080px) {
    font-weight: 700;
    padding: 39px 0px 21px;
    margin: 0px auto;
    width: 1080px;
    font-size: 32px !important;
    line-height: 44px !important;
    font-family: NotoSansKR, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial,
      sans-serif !important;
  }
  padding: 24px 16px;
  font-weight: 700;
  font-size: 24px !important;
  line-height: 36px !important;
  font-family: NotoSansKR, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial,
    sans-serif !important;
`;
const CategoryWrapper = styled.div`
  @media (min-width: 1080px) {
    width: 1080px;
    margin: 0px auto;
    padding: 0px;
  }
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 0px 16px;
  position: sticky;
  overflow-x: auto;
`;

const PETabsWrapper = styled.ul`
  padding: 0px;
  margin: 0px;
  height: 60px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  white-space: nowrap;
  list-style-type: disc;
  flex-direction: row;
  position: sticky;
`;

const PETabItem = styled.li`
  position: relative;
  display: flex;
  height: 100%;
  margin: 0px 8px;
  opacity: ${(props) => (!props.selected ? '0.3' : '1')};
  &:first-child {
    margin-left: 0;
  }
  ${(props) => {
    if (props.selected) {
      return css`
        &:after {
          content: '';
          position: absolute;
          left: 0px;
          bottom: 0px;
          display: block;
          width: 100%;
          height: 2px;
          background: rgb(248, 100, 83);
        }
      `;
    }
  }}
  @media (min-width: 1080px) {
    margin: 0 16px;
  }
  a {
    color: rgb(13, 13, 13);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    opacity: 1;
    font-size: 14px !important;
    line-height: 22px !important;
    font-family: NotoSansKR, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial,
      sans-serif !important;
    font-weight: 700 !important;
    text-decoration: none;
  }
  span {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    height: 14px;
    margin-left: 4px;
    padding: 0px 4px;
    background: rgb(233, 233, 233);
    border-radius: 2px;
    font-weight: normal;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: -0.005em;
  }
`;

const PEContentContainer = styled.div`
  @media (min-width: 1080px) {
    padding: 84px 0px 0px;
    width: 100%;
    max-width: 1080px;
    margin: 0px auto;
  }
  padding: 48px 16px 0px;
`;
export default ProjectEditor;
