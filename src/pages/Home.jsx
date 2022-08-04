import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInview } from 'react-intersection-observer';
import styled from 'styled-components';
import HomeWrapper from '../components/Home/HomeWrapper';
import { layoutActions } from '../redux/layout-slice';
import { projectsApi } from '../shared/api';
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query';
import { projectsActions } from '../redux/projects-slice';

// TODO: 무한 스크롤 react query로 구현
const getProjectsLists = async (pageParam) => {
  // const res = await projectsApi.projectsAll(value, sort, query);
  // const { projects, isLast } = res.data;
  // return { projects, nextPage: pageParam + 1, isLast };
};

const Home = () => {
  // TODO: 무한 스크롤
  // const { ref, inView } = useInview();
  // const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  //   "projects",
  //   ({ pageParam = 1 }) => getProjectsLists(pageParam),
  //   {
  //     getNextPageParam: (lastPage) =>
  //       !lastPage.isLast ? lastPage.nextPage : undefined,
  //   }
  // );
  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  // if(status==='loading') return <Loading/>
  // if(status==='error') return <ErrorPage/>

  const dispatch = useDispatch();

  // const isHeaderFixed = useSelector((state) => state.layout.headerFixed); // 홈에서만 헤더 고정

  const queryClient = useQueryClient();

  // const [categoryName, setCategoryName] = useState('전체');
  const [value, setValue] = useState('all');
  const [sort, setSort] = useState('popular');
  const [query, setQuery] = useState('');

  const onGetCategory = (value) => {
    setValue(value);
    setQuery('');
  };

  const onSort = (value) => {
    setSort(value);
  };

  const onSearch = (query) => {
    setQuery(query);
  };

  const getProjects = async () => {
    const { data } = await projectsApi.projectsAll(value, sort, query);

    return data;
  };

  const { data, refetch } = useQuery(
    ['projects_category'],
    () => getProjects(),
    { suspense: true }
  );

  useEffect(() => {
    if (data) {
      dispatch(projectsActions.setPosts(data));
    }
  }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries('projects_category');
    refetch();
  }, [value, query, sort]);

  useEffect(() => {
    dispatch(layoutActions.headerFix()); // header 고정
  }, []);

  return (
    <HomeContainer>
      <HomeWrapper
        onGetCategory={onGetCategory}
        onSearch={onSearch}
        onSort={onSort}
      />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  margin-top: 0;
  margin-bottom: 3rem;
`;

export default Home;
