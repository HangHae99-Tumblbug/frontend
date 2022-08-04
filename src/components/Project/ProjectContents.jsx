import React, { useRef, forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { projectsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ProjectContents = forwardRef(({ project }, ref) => {
  const [showBtn, setShowBtn] = useState(false);
  const [selected, setSelected] = useState(null);

  let navigate = useNavigate();

  // DomPurify
  const sanitizer = DOMPurify.sanitize;

  const onBtnShow = (rewardId) => {
    setShowBtn(true);
    setSelected(rewardId);
  };

  const addFundingPrice = async (reward) => {
    return await projectsApi.rewardPost(reward);
  };

  // 쿼리 무효화 -> 서버 데이터 리패칭 하기 위해 생성
  const queryClient = useQueryClient();

  const { mutate: onFunding } = useMutation(addFundingPrice, {
    onSuccess: () => {
      // queryClient.invalidateQueries 메서드를 쓰면
      // 인수로 전달하는 key값에 대해 쿼리를 무효화해줌 => 리패칭
      // 인수를 전달하지 않으면 모든 쿼리가 무효화됨
      queryClient.invalidateQueries('project');
    },
    onError: () => {
      alert('로그인 권한이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/signIn');
    }
  });

  return (
    <Container>
      <MainColumn>
        <div>| 프로젝트 소개</div>
        <div
          className="view ql-editor"
          style={{ padding: 0 }}
          dangerouslySetInnerHTML={{
            __html: sanitizer(`${project.plan}`)
          }}
        ></div>
      </MainColumn>
      <SubColumn>
        <SubColumnInner>
          <CreatorCard>
            <div>
              <div className="creator-intro">창작자 소개</div>
              <div className="creator-wrapper">
                <div className="creator-profileImage">
                  <img src="/images/test.jpg" alt="" />
                </div>
                <div className="creator-name">{project.creatorName}</div>
              </div>
              <div className="creator-biography">
                {project.creatorBiography}
              </div>
            </div>
          </CreatorCard>
          <StickerWrapper>
            <Rewards>
              <div ref={ref}>선물 선택</div>
              {project.rewards?.map((it) => {
                return (
                  <RewardCard
                    key={it.rewardId}
                    active={selected === it.rewardId}
                    onClick={() => {
                      onBtnShow(it.rewardId);
                    }}
                  >
                    <div>{it.fundingPrice} +</div>
                    <div>{it.rewardItem}</div>
                    {showBtn && selected === it.rewardId && (
                      <button
                        className="funding-btn"
                        onClick={() => {
                          const data = {
                            rewardId: it.rewardId
                          };
                          onFunding(data);
                        }}
                      >
                        {it.fundingPrice}원 후원하기
                      </button>
                    )}
                  </RewardCard>
                );
              })}
            </Rewards>
          </StickerWrapper>
          <StickerGhost></StickerGhost>
        </SubColumnInner>
      </SubColumn>
    </Container>
  );
});

export default ProjectContents;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;

  /* width: 1040px; */
  padding: 3rem 0;
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  gap: 38px;
  margin: 0px auto;
`;

const MainColumn = styled.div`
  border: 1px solid #ececec;
  padding: 2rem;

  /* order: 1; */
  width: 60%;
  padding-bottom: 3rem;
  @media (min-width: 1080px) {
    flex: 1 1 650px;
  }
  & div:first-child {
    display: flex;
    color: rgb(13, 13, 13);
    font-weight: 700;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 3rem;
    font-size: 18px !important;
    line-height: 28px !important;
  }
`;

const SubColumn = styled.div`
  /* order: 2; */
  width: 40%;
  margin: 0px;

  @media (min-width: 1080px) {
    display: block;
    /* flex: 0 1 352px;
    max-width: 352px; */
    /* padding-top: 25px; */
  }
`;

const SubColumnInner = styled.div`
  width: 100%;

  @media (min-width: 1080px) {
    min-height: 500px;
  }
`;

const CreatorCard = styled.div`
  /* width: 100%; */
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  transition: box-shadow 0.2s ease-in-out 0s;
  -webkit-tap-highlight-color: transparent;
  padding: 2rem 1rem;

  @media (min-width: 1080px) {
    border: 1px solid rgb(239, 239, 239);
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 0px, rgb(0 0 0 / 4%) 0px 2px 4px;
  }

  @media (min-width: 1080px) {
    display: block;
  }

  div.creator-intro {
    display: block;
    padding: 5px 0px 20px;
  }
  div.creator-wrapper {
    display: flex;
    -webkit-box-align: start;
    align-items: center;

    .creator-name {
      color: rgb(61, 61, 61);
      font-weight: bolder;
    }
  }

  div.creator-profileImage {
    border-radius: 50%;
    margin-right: 0.8rem;
    & img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  div.creator-biography {
    font-weight: 400;
    color: rgb(109, 109, 109);
    padding-top: 18px;
    font-size: 13px !important;

    line-height: 22px !important;
  }
`;

const StickerWrapper = styled.div`
  padding-top: 2rem;
  transition: height 0.1s ease 0s;
`;

const Rewards = styled.div`
  width: 100%;
  height: auto;
  padding: 24px 0px 0px;
`;

const RewardCard = styled.div`
  cursor: pointer;
  margin: 1.5rem 0;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 0px, rgb(0 0 0 / 4%) 0px 2px 4px;
  padding: 20px;
  /* width: 100%; */
  background-color: rgb(255, 255, 255);

  transition: height 0.2s ease 0s, box-shadow 0.2s ease 0s,
    border 0.2s ease-in-out 0s;
  -webkit-tap-highlight-color: transparent;
  border: 1px solid rgb(239, 239, 239);

  :hover {
    border: groove 1px gray;
  }
  ${({ active }) =>
    active &&
    css`
      border: groove 1px gray;
    `}

  div:first-child {
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.025em;
    margin: 0px 0px 6px;
    font-weight: 600;
    color: #3d3d3d;
  }
  div:last-child {
    font-size: 0.9rem;
    color: #3d3d3d;
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
    padding: 1em 2em;
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

const StickerGhost = styled.div``;
