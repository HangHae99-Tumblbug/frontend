import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import TumblbugApis from "../../shared/api";


const Pledges = (props) => {
    const getPledges = async() => {
        const res = await TumblbugApis.getPledges()
        return res.data
    }
    const pledgesQuery = useQuery(["pledges"], getPledges, {
        onSuccess: data => {
            console.log(data);
        }
    })
  return (
    <>
      <PledgesTitle>
        <span>후원현황</span>
      </PledgesTitle>
      <PledgesCountWrapper>
        <span>3</span>
        건의 후원 내역이 있습니다.
      </PledgesCountWrapper>
      <PledgesListWrapper>
        {pledgesQuery.data.map((x,i) =>
            <PledgeItemWrapper>
                <div style={{width: "10rem"}}>
                    <img style={{width: "100%"}} src={x.projectThumbnail} />
                </div>
                <div style={{marginLeft: "1rem"}}>
                <div className="idswrap">후원번호: {x.fundId}</div>
            <div className="projectTitle">
                <Link to={`../pledges/${x.fundId}`}>
                    {x.projectTitle}
                </Link>
            </div>
            <li>{x.rewardItem} : {x.rewardFundingPrice}원</li>
                </div>
            
            </PledgeItemWrapper>)
            }
      </PledgesListWrapper>
    </>
  );
};

const PledgesTitle = styled.div`
  @media (min-width: 1080px) {
    padding: 48px 0px 28px;
  }
  padding: 32px 16px 20px;
  & > span {
    @media (min-width: 1080px) {
      font-weight: 700;
      font-size: 32px !important;
      line-height: 44px !important;
    }
    color: rgb(28, 28, 28);
    font-weight: 700;
    font-size: 24px !important;
    line-height: 36px !important;
  }
`;

const PledgesCountWrapper = styled.div`
  @media only screen and (min-width: 1080px) {
    max-width: 1080px;
    margin-top: 0px;
    margin-right: auto;
  }
  font-size: 16px;
  width: 100%;
  line-height: 44px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  span {
    color: rgb(255, 87, 87);
  }
`;

const PledgesListWrapper = styled.div`
  @media only screen and (min-width: 1080px) {
    /* border-top: none; */
    margin: 0px;
    margin: 48px 0px 48px;
    border-radius: 4px;
    border-left-width: 1px;
    border-right-width: 1px;
  }
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin: 2px -16px 0px;
  /* padding: 24px 0px 0px; */
  /* border-top: 1px solid rgb(230, 230, 230); */
  border-left-width: 0px;
  border-right-width: 0px;
  border: 1px solid rgb(230, 230, 230);
`;

const PledgeItemWrapper = styled.div`
    & > div > img{
        border-radius: .5em;
    }
  &:first-of-type {
    border-top: none;
  }
  border-top: 1px solid rgb(230, 230, 230);
  @media only screen and (min-width: 1080px) {
    /* flex-direction: row; */
  flex-direction: column;
    padding: 20px;
  }
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  .idswrap {
    @media only screen and (min-width: 1080px) {
      font-size: 12px;
      line-height: 19px;
      letter-spacing: -0.01em;
    }
    font-size: 10px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: rgb(109, 109, 109);
    position: relative;
  }
  .projectTitle{
    @media only screen and (min-width: 1080px){
    font-size: 16px;
    line-height: 27px;
    letter-spacing: -0.02em;
    padding: 0px 20px 0px 0px;
    max-height: 54px;
    }
    @supports (-webkit-line-clamp:2){
    max-height: initial;
    }
    font-weight: bold;
    color: rgb(61, 61, 61);
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.015em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    max-height: 48px;
    text-decoration: none;
    a{
        color: rgb(61,61,61);
        text-decoration: none;
        &:visited{
        color: rgb(61,61,61);
        }
        &:hover{
        text-decoration: underline;
        }
    }
  }
`;
export default Pledges;
