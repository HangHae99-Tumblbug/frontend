import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Introduction = ({ project, time_difference }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <IntroductionContainer>
      <TitleContainer>
        <Category>{project.category}</Category>
        <Title>{project.title}</Title>
      </TitleContainer>
      <ProjectInfoContainer>
        <ImageWrapper>
          <StyledSlider {...settings}>
            {project.thumbnails.map((it, index) => (
              <img src={it} key={index} alt="thumbnails" />
            ))}
          </StyledSlider>
        </ImageWrapper>
        <div className="right-container">
          <div className="info-wrapper">
            <Price>
              <div className="sec funding-count">모인금액</div>
              <span className="common funding-goal">
                {project.goal}
                <span>원</span>
              </span>
              <span>{`2743%`}</span>
            </Price>
            <Time>
              <div className="sec">남은 시간</div>
              <div>
                <span className="common">{time_difference}</span>일
              </div>
            </Time>
            <Funding>
              <div className="sec">후원자</div>
              <div className="common">
                {`fundingCount`} <span>명</span>
              </div>
            </Funding>
          </div>
          <FundingInfo>
            <div>
              <span>목표 금액</span>
              <span>{project.goal}원</span>
            </div>
            <div className="funding-date">
              <span>펀딩 기간</span>
              <span>{project.startDate}</span>
              <span>{project.endDate}</span>
              <span>{`남은 날짜`}</span>
            </div>
            <div>
              <span>결제</span>
              <span>목표 금액 달성시 {project.endDate + '1'}에 결제 진행</span>
            </div>
          </FundingInfo>
          <button className="funding-btn">프로젝트 후원하기</button>
        </div>
      </ProjectInfoContainer>
    </IntroductionContainer>
  );
};

export default Introduction;

const IntroductionContainer = styled.div`
  text-align: center;
`;

const TitleContainer = styled.div`
  padding: 2rem 0;
  -webkit-box-align: center;
  align-items: center;
  order: 1;

  @media screen and (max-width: 1440px) {
    padding-top: 0;
    padding-bottom: 1rem;
    text-align: left;
  }
`;

const Category = styled.span`
  padding: 0.3rem;

  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(117, 117, 117);
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(239, 239, 239);
  border-radius: 2px;

  @media screen and (max-width: 1440px) {
    font-size: 0.7rem;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-top: 2rem;
  @media screen and (max-width: 1440px) {
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

const ProjectInfoContainer = styled.div`
  display: flex;
  padding: 2rem 0;

  @media screen and (max-width: 1440px) {
    padding: 0;
    display: block;
  }

  div.right-container {
    width: 100%;
    div {
      width: 100%;
    }
    @media screen and (max-width: 1440px) {
      padding-top: 3rem;
      div {
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }
      span {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      .common {
        font-size: 1.3rem;
      }
      .sec {
        font-size: 0.9rem;
        color: gray;
      }
    }
  }

  div.funding-count {
    text-align: left;
    margin-bottom: 0.5rem;
  }

  div.info-wrapper {
    width: 40%;
    text-align: left;

    @media screen and (max-width: 1440px) {
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
      width: 100%;
    }
  }

  button.funding-btn {
    margin-top: 0.5rem;
    border-radius: 0.285714rem;
    text-transform: none;
    text-shadow: none;
    font-weight: bold;
    line-height: 1em;
    font-style: normal;
    text-align: center;
    text-decoration: none;
    background-color: rgb(250, 100, 98);
    color: rgb(255, 255, 255);
    padding: 1.2em 2em;
    font-size: 1.1em;
    width: 100%;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {
      transition: 300ms ease-in;
      background-color: rgb(255, 58, 58);
    }
  }
`;

const ImageWrapper = styled.div`
  width: 60%;

  margin-right: 5rem;

  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  div {
    height: 100%;
  }

  .slick-list {
    overflow: hidden;

    height: 100% !important;
  }

  .slick-track {
    height: 100%;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1440px) {
    div {
      width: 100%;
    }
    .slick-list {
      width: 100%;
    }

    .slick-track {
      width: 100%;
    }
  }
`;

const Price = styled.div`
  margin: 0px 0px 1.75rem;
  & span {
    font-size: 2.75rem;
    margin-right: 10px;
    span {
      font-size: 1rem;
    }
  }
  & span:last-child {
    font-size: 1.3rem;
    font-weight: bolder;
  }

  @media screen and (max-width: 1440px) {
    display: flex;
    flex-direction: column;
  }
`;

const Time = styled.div`
  margin-bottom: 1.75rem;
  & div:first-child {
    margin-bottom: 0.5rem;
  }
  & div:last-child {
    span {
      font-size: 2.75rem;
      @media screen and (max-width: 1440px) {
        font-size: 1rem;
      }
    }
  }
`;

const Funding = styled.div`
  margin-bottom: 1.75rem;
  & div:first-child {
    margin-bottom: 0.5rem;
  }
  & div:last-child {
    font-size: 2.75rem;
  }
  span {
    font-size: 1rem;
  }
`;

const FundingInfo = styled.div`
  padding: 20px 0px 10px;

  div {
    display: flex;
    text-align: left;
    align-items: center;
    margin-bottom: 0.5rem;
    & span:first-child {
      width: 56px;
      margin-right: 20px;
      font-weight: 700;
      color: rgb(61, 61, 61);
      font-size: 13px !important;
      line-height: 20px !important;
    }
    & span:ntn-child(2) {
      font-weight: 400;
      color: rgb(61, 61, 61);
      font-size: 13px !important;
      line-height: 22px !important;
    }
  }
  .funding-date {
    & span:last-child {
      /* height: 20px; */
      margin-left: 6px;
      padding: 2px 6px;
      background-color: rgb(253, 244, 243);
      border-radius: 2px;
      font-weight: 700;
      font-size: 10px;
      color: rgb(255, 87, 87);
    }
  }
`;
