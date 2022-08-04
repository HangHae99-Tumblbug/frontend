import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TumblbugApis from '../../shared/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategory,
  setSummary,
  setTitle,
  setThumbnails,
  setTmpImage
} from '../../redux/newPostSlice';
import {
  Asterisk,
  ImgToolTip,
  PEForm,
  PEFormItemTitle,
  PEInfo,
  PEInfoDesc,
  PEInfoTitle,
  PEItemWrapper,
  PENotice,
  PEFormInput,
  PEFromWithImgToolTip,
  TooltipWrap
} from './PEStyles';

const PEDefault = (props) => {
  const [errors, setErrors] = useState({
    titleError: false,
    summaryError: false
  });
  const [showTitleTooltip, setShowTitleTooltip] = useState(true);
  const [showSummaryTooltip, setShowSummaryTooltip] = useState(true);
  const [showImageTooltip, setShowImageTooltip] = useState(true);

  const categoryRef = useRef();
  const titleRef = useRef();
  const summaryRef = useRef();
  const thumbnailRef = useRef();

  const dispatch = useDispatch();
  const { postData } = props;
  //   const postData = useSelector(state => state.post)

  const checkAll = () => {
    let newErrors = { ...errors };
    if (!titleRef.current.value) newErrors = { ...newErrors, titleError: true };
    else newErrors = { ...newErrors, titleError: false };
    if (summaryRef.current.value.length < 10)
      newErrors = { ...newErrors, summaryError: true };
    else newErrors = { ...newErrors, summaryError: false };
    setErrors(newErrors);
  };
  const handleOnChange = (e) => {
    checkAll();
    dispatch(setCategory(categoryRef.current.value));
    dispatch(setTitle(titleRef.current.value));
    dispatch(setSummary(summaryRef.current.value));
    console.log(postData);
  };
  const handleImageChange = (e) => {
    if (postData.thumbnails?.length >= 5)
      alert('대표 이미지는 최대 5개까지 업로드 가능합니다.');
    else {
      let formData = new FormData();
      formData.append('file', e.target.files[0]);
      TumblbugApis.postThumbnailUpload(formData).then((res) => {
        if (postData.thumbnails) {
          dispatch(setThumbnails([...postData.thumbnails, res.data]));
          dispatch(setTmpImage(res.data.filename));
        } else {
          dispatch(setThumbnails([res.data]));
        }
      });
      console.log(formData);
    }
  };
  useEffect(() => {
    checkAll();
    console.log(postData);
  }, []);
  useEffect(() => {
    console.log(postData);
    console.log(postData.rewards);
  }, [postData]);
  useEffect(() => {
    console.log(thumbnailRef);
  }, [thumbnailRef]);

  return (
    <>
      <PEItemWrapper>
        <PEInfo>
          <PEInfoTitle>
            프로젝트 카테고리
            <Asterisk />
          </PEInfoTitle>
          <PEInfoDesc>
            프로젝트 성격과 가장 일치하는 카테고리를 선택해주세요.
            <br />
            적합하지 않을 경우 운영자에 의해 조정될 수 있습니다.
          </PEInfoDesc>
        </PEInfo>
        <PEForm>
          <PEFormItemTitle>카테고리</PEFormItemTitle>
          <div style={{ position: 'relative' }}>
            <SelectorWrapper>
              <select
                defaultValue={postData.category}
                ref={categoryRef}
                onChange={handleOnChange}
              >
                <option value="game">게임</option>
                <option value="fashion">패션</option>
                <option value="culture">문화</option>
                <option value="pet">반려동물</option>
                <option value="beauty">뷰티</option>
              </select>
            </SelectorWrapper>
          </div>
        </PEForm>
      </PEItemWrapper>
      <PEItemWrapper>
        <PEInfo>
          <PEInfoTitle>
            프로젝트 제목
            <Asterisk />
          </PEInfoTitle>
          <PEInfoDesc>
            프로젝트의 주제, 창작물의 특징이 드러나는 멋진 제목을 붙여주세요.
          </PEInfoDesc>
        </PEInfo>
        <PEForm>
          <PEFormItemTitle
            style={{ cursor: 'pointer' }}
            onClick={() => setShowTitleTooltip(!showTitleTooltip)}
          >
            제목
            <TooltipWrap>
              <div>
                <img src={process.env.PUBLIC_URL + '/tooltip.svg'} />
              </div>
            </TooltipWrap>
          </PEFormItemTitle>
          <PEFromWithImgToolTip>
            <ImgToolTip open={showTitleTooltip}>
              <div className="title">
                제목은
                <br />
                어디에 쓰이나요?
              </div>
              <div className="image">
                <img src={process.env.PUBLIC_URL + '/PE-tooltip-title.png'} />
              </div>
            </ImgToolTip>
          </PEFromWithImgToolTip>
          <PEFormInput
            inputRef={titleRef}
            error={errors.titleError}
            maxLength={32}
            placeholder={'제목을 입력해주세요'}
            changeHandler={handleOnChange}
            value={postData.title}
          />
        </PEForm>
      </PEItemWrapper>
      <PEItemWrapper>
        <PEInfo>
          <PEInfoTitle>
            프로젝트 요약
            <Asterisk />
          </PEInfoTitle>
          <PEInfoDesc>
            후원자 분들이 프로젝트를 빠르게 이해할 수 있도록
            <br />
            명확하고 간략하게 소개해주세요.
          </PEInfoDesc>
        </PEInfo>
        <PEForm>
          <PEFormItemTitle
            style={{ cursor: 'pointer' }}
            onClick={() => setShowSummaryTooltip(!showSummaryTooltip)}
          >
            <TooltipWrap>
              <div>
                <img src={process.env.PUBLIC_URL + '/tooltip.svg'} />
              </div>
            </TooltipWrap>
          </PEFormItemTitle>
          <PEFromWithImgToolTip>
            <ImgToolTip open={showSummaryTooltip}>
              <div className="title">
                프로젝트 요약은
                <br />
                어디에 표시되나요?
              </div>
              <div className="image">
                <img src={process.env.PUBLIC_URL + '/PE-tooltip-summary.png'} />
              </div>
            </ImgToolTip>
          </PEFromWithImgToolTip>
          <PEFormInput
            inputRef={summaryRef}
            error={errors.summaryError}
            maxLength={50}
            placeholder={'프로젝트 요약을 입력해주세요'}
            changeHandler={handleOnChange}
            helperText={'최소 10자 이상 입력해주세요'}
            value={postData.summary}
            large
          />
        </PEForm>
      </PEItemWrapper>
      <PEItemWrapper>
        <PEInfo>
          <PEInfoTitle>
            프로젝트 대표 이미지
            <Asterisk />
          </PEInfoTitle>
          <PEInfoDesc>
            후원자들이 프로젝트의 내용을 쉽게 파악하고 좋은 인상을 받을 수
            있도록 이미지 가이드라인을 따라 주세요.
          </PEInfoDesc>
          <PENotice
            title={
              '1개 이상의 이미지를 등록하면 이미지 슬라이더 형태로 제공됩니다.'
            }
            desc={
              '푸시 메시지 등 이미지가 1개만 제공되는 상황에서 대표 이미지가 활용됩니다.'
            }
          />
        </PEInfo>
        <PEForm>
          <PEFormItemTitle
            style={{ cursor: 'pointer' }}
            onClick={() => setShowImageTooltip(!showImageTooltip)}
          >
            <TooltipWrap>
              <div>
                <img src={process.env.PUBLIC_URL + '/tooltip.svg'} />
              </div>
            </TooltipWrap>
          </PEFormItemTitle>
          <PEFromWithImgToolTip>
            <ImgToolTip open={showImageTooltip}>
              <div className="image">
                <img
                  src={process.env.PUBLIC_URL + '/PE-tooltip-thumbnail.png'}
                />
              </div>
            </ImgToolTip>
          </PEFromWithImgToolTip>
          <ImageUploader>
            <div>
              <span>
                <i>
                  <div
                    name="share-1"
                    className="Icon__SVGICON-sc-1xkf9cp-0 ccxeYs"
                  >
                    <svg viewBox="0 0 48 48">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.9087 8.12155L36.4566 18.3158C37.2603 18.7156 38.2648 18.6156 38.968 18.3158C39.6712 17.5163 39.6712 16.4169 38.968 15.7173L25.3059 2.5247C24.6027 1.8251 23.4977 1.8251 22.7945 2.5247L9.03196 15.8172C8.32877 16.5168 8.32877 17.6162 9.03196 18.3158C9.73516 19.0154 10.9406 19.0154 11.6438 18.3158L22.2922 8.12155V28.4111C22.2922 29.4106 23.0959 30.2091 24.1005 30.2091C25.105 30.2091 25.9087 29.4106 25.9087 28.4111V8.12155ZM5.61644 29.4104C5.61644 28.4109 4.81279 27.6104 3.80822 27.6104C2.80365 27.6104 2 28.5099 2 29.5093V44.202C2 45.2015 2.80365 46 3.80822 46H44.1918C45.1963 46 46 45.2015 46 44.202V29.5093C46 28.5099 45.1963 27.7113 44.1918 27.7113C43.1872 27.7113 42.3836 28.5099 42.3836 29.5093V42.3021H5.61644V29.4104Z"
                      ></path>
                    </svg>
                  </div>
                </i>
                이미지 업로드 ({postData.thumbnails?.length}/5)
              </span>
              <p>최소 1개, 최대 5개까지 업로드 가능</p>
              <p>
                파일 형식: jpg 또는 png / 사이즈: 가로 1,240px, 세로 930px 이상)
              </p>
              <strong>※ 이미지를 등록하면 즉시 반영됩니다.</strong>
            </div>
            <input
              onChange={handleImageChange}
              ref={thumbnailRef}
              type="file"
              accept=".jpg, .jpeg, .png"
            />
          </ImageUploader>
          <ThumbnailWrapper>
            {postData.thumbnails?.map((x) => {
              console.log('받아온 이미지 url들입니다.');
              console.log(x);
              return (
                <div
                  key={x?.url}
                  style={{ backgroundImage: `url(${x?.url})` }}
                />
              );
            })}
          </ThumbnailWrapper>
          {/* <PEFormInput maxLength={50}/> */}
        </PEForm>
      </PEItemWrapper>
    </>
  );
};

const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  div {
    width: 10rem;
    height: 10rem;
    background-size: cover;
    background-position: center;
    border: 1px solid #eee;
  }
`;

const ImageUploader = styled.div`
  width: 100%;
  padding: 13px;
  margin-bottom: 25px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  transition: border 0.4s ease 0s;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  input[type='file'] {
    cursor: pointer;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
  }
  span {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    font-weight: 500;
    margin: 0px auto 2px;
    font-size: 12px !important;
    line-height: 20px !important;
    i {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      font-size: 12px;
      margin: 0px 8px 0px 0px;
    }
  }
  p {
    width: 100%;
    font-weight: 400;
    color: rgb(158, 158, 158);
    text-align: center;
    margin: 0px;
    font-size: 12px !important;
    line-height: 20px !important;
  }
  strong {
    display: block;
    text-align: center;
    font-weight: 400;
    color: rgb(248, 100, 83);
    font-size: 12px !important;
    line-height: 20px !important;
  }
`;

const SelectorWrapper = styled.div`
  border: 1px solid rgb(230, 230, 230);
  color: rgb(13, 13, 13);
  background: rgb(248, 248, 248);
  padding: 0px 0px 0px 12px;
  max-height: 44px;
  min-width: 100px;
  display: flex;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.015em;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 1px;
  padding: 0px 18px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  /* appearance: none; */
  select {
    width: 100%;
    background: transparent;
    border: 0px;
    padding: 11px 0px;
    box-sizing: border-box;
    height: 100%;
    outline: none;
    margin: 0px;
    appearance: none !important;
  }
`;

export default PEDefault;
