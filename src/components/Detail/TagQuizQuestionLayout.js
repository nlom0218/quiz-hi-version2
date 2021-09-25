import React from 'react';
import styled from 'styled-components';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBook, faBookOpen, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBar from '../QuizFeed/PageBar';
import QuizQuestionBasket from '../QuizFeed/QuizQuestionBasket';
import { useHistory, useParams } from 'react-router';

const STagQuizQuestionLayout = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 30px;
  row-gap: 30px;
`

const SelectedType = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
`

const Type = styled.div`
  align-self: flex-end;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.6};
  transition: opacity 0.3s linear;
  svg {
    margin-right: 10px;
  }
`


const TagQuizQuestionLayout = ({ children, setPutQuiz, page, lastPage, contents }) => {
  const { sort, id, type } = useParams()
  const history = useHistory()
  const onClickType = (sort) => {
    history.push(`/detail/tag/${id}/${type}/${sort}/1`)
  }
  return (
    <STagQuizQuestionLayout>
      <SelectedType>
        <Type onClick={() => onClickType("recent")} selected={sort === "recent"}>
          <FontAwesomeIcon icon={faClock} />최근 {contents === "quiz" ? "퀴즈" : "문제"} 보기
        </Type>
        <Type onClick={() => onClickType("likes")} selected={sort === "likes"}>
          <FontAwesomeIcon icon={faFireAlt} />인기 {contents === "quiz" ? "퀴즈" : "문제"} 보기
        </Type>
        <PageBar lastPage={lastPage} />
      </SelectedType>
      {children}
      <QuizQuestionBasket setPutQuiz={setPutQuiz} />
    </STagQuizQuestionLayout>
  );
}

export default TagQuizQuestionLayout;