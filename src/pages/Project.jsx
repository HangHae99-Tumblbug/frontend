import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { layoutActions } from '../redux/layout-slice';
import { useLocation, useParams } from 'react-router-dom';
import { projectsApi } from '../shared/api';
import Introduction from '../components/Project/Introduction';
import ProjectContents from '../components/Project/ProjectContents';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { projectsActions } from '../redux/projects-slice';

const Project = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) => state.projects.project);

  // const isHeaderFixed = useSelector((state) => state.layout.headerFixed); // 홈에서만 헤더 고정

  const getProject = async () => {
    try {
      const res = await projectsApi.projectDetail(projectId);
      return res.data;
    } catch (error) {
      console.log(error.res);
    }
  };
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery(['project'], getProject, {
    suspense: true
  });

  // useEffect(() => {
  //   dispatch(layoutActions.notHeaderFix()); // Header no fix
  // }, []);

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries('project');
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(projectsActions.setPost(data));
    }
  }, [data]);

  const rewardRef = useRef(null);

  return (
    <ProjectContainer>
      <Introduction project={data} rewardRef={rewardRef} />
      <ProjectContents project={data} ref={rewardRef} />
    </ProjectContainer>
  );
};

export default Project;

const ProjectContainer = styled.div`
  width: 100%;
  padding: 2rem 10px;
`;
