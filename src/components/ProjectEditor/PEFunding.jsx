import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {setGoal,
    setStartDate,
    setEndDate} from "../../redux/newPostSlice"
import {
  Asterisk,
  PEForm,
  PEFormItemTitle,
  PEInfo,
  PEInfoDesc,
  PEInfoTitle,
  PEItemWrapper,
  PENotice,
  PEFormInput,
} from "./PEStyles";

const PEFunding = (props) => {
  const [errors, setErrors] = useState({
    titleError: false,
    summaryError: false,
  });
  const {postData} = props
  const dispatch = useDispatch()


  const goalRef = useRef();
  const startDateRef = useRef()
  const endDateRef = useRef()
  
  const handleOnChange = (e) => {
    let value = e.target.value;
    if(Number(value) > 2100000000) {
      alert("최대 21억까지 설정 가능합니다.")
      dispatch(setGoal("2100000000"))
    }
    else{
      // value = Number(value.replaceAll(',', ''));
      // const formatValue = value.toLocaleString('ko-KR');
      value = value.replace(/[^0-9\\.]+/g, "");
      const formatValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // console.log(formatValue);
      // setGoal(formatValue);
      dispatch(setGoal(Number(value)))
      goalRef.current.value = formatValue;
    }
  };
  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e.target.value))
    dispatch(setEndDate(e.target.value))
    console.log(e.target.value);
  }
  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e.target.value))
    console.log(e.target.value);
  }
  useEffect(() => {
    // checkAll();
  }, []);
  useEffect(() => {}, [goalRef.current?.value]);
  return (
    <>
      <PEItemWrapper>
        <PEInfo>
          <PEInfoTitle>
            목표 금액
            <Asterisk />
          </PEInfoTitle>
          <PEInfoDesc>
          프로젝트를 완수하기 위해 필요한 금액을 설정해주세요.
          </PEInfoDesc>
          <PENotice
            title={"목표 금액 설정 시 꼭 알아두세요!"}
            desc={[
              `종료일까지 목표금액을 달성하지 못하면 후원자 결제가 진행되지 않습니다.`,
              `종료 전 후원 취소를 대비해 10% 이상 초과 달성을 목표로 해주세요.`,
              `제작비, 선물 배송비, 인건비, 예비 비용 등을 함께 고려해주세요.`,
            ]}
          />
        </PEInfo>
        <PEForm>
          <GoalWrapper>
            <PEFormItemTitle>목표금액</PEFormItemTitle>
            <PEFormInput
              inputRef={goalRef}
              changeHandler={handleOnChange}
              inputmode={"numeric"}
              value={postData.goal}
            />
            <div className="calcbox">
              <div className="totamount">
                <span>목표 금액 달성 시 예상 수령액</span>
                <em>{postData.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</em>
              </div>
              <div className="feeswrap">
                총 수수료
                <em>
                  {Math.floor((Number(postData.goal?.toString().replace(/[^0-9\\.]+/g, "")) * 0.28))
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </em>
              </div>
              <div className="feeswrap">
                결제 수수료 (총 결제액의 3% + VAT)
                <em>
                  {Math.floor((Number(postData.goal?.toString().replace(/[^0-9\\.]+/g, "")) * 0.13))
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </em>
              </div>
              <div className="feeswrap">
                플랫폼 수수료 (총 결제액의 5% + VAT)
                <em>
                  {Math.floor((Number(postData.goal?.toString().replace(/[^0-9\\.]+/g, "")) * 0.15))
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </em>
              </div>
            </div>
          </GoalWrapper>
        </PEForm>
      </PEItemWrapper>
      <PEItemWrapper>
        <PEInfo>
          <PEInfoTitle>
            펀딩 일정
            <Asterisk />
          </PEInfoTitle>
          <PEInfoDesc>
            설정한 일시가 되면 펀딩이 자동 시작됩니다. 펀딩 시작 전까지 날짜를
            변경할 수 있고, 즉시 펀딩을 시작할 수도 있습니다.
          </PEInfoDesc>
        </PEInfo>
        <PEForm>
          <PlanWrap>
            <li>
              <div className="plantitle">
                <div className="plantitlewrap">
                  <p className="plantitlep">시작일</p>
                <PEFormInput 
                type={"date"}  
                min={new Date().toISOString().split('T')[0]}
                inputRef={startDateRef}
                changeHandler={handleStartDateChange}
                value={postData.startDate}
                />
                </div>
              </div>
              {/* {startDate && endDate && <div className="plantitle">
                <div className="plantitlewrap">
                  <p className="plantitlep">펀딩 기간</p>
                  {
                    () => {
                        var depDate = moment(startDate);
                        var arrDate = moment(endDate);
                        var nbDays = depDate.diff(arrDate, 'days');
                        console.log(nbDays);
                        return nbDays
                    }
                  }
                </div>
              </div>} */}
              
            </li>
            <li>
            <div className="plantitle">
                <div className="plantitlewrap">
                  <p className="plantitlep">종료일</p>
                  {postData.startDate && <PEFormInput 
                type={"date"}  
                min={postData.startDate}
                inputRef={endDateRef}
                changeHandler={handleEndDateChange}
                value={postData.endDate}
                />}
                </div>
              </div>
            </li>
            <li>
                {/* <div className="plantitle"> */}
                <div className="plantitlewrap">
                  <p className="plantitlep">후원자 결제 종료</p>
                  종료일 다음 날부터 7일
                {/* </div> */}
              </div>
            </li>
            <li>
                {/* <div className="plantitle"> */}
                <div className="plantitlewrap">
                  <p className="plantitlep">정산일</p>
                  후원자 결제 종료 다음 날부터 7영업일
                </div>
              {/* </div> */}
            </li>
          </PlanWrap>
        </PEForm>
      </PEItemWrapper>
    </>
  );
};

const GoalWrapper = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(234, 234, 234);
  border-radius: 4px;
  padding: 32px 24px 24px;
  /* width: 100%; */
  .calcbox {
    background: rgb(252, 252, 252);
    border-radius: 4px;
    padding: 25px 22px 15px;
    margin-top: 8px;
  }
  .totamount {
    @media (min-width: 1080px) {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      text-align: initial;
      span {
        padding-bottom: 0px;
      }
      em {
        display: inline;
      }
    }
    color: rgb(61, 61, 61);
    font-size: 12px;
    line-height: 19px;
    letter-spacing: -0.01em;
    border-bottom: 1px solid rgb(234, 234, 234);
    padding-bottom: 16px;
    margin-bottom: 11px;
    text-align: center;
    span {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    em {
      display: block;
      font-style: normal;
      color: rgb(248, 100, 83);
      font-size: 18px;
      line-height: 27px;
      letter-spacing: -0.02em;
      font-weight: bold;
    }
  }
  .feeswrap {
    @media (min-width: 1080px) {
      margin-bottom: 3px;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      em {
        display: inline;
      }
    }
    color: rgb(158, 158, 158);
    font-size: 12px;
    line-height: 19px;
    letter-spacing: -0.01em;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: 12px;
    em {
      font-style: normal;
      color: rgb(61, 61, 61);
      display: block;
    }
  }
`;

const PlanWrap = styled.ol`
  display: block;
  list-style-type: decimal;
  margin: 0px;
  padding: 0px;
  li {
    position: relative;
    list-style: none;
    padding: 0px 0px 38px 18px;
    color: rgb(158, 158, 158);
    &::before {
      position: absolute;
      top: 4px;
      left: 0px;
      z-index: 1;
      content: "";
      border: 3px solid rgb(0, 0, 0);
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 9px;
      background: rgb(255, 255, 255);
    }
    &::after {
      content: "";
      position: absolute;
      top: 16px;
      left: 4px;
      height: 100%;
      border-left: 1px solid rgb(228, 228, 228);
    }
    &:last-child::after{
        border: none;
    }
  }
  .planitem {
    @media (min-width: 1080px) {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      width: 100%;
    }
  }
  .plantitle {
    position: relative;
    list-style: none;
    padding: 0px 0px 38px 18px;
    color: rgb(158, 158, 158);
    margin-bottom: 10px;
  }
  .plantitlewrap {
    /* display: flex; */
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    color: rgb(158, 158, 158);
    margin: 0px 0px 10px;
  }
  .plantitlep {
    font-weight: 500;
    margin-bottom: 8px;
    color: rgb(13, 13, 13);
    display: flex;
    font-size: 12px !important;
    line-height: 20px !important;
  }
`;

export default PEFunding;
