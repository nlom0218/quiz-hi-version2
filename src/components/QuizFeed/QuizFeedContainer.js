import { faCheck, faChevronDown, faChevronUp, faSearch, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import QuizQuestionBasket from './QuizQuestionBasket';
import SeeType from './SeeType';
import PageBar from './PageBar';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { QuizFeedBottomContainerGsap } from '../../hooks/Gsap';
import { useHistory, useLocation } from 'react-router';
gsap.registerPlugin(ScrollTrigger)

const SQuizFeedContainer = styled.div`
  grid-column: 2 / -2;
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const TopBar = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 30px;
`

const SearchBar = styled.div`
  background-color: rgb(200, 200, 200, 0.2);
  border-radius: 5px;
  display: flex;
  align-items: center;
  svg {
    margin-left: 10px;
    opacity: 0.8;
  }
  input {
    padding: 8px 10px;
    width: 500px;
    ::placeholder {
      transition: color 1s ease, background-color 1s ease;
      color: ${props => props.theme.fontColor};
      opacity: 0.8;
    }
    
  }
`

const SortBar = styled.div`
  grid-column: -2 / -1;
  justify-self: flex-end;
  padding: 8px 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
  display: flex;
  position: relative;
  cursor: pointer;
`

const Sort = styled.div`
  margin-right: 10px;
`

const SortBtn = styled.div`
`

const SortList = styled.ul`
  position: absolute;
  top: 34px;
  right: 0px;
  background-color: ${props => props.theme.grayColor};
  display: grid;
  grid-template-columns: 140px;
  grid-template-rows: 1fr 1fr 1fr;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s linear;
  transition: background-color 1s ease;
  z-index: 1;
`

const SortItem = styled.li`
  margin: 5px 10px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  svg {
    margin-left: 10px;
    font-size: 12px;
  }
  display: flex;
  align-items: center;
`

const QuizFeedContainer = ({ children, feedType, sort, page, lastPage, tagsArr, seeType, setPutQuiz }) => {
  const location = useLocation()
  const [seeSortList, setSeeSortList] = useState(false)
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const onSubmit = (data) => {
    if (data.search === "") {
      history.push(`${location.pathname}`)
    } else {
      history.push(`${location.pathname}?search=${data.search}`)
    }
  }
  const processSort = (sort) => {
    if (sort === "recent") {
      return "최신순"
    } else if (sort === "likes") {
      return "좋아요순"
    } else if (sort === "hits") {
      return "조회순"
    }
  }
  const onMouseOver = () => {
    setSeeSortList(true)
  }
  const onMouseLeave = () => {
    setSeeSortList(false)
  }
  const onClickSortItem = (sort) => {
    history.push(`/feed/${feedType}/${seeType}/${sort}/1${location.search}`)
    setSeeSortList(prev => !prev)
  }
  const checkPageBar = () => {
    if (seeType === "all") {
      return true
    } else if (seeType === "tags" && tagsArr.length === 0) {
      return false
    } else {
      return true
    }
  }
  return (<SQuizFeedContainer className="feedContainer">
    <QuizFeedBottomContainerGsap />
    <SeeType seeType={seeType} />
    <TopBar>
      <SearchBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            {...register("search")}
            type="text"
            autoComplete="off"
            placeholder={`${feedType === "quiz" ? "퀴즈" : "문제"}를 검색하세요.`}
          />
        </form>
      </SearchBar>
      {checkPageBar() ? <PageBar lastPage={lastPage} /> : null}
      <SortBar onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        <Sort>{processSort(sort)}</Sort>
        <SortBtn>
          <FontAwesomeIcon icon={faChevronDown} />
        </SortBtn>
        {seeSortList && <SortList>
          <SortItem onClick={() => onClickSortItem("recent")}>최신순
            {sort === "recent" && <FontAwesomeIcon icon={faCheck} />}
          </SortItem>
          <SortItem onClick={() => onClickSortItem("likes")}>좋아요순
            {sort === "likes" && <FontAwesomeIcon icon={faCheck} />}
          </SortItem>
          <SortItem onClick={() => onClickSortItem("hits")}>조회순
            {sort === "hits" && <FontAwesomeIcon icon={faCheck} />}
          </SortItem>
        </SortList>}
      </SortBar>
    </TopBar>
    {children}
    <QuizQuestionBasket setPutQuiz={setPutQuiz} />
  </SQuizFeedContainer>);
}

export default QuizFeedContainer;