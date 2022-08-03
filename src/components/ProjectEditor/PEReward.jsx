import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import {
  Asterisk,
  PEForm,
  PEFormItemTitle,
  PEInfo,
  PEInfoDesc,
  PEInfoTitle,
  PEItemWrapper,
  PEFormInput,
} from "./PEStyles";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { removeRewards, setRewards } from "../../redux/newPostSlice";

const PEReward = (props) => {
  const { postData } = props;
  const [rewardItem, setRewardItem] = useState("");
  const [fundingPrice, setFundingPrice] = useState(0);
  const dispatch = useDispatch();

  const rewardItemRef = useRef();
  const fundingPriceRef = useRef();

  const handleRewardItem = (e) => {
    setRewardItem(e.target.value);
  };
  const handleFundingPrice = (e) => {
    if(Number(e.target.value) > 2100000000) {
      alert("최대 21억까지 설정 가능합니다.")
      setFundingPrice("2100000000")
    }
    else setFundingPrice(e.target.value.replace(/[^0-9\\.]+/g, ""));
  };

  const handleSaveOnClick = (e) => {
    if(rewardItem === "") alert("선물 아이템을 입력하세요.")
    else if(fundingPrice <= 0) alert("최소 후원금액은 0원 이상 입력하세요.")
    else{
      dispatch(
        setRewards([
          ...postData.rewards,
          {
            rewardItem: rewardItemRef.current.value,
            fundingPrice: Number(fundingPriceRef.current.value),
          },
        ])
      )
      rewardItemRef.current.value = "";
      fundingPriceRef.current.value = "";
      setRewardItem("")
      setFundingPrice("")
    }
  }

  console.log(postData?.rewards);
  useEffect(() => {
    console.log(postData?.title);
    console.log(rewardItem, fundingPrice);
  }, [rewardItem, fundingPrice]);
  return (
    <>
      <PEItemWrapper>
        <PEInfo style={{ position: "sticky", top: "0" }}>
          <PEInfoTitle>
            내가 만든 선물
            <Asterisk />
          </PEInfoTitle>
          <RewardList>
            {postData?.rewards.map((x, i) => {
              return (
                <li>
                  <div>
                    <strong>
                      {x.fundingPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </strong>
                    <span>{x.rewardItem}</span>
                  </div>
                  {i !== 0 && (
                    <button 
                    onClick={() => {
                      console.log(i);
                      dispatch(removeRewards(i))
                    }}>
                      <img
                        src={process.env.PUBLIC_URL + "/images/trashcan.svg"}
                      />
                    </button>
                  )}
                </li>
              );
            })}
          </RewardList>
        </PEInfo>
        <PEForm>
          <MakeRewardWrapper>
            <div className="createitemwrap">
              <PEInfoTitle>
                선물 만들기
                <Asterisk />
              </PEInfoTitle>
              <PEInfoDesc>
                선물은 후원자에게 프로젝트의 가치를 전달하는 수단입니다. 다양한
                금액대로 여러 개의 선물을 만들어주세요. 펀딩 성공률이 높아지고,
                더 많은 후원 금액을 모금할 수 있어요.
              </PEInfoDesc>
              <PEFormItemTitle style={{ marginTop: "1em" }}>
                선물 아이템
              </PEFormItemTitle>
              <PEFormInput
                maxLength={50}
                inputRef={rewardItemRef}
                changeHandler={handleRewardItem}
              />
              <PEFormItemTitle>최소 후원 금액</PEFormItemTitle>
              <PEFormInput
                value={fundingPrice}
                inputmode={"numeric"}
                inputRef={fundingPriceRef}
                changeHandler={handleFundingPrice}
              />
              <ButtonWrapper>
                <button
                  onClick={() => {
                    rewardItemRef.current.value = "";
                    fundingPriceRef.current.value = "";
                    setRewardItem("")
                    setFundingPrice("")
                  }}
                >
                  초기화
                </button>
                <button
                  onClick={handleSaveOnClick}
                >
                  저장
                </button>
              </ButtonWrapper>
            </div>
          </MakeRewardWrapper>
        </PEForm>
      </PEItemWrapper>
    </>
  );
};

const RewardList = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  li {
    padding: 0px;
    list-style: none;
    overflow: hidden;
    min-height: 90px;
    height: auto;
    border-radius: 4px;
    position: relative;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(240, 240, 240);
    box-sizing: border-box;
    margin: 0px 0px 12px;
    button {
      cursor: pointer;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 40px;
      height: 32px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      font-weight: 400;
      color: rgb(61, 61, 61);
      position: absolute;
      top: 24px;
      right: 28px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
      border-top-width: 1px;
      border-right-width: 1px;
      border-bottom-width: 1px;
      border-left-width: 1px;
      border-top-style: solid;
      border-right-style: solid;
      border-bottom-style: solid;
      border-left-style: solid;
      border-top-color: rgb(240, 240, 240);
      border-right-color: rgb(240, 240, 240);
      border-bottom-color: rgb(240, 240, 240);
      border-left-color: rgb(240, 240, 240);
      border-image-source: initial;
      border-image-slice: initial;
      border-image-width: initial;
      border-image-outset: initial;
      border-image-repeat: initial;
      font-size: 11px;
      font-family: "NotoSansKR";
      line-height: 32px;
      img {
        width: 1em;
        height: 1em;
      }
    }
    div {
      width: 100%;
      min-height: 90px;
      padding: 24px 28px;
      text-align: left;
      box-sizing: border-box;
      border: 0px;
      background: transparent;
      & strong {
        display: block;
        font-weight: 700;
        color: rgb(61, 61, 61);
        margin: 0px 0px 8px;
        max-width: 222px;
        font-size: 20px !important;
        line-height: 28px !important;
      }
      & span {
        display: block;
        font-weight: 400;
        color: rgb(109, 109, 109);
        margin: 10px 0px 0px px;
        font-size: 12px !important;
        line-height: 20px !important;
      }
    }
  }
`;

const MakeRewardWrapper = styled.div`
  flex: 1 1 0%;
  /* margin-top: 76px; */
  .createitemwrap {
    padding: 44px 48px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 4px;
    box-sizing: border-box;
    background-color: white;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 22px 0px 0px;
  button {
    flex: 0 0 auto;
    width: 170px;
    font-size: 12px;
    line-height: 20px;
    margin: 0px 0px 0px 10px;
    cursor: pointer;
    z-index: 4;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    white-space: nowrap;
    border-radius: 1px;
    margin: 0px;
    outline: 0px;
    box-sizing: border-box;
    font-weight: normal;
    padding: 0px 24px;
    border: 1px solid rgb(240, 240, 240);
    color: rgb(61, 61, 61);
    background: rgb(255, 255, 255);
    &:first-child {
      margin-left: 0px;
      &:hover {
        border-color: rgb(228, 228, 228);
      }
    }
    &:last-child {
      flex: 1 1 0%;
      margin: 0px 0px 0px 10px;
      background-color: ${(props) => props.theme.error};
      color: white;
      &:active,
      &:hover {
        opacity: 0.6;
      }
    }
  }
`;

export default PEReward;
