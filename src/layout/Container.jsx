import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { layoutActions } from '../redux/layout-slice';

const Container = () => {
  const isHeaderFixed = useSelector((state) => state.layout.headerFixed); // 홈에서만 헤더 고정

  // console.log(isHeaderFixed, '헤더');
  // const dispatch = useDispatch();

  return (
    <ConainerWrapper>
      <Header />
      <Hr isHeaderFixed={isHeaderFixed} />
      <ContainerLayOut>
        <Outlet />
      </ContainerLayOut>
      <Footer />
    </ConainerWrapper>
  );
};

const ConainerWrapper = styled.div`
  width: 100%;
`;

const Hr = styled.div`
  margin-top: ${(props) => (props.isHeaderFixed ? '100px' : '0px')};
  height: 1px;
  background-color: #eceeec;
`;

const ContainerLayOut = styled.div`
  width: 75%;

  margin: 0 auto;
  /* padding-top: 100px; */

  @media (max-width: 1300px) {
    width: 90%;
  }

  @media (max-width: 1080px) {
    width: 95%;
  }

  @media (max-width: 750px) {
    /* padding-top: 120px; */
  }
`;

export default Container;
