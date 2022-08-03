import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export const PENotice = (props) => {
  const { title, desc } = props;
  useEffect(() => {
    console.log(Array.isArray(desc));
  }, [desc]);
  return (
    <NoticeWrapper>
      <div className="title">
        {title}
        <div>
          <img src={process.env.PUBLIC_URL + '/information.svg'} />
        </div>
      </div>
      <div>
        {Array.isArray(desc)
          ? desc.map((x, i) => {
              return <li key={x}>{x}</li>;
            })
          : desc}
      </div>
    </NoticeWrapper>
  );
};

export const Asterisk = (props) => {
  return (
    <AsteriskWrap>
      <img style={{}} src={process.env.PUBLIC_URL + '/asterisk.svg'} />
    </AsteriskWrap>
  );
};

export const PEFormInput = (props) => {
  const {
    inputRef,
    inputmode,
    maxLength,
    changeHandler,
    value,
    helperText,
    placeholder,
    error,
    type,
    min
  } = props;
  const [currentLength, setCurrentLength] = useState(0);
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <PEInputWrapper error={error} focus={focus}>
        <span>
          {!props.textarea && (
            <input
              ref={inputRef}
              onChange={(e) => {
                setCurrentLength(e.target.value.length);
                changeHandler(e);
              }}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              type={type ? type : 'text'}
              inputMode={inputmode}
              maxLength={maxLength}
              placeholder={placeholder}
              min={min}
              value={value}
            />
          )}
          {props.textarea && (
            <textarea
              ref={inputRef}
              onChange={(e) => {
                setCurrentLength(e.target.value.length);
                changeHandler(e);
              }}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder={placeholder}
              maxLength={maxLength}
              value={value}
            />
          )}
          {inputmode === 'numeric' && '원'}
        </span>
      </PEInputWrapper>
      <PEInputHelper error={error}>
        {error && <p>{helperText}</p>}
        {!type && !inputmode && (
          <span>
            {currentLength}/{maxLength}
          </span>
        )}
      </PEInputHelper>
    </div>
  );
};

export const PEItemWrapper = styled.div`
  @media (min-width: 1080px) {
    display: flex;
    padding-bottom: 48px;
    margin-bottom: 56px;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
  border-bottom: 1px solid rgb(240, 240, 240);
  padding-bottom: 40px;
  margin-bottom: 32px;
`;

export const PEInfo = styled.dl`
  @media (min-width: 1080px) {
    margin: 0px 0px 14px;
    width: 351px;
  }
  margin: 0px 0px 24px;
`;
export const PEInfoTitle = styled.dt`
  @media (min-width: 1080px) {
    font-weight: 700;
    margin-bottom: 12px;
    font-size: 16px !important;
    line-height: 24px !important;
  }
  margin-bottom: 14px;
  font-weight: 700;
  color: rgb(61, 61, 61);
  font-size: 14px !important;
  line-height: 22px !important;
`;
export const PEInfoDesc = styled.dd`
  font-weight: 400;
  color: rgb(109, 109, 109);
  margin: 0px;
  font-size: 14px !important;
  line-height: 24px !important;
`;

export const PEForm = styled.div`
  @media (min-width: 1080px) {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 630px;
    flex-direction: column;
  }
`;
export const PEFormItemTitle = styled.p`
  font-weight: bold;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.005em;
  margin-bottom: 8px;
  color: rgb(61, 61, 61);
  display: flex;
`;

export const AsteriskWrap = styled.div`
  display: inline-flex;
  align-items: center;
  img {
    width: 13px;
    height: 13px;
  }
`;

export const TooltipWrap = styled.em`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin: 0px 0px 0px 2px;
  padding: 2px;
  border: 0px;
  background: transparent;
  border-radius: 2px;
  outline: none;
  font-size: 16px;
  & > div {
    display: inline-flex;
    align-self: center;
  }
  img {
    width: 1em;
    height: 1em;
  }
`;

export const PEFromWithImgToolTip = styled.div`
  display: flex;
  flex-wrap: wrap;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  color: rgb(61, 61, 61);
  margin: 0px 0px 10px;
`;

export const ImgToolTip = styled.div`
  /* width: 100%; */
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 5%) 0px 2px 8px, rgb(0 0 0 / 10%) 0px 1px 0px;
  border-radius: 4px;
  padding: 16px 46px 16px 26px;
  position: relative;
  display: flex;
  margin: 10px 0px 0px;
  border: 1px solid rgb(240, 240, 240);
  transition: all 0.5s ease 0s;
  height: auto;
  transform: translateY(0px);
  opacity: 1;
  ${(props) => {
    if (!props.open)
      return css`
        width: 100%;
        background: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 5%) 0px 2px 8px, rgb(0 0 0 / 10%) 0px 1px 0px;
        border-radius: 4px;
        position: relative;
        border: 1px solid rgb(240, 240, 240);
        transition: all 0.5s ease 0s;
        height: 0px;
        overflow: hidden;
        transform: translateY(-10px);
        opacity: 0;
        padding: 0px 26px;
        margin: 0px;
      `;
  }}
  .title {
    @media (min-width: 1080px) {
      width: 212px;
      flex-shrink: 0;
      font-weight: 700 !important;
    }
    width: 100%;
    margin-bottom: 16px;
    font-size: 12px !important;
    line-height: 20px !important;
    font-weight: 700 !important;
  }
  .image {
    @media (min-width: 1080px) {
      -webkit-box-flex: 1;
      flex-grow: 1;
    }
    img {
      width: 100%;
    }
  }
`;

export const NoticeWrapper = styled.div`
  @media (min-width: 1080px) {
    margin-top: 25px;
  }
  background: rgb(253, 244, 243);
  border-radius: 8px;
  padding: 20px 24px 20px 50px;
  font-weight: 400;
  color: rgb(109, 109, 109);
  margin-top: 10px;
  font-size: 12px !important;
  line-height: 20px !important;
  .title {
    color: rgb(248, 100, 83);
    margin-bottom: 10px;
    font-weight: 700;
    position: relative;
    font-size: 12px !important;
    line-height: 20px !important;
    & > div {
      position: absolute;
      top: 3px;
      left: -23px;
      display: inline-flex;
      align-self: center;
      img {
        position: relative;
        top: 1px;
        margin-right: 6px;
        width: 1em;
        font-size: 12px;
        height: 1em;
      }
    }
  }
`;

export const PEInputWrapper = styled.div`
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  padding: 0px 18px;
  border: ${(props) => {
    if (props.error) return '1px solid rgb(244, 69, 68)';
    else if (props.focus) return '1px solid rgb(13, 13, 13)';
    else return '1px solid rgb(240, 240, 240)';
  }};
  span {
    border: 1px solid rgb(230, 230, 230);
    color: rgb(13, 13, 13);
    background: rgb(255, 255, 255);
    padding: 0px 12px;
    /* max-height: 44px; */
    min-width: 100px;
    display: flex;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.015em;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 1px;
    flex: 1 1 0%;
    border: 0px;
    text-align: left;
    padding: 0px;
    background: transparent;
  }
  input,
  textarea {
    width: 100%;
    background: transparent;
    border: 0px;
    padding: 11px 0px;
    box-sizing: border-box;
    height: 100%;
    outline: none;
    margin: 0px;
    appearance: none !important;
    text-align: inherit;
    font-weight: 400;
    font-size: 14px !important;
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 24px !important;
  }
  textarea::-webkit-scrollbar {
    display: none;
  }
`;

export const PEInputHelper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-weight: 400;
  margin: 8px 0px 0px;
  font-size: 12px !important;
  line-height: 20px !important;
  p,
  span {
    color: ${(props) =>
      props.error ? 'rgb(244, 69, 68)' : 'rgb(158, 158, 158)'};
  }
  span {
    margin-left: auto;
  }
`;
