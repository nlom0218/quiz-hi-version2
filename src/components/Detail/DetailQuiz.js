import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { checkAllQuestionsBasketBtn, onClickAllQuestionsBasketBtn } from '../QuizFeed/basketFn';
import QuestionItem from '../QuizFeed/QuestionItem';

const QuizCaption = styled.textarea`
  margin-top: ${props => props.tags ? "10px" : "20px"};
  grid-column: 1 / -1;
  grid-row: 5 / 6;
  line-height: 25px;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  font-size: 16px;
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }
`

const QuestionListTitle = styled.div`
  margin-top: 40px;
  grid-column: 1 / 2;
  grid-row: 6 / 7;
  font-weight: 600;
`

const Basket = styled.div`
  grid-column: 2 / 3;
  grid-row: 6 / 7;
  align-self: flex-end;
  justify-self: flex-end;
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`

const QuestionList = styled.div`
  display: grid;
  grid-column: 1 / -1;
  grid-row: 7 / 8;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`


const DetailQuiz = ({ caption, questions, setPutQuiz, tags, order }) => {
  const orderArr = JSON.parse(order)
  const textarea = useRef()
  const [txtHeight, setTxtHeight] = useState(null)
  const questionIdTitle = questions.map((item) => {
    return { question: item.question, id: item.id }
  })
  useEffect(() => {
    setTxtHeight(textarea.current.scrollHeight)
  }, [])
  const question = (id) => {
    return questions.filter((item) => item.id === id)[0]
  }
  return (<React.Fragment>
    {caption && <QuizCaption
      tags={tags.length !== 0 ? true : false}
      value={caption}
      cols={20}
      rows={1}
      txtHeight={txtHeight}
      readOnly="readOnly"
      ref={textarea}
    ></QuizCaption>}
    {questions.length === 0 ? <QuestionListTitle>등록된 문제가 없습니다.</QuestionListTitle>
      :
      <React.Fragment>
        <QuestionListTitle>문제 목록</QuestionListTitle>
        <Basket>
          장바구니에 모두 담기
            <FontAwesomeIcon
            icon={faSquare}
            icon={checkAllQuestionsBasketBtn(questionIdTitle) ? faCheckSquare : faSquare}
            onClick={() => {
              onClickAllQuestionsBasketBtn(questionIdTitle)
              setPutQuiz(prev => !prev)
            }}
          />
        </Basket>
        <QuestionList>
          {order ? orderArr.map((item, index) => {
            if (question(item)) {
              return <QuestionItem key={index} {...question(item)} setPutQuiz={setPutQuiz} edit={true} />
            }
          })
            :
            questions.map((item, index) => {
              return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} edit={true} />
            })
          }
        </QuestionList>
      </React.Fragment>
    }
  </React.Fragment>);
}

export default DetailQuiz;