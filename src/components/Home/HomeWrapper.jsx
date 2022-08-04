import styled, { css } from 'styled-components';
import React, { useState, useRef } from 'react';
import { category, sorts } from '../../data';
import ListContainer from './ListContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { projectsActions } from '../../redux/projects-slice';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const HomeWrapper = ({ onGetCategory, onSearch, onSort }) => {
  const projects = useSelector((state) => state.projects.projects);

  const [selected, setSelected] = useState('전체');
  const [sort, setSort] = useState('인기순');
  const [showSort, setShowSort] = useState(false);

  const inputRef = useRef();

  const handleGetCategory = (categoryname, value) => {
    // category 설정
    onGetCategory(value);
    setSelected(categoryname);
  };

  const handleSort = (sortname, value) => {
    onSort(value);
    setSort(sortname);
    setShowSort(false);
  };

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(inputRef.current.value);
    inputRef.current.value = '';
  };

  const handleshowSort = () => {
    setShowSort(!showSort);
  };

  return (
    <>
      <CategoryWrapper>
        <div>
          {category.map((it) => (
            <Category
              key={it.categoryName}
              active={it.categoryName === selected}
              onClick={() => {
                handleGetCategory(it.categoryName, it.value);
              }}
            >
              <CategoryIcon>
                <img src={it.url} alt="All" />
              </CategoryIcon>
              <CategoryText>{it.categoryName}</CategoryText>
            </Category>
          ))}
        </div>
        <SearchInputWrapper>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="searchInput"
            onKeyPress={handleInput}
            ref={inputRef}
          />
          <button onClick={handleSearch}>
            <SearchIcon />
          </button>
        </SearchInputWrapper>
      </CategoryWrapper>
      <CategoryNavigation>{selected}</CategoryNavigation>
      <ProjectsCounter>
        <div>
          <ProjectsCount>{projects.length}</ProjectsCount>개의 프로젝트가
          있습니다.
        </div>
        <ProjectsFilter>
          <ComboBox>
            <button onClick={handleshowSort}>
              <span>{sort}</span>
              {showSort ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>
            {showSort && (
              <ComboBoxSelect>
                {sorts.map((it) => {
                  return (
                    <SelectItem
                      active={it.sortName === sort}
                      onClick={() => handleSort(it.sortName, it.value)}
                      key={it.value}
                    >
                      {it.sortName}
                    </SelectItem>
                  );
                })}
              </ComboBoxSelect>
            )}
          </ComboBox>
        </ProjectsFilter>
      </ProjectsCounter>
      <ListContainer />
    </>
  );
};

export default HomeWrapper;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  /* align-items: center; */

  padding: 0 10px;

  /* padding: 0 1rem; */

  > div {
    display: flex;
  }

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Category = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 20px 2rem;
  /* margin: 0 10px; */
  background-color: ${(props) => props.color};
  ${({ active }) =>
    active &&
    css`
      background-color: rgba(240, 240, 240, 0.5);
    `}

  :hover {
    font-weight: 600;
  }
  /* .clicked {
    background-color: rgba(240, 240, 240, 0.5);
  } */

  @media (max-width: 750px) {
    padding: 1rem;
  }

  @media (max-width: 550px) {
    padding: 0.5rem;
  }
  @media (max-width: 450px) {
    padding: 0.1rem;
  }
`;

const CategoryIcon = styled.div``;

const CategoryText = styled.div``;

const SearchInputWrapper = styled.div`
  position: relative;

  padding: 0.5rem 1rem;

  height: 36px;
  background: rgb(243, 243, 243);
  -webkit-box-align: center;
  align-items: center;
  border-radius: 8px;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.3);
  @media (max-width: 960px) {
    margin-top: 1rem;
    width: 200px;
  }

  input.searchInput {
    font-family: 'Noto Sans KR', sans-serif;
    width: 150px;
    border: none;
    font-size: 12px;
    line-height: 28px;
    letter-spacing: 0.02em;
    background: rgb(243, 243, 243);
    color: rgb(51, 51, 51);
    appearance: none;
    outline: none;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }
`;

const CategoryNavigation = styled.div`
  padding: 0 10px;
  margin: 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ProjectsCounter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 1rem;
  width: 100%;
  margin: 2.5rem 0;
  box-sizing: border-box;
`;

const ProjectsCount = styled.span`
  color: ${(props) => props.theme.mainColor};
`;

const ProjectsFilter = styled.div``;

const ComboBox = styled.div`
  position: relative;
  button {
    display: flex;
    align-items: center;
    outline: none;
    /* display: inline-block; */
    background: transparent;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    z-index: auto;
    box-sizing: border-box;
    min-width: auto;
    color: rgb(61, 61, 61);
    line-height: 24px;
    height: inherit;
    border: none;
    border-radius: 0px;
    padding: 0px;
    cursor: pointer;
  }
  span {
    position: relative;
    display: block;
    white-space: nowrap;
  }
  svg {
    font-size: 2rem;
  }
`;

const ComboBoxSelect = styled.div`
  position: absolute;
  z-index: 99;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
  border-radius: 4px;
  padding: 4px 0px;
  color: rgb(61, 61, 61);
  bottom: auto;
  left: auto;
  right: 0px;
  transform: none;
  font-weight: bold;
  box-sizing: border-box;
`;

const SelectItem = styled.div`
  font-weight: bold;
  color: gray;
  white-space: nowrap;
  cursor: pointer;
  padding: 0px 16px 0px 12px;
  min-width: 130px;
  height: 40px;
  line-height: 40px;
  font-size: 1.23rem;
  box-sizing: border-box;

  ${({ active }) =>
    active &&
    css`
      color: rgb(250, 101, 99);
    `}

  @media (min-width: 768px) {
    font-size: 1rem;
    height: 34px;
    line-height: 34px;
  }
`;
