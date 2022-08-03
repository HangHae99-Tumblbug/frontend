import React, { useEffect, useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  Asterisk,
  PEForm,
  PEInfo,
  PEInfoTitle,
  PEItemWrapper,
  PENotice
} from './PEStyles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TumblbugApis from '../../shared/api';
import { useDispatch } from 'react-redux';
import { setPlan, setTmpImage } from '../../redux/newPostSlice';

const PEStory = (props) => {
  const QuillRef = useRef();
  const dispatch = useDispatch();
  // const [contents, setContents] = useState("");
  const { postData } = props;
  let onKeyEvent = false;

  const handleImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('file', file);
      // 현재 커서 위치 저장
      const { getEditor } = QuillRef.current;
      const range = getEditor().getSelection(true);

      // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
      getEditor().insertEmbed(
        range.index,
        'image',
        `https://mir-s3-cdn-cf.behance.net/project_modules/disp/f1055231234507.564a1d234bfb6.gif`
      );

      try {
        let url = '';
        const res = await TumblbugApis.postStoryImageUpload(formData);
        url = res.data.url;
        // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
        getEditor().deleteText(range.index, 1);
        // 받아온 url을 이미지 태그에 삽입
        getEditor().insertEmbed(range.index, 'image', url);
        // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
        getEditor().setSelection(range.index + 1);
      } catch (e) {
        getEditor().deleteText(range.index, 1);
      }
      // if(filename)dispatch(setTmpImage(filename))
    };
  };

  const handleOnKeyUp = (e) => {
    // console.log(QuillRef.current.getEditor().blur());
    if (e.keyCode === 13) {
      onKeyEvent = true;
      QuillRef.current.getEditor()?.blur();
      QuillRef.currnet.getEditor()?.focus();
      if (document.documentElement.className.indexOf('edit-focus') === -1) {
        document.documentElement.classList.toggle('edit-focus');
      }
      onKeyEvent = false;
    }
  };

  const handleOnFocus = (e) => {
    if (
      !onKeyEvent &&
      document.documentElement.className.indexOf('edit-focus') === -1
    ) {
      document.documentElement.classList.toggle('edit-focus');
      window.scrollTo(0, 0);
    }
  };

  const handleOnBlur = (e) => {
    if (
      !onKeyEvent &&
      document.documentElement.className.indexOf('edit-focus') !== -1
    ) {
      document.documentElement.classList.toggle('edit-focus');
    }
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] }
        ],
        ['image']
      ],
      handlers: {
        image: handleImage
      }
    },
    clipboard: { matchVisual: false }
  };
  return (
    <>
      <PEItemWrapper>
        <PEInfo>
          <PEInfoTitle>
            프로젝트 계획
            <Asterisk />
          </PEInfoTitle>
          <PENotice
            title={'텍스트 에디터 사용법'}
            desc={[
              `일단 붙여보고 멀쓸지 고민`,
              `종료 전 후원 취소를 대비해 10% 이상 초과 달성을 목표로 해주세요.`,
              `제작비, 선물 배송비, 인건비, 예비 비용 등을 함께 고려해주세요.`
            ]}
          />
        </PEInfo>
        <PEForm>
          <div>
            <div style={{ width: 'fit-content' }}>
              <GuideButton href="https://creator.tumblbug.com/9b760197-bec0-4ffb-84b0-c943c0b50ae6">
                <div>
                  <img src={process.env.PUBLIC_URL + '/storyguide.svg'} />
                </div>
                <p>작성 가이드</p>
              </GuideButton>
            </div>
            <StoryEditor
              ref={QuillRef}
              value={postData.plan}
              onChange={(e) => {
                console.log(e);
                const data = e;
                if (data.indexOf('<p><br></p>') > -1) {
                  const parsedata = data.replace(
                    /<p><br><\/p>/gi,
                    '<p>&nbsp;</p>'
                  );
                  dispatch(setPlan(parsedata));
                }
              }}
              // onKeyUp={handleOnKeyUp}
              // onFocus={handleOnFocus}
              //   onBlur={handleOnBlur}
              modules={modules}
              theme="snow"
              placeholder="내용을 입력해주세요."
            />
          </div>
        </PEForm>
      </PEItemWrapper>
    </>
  );
};

const StoryEditor = styled(ReactQuill)`
  margin-top: 1em;
  .ql-editor {
    min-height: 20rem;
  }
`;

const GuideButton = styled.a`
  display: inline-flex;
  flex-wrap: wrap;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 36px;
  opacity: 1;
  padding: 0px 17px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 45px;
  text-decoration: none;
  cursor: pointer;
  & > div {
    display: inline-flex;
    align-self: center;
    img {
      width: 1em;
      height: 1em;
    }
  }
  p {
    font-weight: 500;
    color: rgb(61, 61, 61);
    margin: 0px 0px 0px 5px;
    word-break: break-all;
    white-space: normal;
    font-size: 12px !important;
    line-height: 20px !important;
  }
`;
export default PEStory;
