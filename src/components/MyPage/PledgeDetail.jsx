import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TumblbugApis from "../../shared/api";
import { useQuery } from "@tanstack/react-query";

const PledgeDetail = (props) => {
  const params = useParams();
  const pledgeId = params.fundid;
  const getOnePledge = async() => {
      const res = await TumblbugApis.getOnePledge(pledgeId)
      return res.data
  }
  const onePledgeQuery = useQuery(["onePledge"], getOnePledge, {
      onSuccess: data => {
          console.log(data);
      }
  })

  return (
    <>
      <PledgeTitleWrapper>
        <h3>projectId {onePledgeQuery.data.projectId}</h3>
      </PledgeTitleWrapper>
      <InfoBox>
        <InfoBoxHeader>
          <p>후원 정보</p>
          <dl>
          <dt>후원 번호</dt>
          <dd>fundId {onePledgeQuery.data.fundId}</dd>
          </dl>
        </InfoBoxHeader>
      </InfoBox>
      <InfoBox>
        <InfoBoxHeader>
          <p>선물 정보</p>
          <dl>
          <dt>선물 번호</dt>
          <dd>rewardId {onePledgeQuery.data.rewardId}</dd>
          </dl>
          <dl>
          <dt>선물 구성</dt>
          <dd>rewardItem {onePledgeQuery.data.rewardItem}</dd>
          </dl>
          <dl>
          <dt>후원 금액</dt>
          <dd>fundingPrice {onePledgeQuery.data.fundingPrice}</dd>
          </dl>
        </InfoBoxHeader>
      </InfoBox>
    </>
  );
};

const InfoBox = styled.div`
  @media only screen and (min-width: 1080px) {
    &:not(:first-child) {
      margin-top: 40px;
    }
  }
  @media only screen and (min-width: 1080px) {
    padding: 24px 20px;
    border: 1px solid rgb(240, 240, 240);
  }
  &:last-child{
    margin-bottom: 80px;
  }
  padding: 28px px 16px;
  border-top: 6px solid rgba(240, 240, 240, 0.5);
  border-radius: 1px;
`;

const InfoBoxHeader = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: flex-start;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
  p {
    margin: 0;
    padding: 0;
    font-weight: 700;
    color: rgb(13, 13, 13);
    font-size: 16px !important;
    line-height: 24px !important;
  }
  dl {
    &:not(:first-child) {
      margin-top: 12px;
    }
    @media only screen and (min-width: 1080px) {
      gap: 40px;
    }
    margin: 0px;
    display: flex;
    gap: 20px;
    width: 100%;
  }
  dt{
    flex: 0 0 80px;
    font-weight: 500;
    color: rgb(109, 109, 109);
    font-size: 14px !important;
    line-height: 22px !important;
  }
  dd{
    margin: 0px;
    flex: 1 1 auto;
    font-weight: 500;
    color: rgb(61, 61, 61);
    font-size: 14px !important;
    line-height: 22px !important;
  }
`;

const PledgeTitleWrapper = styled.div`
  @media only screen and (min-width: 1200px) {
    width: 1160px;
  }
  @media only screen and (min-width: 1080px) {
    -webkit-box-align: center;
    align-items: center;
    width: 1080px;
    padding: 32px 0px 0px;
  }
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  padding: 32px 16px 36px;
  h3 {
    @media only screen and (min-width: 1080px) {
      font-size: 24px;
      line-height: 36px;
      letter-spacing: -0.025em;
    }
    display: block;
    font-size: 16px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: rgb(61, 61, 61);
    font-weight: bold;
  }
`;

export default PledgeDetail;
