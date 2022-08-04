import { useCallback } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListContainer = () => {
  const navigate = useNavigate();

  const projects = useSelector((state) => state.projects.projects);

  // console.log(projects, 'List안에 있는 projects');

  const goToDetail = (it) => {
    navigate('/project/' + it.projectId);
  };

  // 남은 날짜 계산 함수
  const difference = useCallback((date1, date2) => {
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    const day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
  }, []);

  return (
    <ListWrapper>
      {projects.map((it) => {
        let time = new Date().toISOString();
        const date1 = new Date(time.slice(0, 10)), // 현재 날짜
          date2 = new Date(it.endDate),
          time_difference = difference(date1, date2);

        return (
          <ProjectCardWrapper key={it.projectId}>
            <div>
              <ProjectCardImage
                onClick={() => {
                  goToDetail(it, time_difference);
                }}
              >
                <img src={it.thumbnails[0]} alt="thumbnails" />
              </ProjectCardImage>
              <ProjectCardInfo>
                <div>
                  <ProjectSub>
                    <span>{it.category.toUpperCase()}</span>
                    <Seperator>{' | '}</Seperator>
                    <span>{it.creatorName}</span>
                  </ProjectSub>
                  <ProjectTitle
                    onClick={() => {
                      goToDetail(it, time_difference);
                    }}
                  >
                    {it.title}
                  </ProjectTitle>
                  <ProjectDec>
                    {it.summary}
                    <Br>
                      {it.summary.length < 30 &&
                        'dsfsdfasdasdasdasdasdasdasdasd'}
                    </Br>
                  </ProjectDec>
                </div>
              </ProjectCardInfo>
              <ProjectStatus>
                <div>
                  <FundingPercent>
                    {(it.totalFundingPrice / it.goal) * 100}%
                  </FundingPercent>
                  <FundingAmount>{it.totalFundingPrice + '원'}</FundingAmount>
                </div>
                <RestDay>{time_difference + '일 남음'}</RestDay>
              </ProjectStatus>
              <ProjectProgressBar>
                <Progress
                  width={(it.totalFundingPrice / it.goal) * 100 + '%'}
                />
              </ProjectProgressBar>
            </div>
          </ProjectCardWrapper>
        );
      })}
    </ListWrapper>
  );
};

export default ListContainer;

const ListWrapper = styled.div`
  -webkit-box-pack: start;

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  padding: 0px;

  @media (max-width: 650px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;

const ProjectCardWrapper = styled.div`
  /* display: flex; */

  box-sizing: border-box;
  margin-bottom: 2rem;

  width: 25%;

  > div {
    padding: 0 1rem;
    @media (max-width: 650px) {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }
    @media (max-width: 550px) {
    }
  }

  @media (max-width: 1300px) {
    width: 25%;
  }
  @media (max-width: 1080px) {
    width: 50%;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const ProjectCardImage = styled.div`
  width: 100%;
  height: 200px;

  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #eee;

  & :hover {
    transform: scale(1.1);
    transition: 300ms ease-in;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProjectCardInfo = styled.div`
  > div {
    margin-bottom: 1rem;
  }
  div {
    margin: 0.5rem 0;
  }
`;

const ProjectSub = styled.div`
  span {
    font-size: 13px;
    color: rgb(61, 61, 61);
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

const Seperator = styled.span`
  text-decoration: none;
`;

const ProjectTitle = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 500;

  -webkit-line-clamp: 1;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ProjectDec = styled.div`
  color: ${(props) => props.theme.fontGray};
  font-size: 14px;

  width: 93%;
  // 일정 글자 수 넘어가면 ...
  -webkit-line-clamp: 2;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Br = styled.p`
  margin: 0;
  visibility: hidden;
`;

const ProjectStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #eee;

  border-radius: 4px;
`;

const Progress = styled.div`
  background-color: rgb(255, 87, 87);
  width: ${(props) => props.width};
  height: 100%;
`;

const FundingPercent = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${(props) => props.theme.mainColor};
`;

const FundingAmount = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8rem;
  line-height: 20px;
  letter-spacing: -0.015em;
  color: rgb(61, 61, 61);
`;

const RestDay = styled.span`
  margin-left: auto;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: -0.01em;
  color: rgb(109, 109, 109);
  font-weight: 700;
`;
