import React from 'react';
import styled from 'styled-components';
import { onClickResetBasket, removeBasketItem } from './basketFn';
import { faMinusCircle, faRedo, faShare, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeIn } from '../../animation/fade';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';


const SQuizQuestionBasket = styled.div`
  grid-column: 2 / 3;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
  /* border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 10px; */
`

const QuizBasket = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const QuestionBasket = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const BasketName = styled.div`
  justify-self: flex-end;
  margin-bottom: 10px;
  svg {
    margin-left: 5px;
  }
`

const Wrapper = styled.div`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 20px 10px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const BasketList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const BasketItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  animation: ${fadeIn} 0.4s linear;
  font-size: 14px;
`

const ItemRemoveBtn = styled.div`
  cursor: pointer;
`

const BasketBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  svg {
    cursor: pointer;
  }
`

const FOLLOW_QUIZ_MUTATION = gql`
  mutation followQuiz($quizIds: String!) {
    followQuiz(quizIds: $quizIds) {
      ok
    }
  }
`

const FOLLOW_QUESTION_MUTATION = gql`
  mutation followQuestion($questionIds: String!) {
    followQuestion(questionIds: $questionIds) {
      ok
    }
  }
`


const QuizQuestionBasket = ({ setPutQuiz }) => {
  const history = useHistory()
  const [followQuiz, { loading: quizLoading }] = useMutation(FOLLOW_QUIZ_MUTATION, {
    onCompleted: (result) => {
      if (result.followQuiz.ok) {
        if (window.confirm("퀴즈가 라이브러리에 저장이 되었습니다.\n라이브러리로 이동하시겠습니까?")) {
          history.push("/library/quiz/1")
          window.location.reload()
        }
        localStorage.removeItem("quizBasket")
        setPutQuiz(prev => !prev)
      } else {
        window.alert("이벤트가 정상적으로 작동되지 않았습니다.\n다시 로그인하여 시도해주세요.\n계속 될 경우 관리자에게 문의해주세요.")
      }
    }
  })
  const [followQuestion, { loading: questionLoading }] = useMutation(FOLLOW_QUESTION_MUTATION, {
    onCompleted: (result) => {
      if (result.followQuestion.ok) {
        if (window.confirm("문제가 라이브러리에 저장이 되었습니다.\n라이브러리로 이동하시겠습니까?")) {
          history.push("/library/question/1")
          window.location.reload()
        }
        localStorage.removeItem("questionBasket")
        setPutQuiz(prev => !prev)
      } else {
        window.alert("이벤트가 정상적으로 작동되지 않았습니다.\n다시 로그인하여 시도해주세요.\n계속 될 경우 관리자에게 문의해주세요.")
      }
    }
  })

  const onClickFollowBtn = (type) => {
    if (type === "quiz") {
      if (quizLoading) {
        return
      }
      const quizArr = JSON.parse(localStorage.getItem("quizBasket"))
      if (!quizArr || quizArr.length === 0) {
        return
      } else {
        const quizIds = quizArr.map((item) => item.id).join(",")
        followQuiz({
          variables: { quizIds }
        })
      }
    }
    if (type === "question") {
      if (questionLoading) {
        return
      }
      const questionArr = JSON.parse(localStorage.getItem("questionBasket"))
      if (!questionArr || questionArr.length === 0) {
        return
      } else {
        const questionIds = questionArr.map((item) => item.id).join(",")
        followQuestion({
          variables: { questionIds }
        })
      }
    }
  }

  const processBasket = (type) => {
    if (type === "quiz") {
      const quizBasket = JSON.parse(localStorage.getItem("quizBasket"))
      if (!quizBasket) {
        return false
      } else if (quizBasket.length === 0) {
        return false
      } else {
        return true
      }
    }
    if (type === "question") {
      const questionBasket = JSON.parse(localStorage.getItem("questionBasket"))
      if (!questionBasket) {
        return false
      } else if (questionBasket.length === 0) {
        return false
      } else {
        return true
      }
    }
  }
  return (<SQuizQuestionBasket>
    <QuizBasket>
      <BasketName>퀴즈 장바구니<FontAwesomeIcon icon={faShoppingCart} /></BasketName>
      <Wrapper>
        {processBasket("quiz") && <BasketList>
          {JSON.parse(localStorage.getItem("quizBasket")).map((item, index) => {
            return <BasketItem key={index}>
              <div>{item.title.length > 10 ? `${item.title.substring(0, 9)}...` : item.title}</div>
              <ItemRemoveBtn
                onClick={() => {
                  removeBasketItem("quiz", item.id)
                  setPutQuiz(prev => !prev)
                }}
              ><FontAwesomeIcon icon={faMinusCircle} /></ItemRemoveBtn>
            </BasketItem>
          })}
        </BasketList>}
        <BasketBtn>
          <FontAwesomeIcon icon={faShare} onClick={() => onClickFollowBtn("quiz")} />
          <FontAwesomeIcon icon={faRedo} onClick={() => {
            onClickResetBasket("quiz")
            setPutQuiz(prev => !prev)
          }} />
        </BasketBtn>
      </Wrapper>
    </QuizBasket>
    <QuestionBasket>
      <BasketName>문제 장바구니<FontAwesomeIcon icon={faShoppingCart} /></BasketName>
      <Wrapper>
        {processBasket("question") && <BasketList>
          {JSON.parse(localStorage.getItem("questionBasket")).map((item, index) => {
            return <BasketItem key={index}>
              <div>{item.question.length > 10 ? `${item.question.substring(0, 9)}...` : item.question}</div>
              <ItemRemoveBtn
                onClick={() => {
                  removeBasketItem("question", item.id)
                  setPutQuiz(prev => !prev)
                }}
              ><FontAwesomeIcon icon={faMinusCircle} /></ItemRemoveBtn>
            </BasketItem>
          })}
        </BasketList>}
        <BasketBtn>
          <FontAwesomeIcon icon={faShare} onClick={() => onClickFollowBtn("question")} />
          <FontAwesomeIcon icon={faRedo} onClick={() => {
            onClickResetBasket("question")
            setPutQuiz(prev => !prev)
          }} />
        </BasketBtn>
      </Wrapper>
    </QuestionBasket>
  </SQuizQuestionBasket>);
}

export default QuizQuestionBasket;