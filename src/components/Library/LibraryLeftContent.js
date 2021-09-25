import { useMutation } from '@apollo/client';
import { faHandPointer, faMinusCircle, faPencilAlt, faRedo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import { removeLibraryBasketItem, onClickResetLibraryBasket } from './libraryBasketFn';

const Container = styled.div`
  grid-column: 2 / 3;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  svg {
    margin-left: 5px;
  }
`

const RemoveAllBtn = styled.div`
  text-align: center;
  grid-column: 1 / -1;
  cursor: pointer;
  background-color: tomato;
  color: #f4f4f4;
  padding: 10px 20px;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s ease;
`

const Title = styled.div`
  justify-self: flex-end;
`

const Box = styled.div`
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
  row-gap: 20px;
  svg {
    cursor: pointer;
  }
`

const MakeNewQuiz = styled.div`
  justify-self: stretch;
  text-align: center;
  grid-column: 1 / -1;
  cursor: pointer;
  background-color: rgb(255, 165, 0, 0.8);
  padding: 10px 20px;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s ease;
`

const UNFOLLOW_QUIZ_MUTATION = gql`
  mutation unfollowQuiz($quizIds: String!) {
    unfollowQuiz(quizIds: $quizIds) {
      ok
    }
  }
`

const UNFOLLOW_QUESTION_MUTATION = gql`
  mutation unfollowQuestion($questionIds: String!) {
    unfollowQuestion(questionIds: $questionIds) {
      ok
    }
  }
`

const UNFOLLOW_ALL_QUIZ_QUESTION_MUTATION = gql`
  mutation unfollowAllQuizQuestion($id: Int!) {
    unfollowAllQuizQuestion(id: $id) {
      ok
    }
  }
`

const LibraryLeftContent = ({ setPutQuiz }) => {
  const user = useUser()
  const history = useHistory()
  const [unfollowQuiz, { loading: quizLoading }] = useMutation(UNFOLLOW_QUIZ_MUTATION, {
    onCompleted: (result) => {
      if (result.unfollowQuiz.ok) {
        history.push("/library/quiz/1")
        window.location.reload()
        localStorage.removeItem("libraryQuizBasket")
        setPutQuiz(prev => !prev)
      } else {
        window.alert("이벤트가 정상적으로 작동되지 않았습니다.\n다시 로그인하여 시도해주세요.\n계속 될 경우 관리자에게 문의해주세요.")
      }
    }
  })
  const [unfollowQuestion, { loading: questionLoading }] = useMutation(UNFOLLOW_QUESTION_MUTATION, {
    onCompleted: (result) => {
      if (result.unfollowQuestion.ok) {
        history.push("/library/question/1")
        window.location.reload()
        localStorage.removeItem("libraryQuestionBasket")
        setPutQuiz(prev => !prev)
      } else {
        window.alert("이벤트가 정상적으로 작동되지 않았습니다.\n다시 로그인하여 시도해주세요.\n계속 될 경우 관리자에게 문의해주세요.")
      }
    }
  })
  const [unfollowAllQuizQuestion, { loading: allLoading }] = useMutation(UNFOLLOW_ALL_QUIZ_QUESTION_MUTATION, {
    onCompleted: (result) => {
      if (result.unfollowAllQuizQuestion.ok) {
        history.push("/library/quiz/1")
        window.location.reload()
        localStorage.removeItem("libraryQuizBasket")
        localStorage.removeItem("libraryQuestionBasket")
        setPutQuiz(prev => !prev)
      } else {
        window.alert("이벤트가 정상적으로 작동되지 않았습니다.\n다시 로그인하여 시도해주세요.\n계속 될 경우 관리자에게 문의해주세요.")
      }
    }
  })
  const processLibraryBasket = (type) => {
    if (type === "quiz") {
      const libraryQuizBasket = JSON.parse(localStorage.getItem("libraryQuizBasket"))
      if (!libraryQuizBasket) {
        return false
      } else if (libraryQuizBasket.length === 0) {
        return false
      } else {
        return true
      }
    }
    if (type === "question") {
      const libraryQuestionBasket = JSON.parse(localStorage.getItem("libraryQuestionBasket"))
      if (!libraryQuestionBasket) {
        return false
      } else if (libraryQuestionBasket.length === 0) {
        return false
      } else {
        return true
      }
    }
  }
  const onClickUnfollowBtn = (type) => {
    if (type === "quiz") {
      if (quizLoading) {
        return
      }
      const quizArr = JSON.parse(localStorage.getItem("libraryQuizBasket"))
      if (!quizArr || quizArr.length === 0) {
        return
      } else {
        const quizIds = quizArr.map((item) => item.id).join(",")
        if (window.confirm("선택된 퀴즈를 라이브러리에서 삭제하시겠습니까?")) {
          unfollowQuiz({
            variables: { quizIds }
          })
        } else {
          return
        }
      }
    }
    if (type === "question") {
      if (questionLoading) {
        return
      }
      const questionArr = JSON.parse(localStorage.getItem("libraryQuestionBasket"))
      if (!questionArr || questionArr.length === 0) {
        return
      } else {
        const questionIds = questionArr.map((item) => item.id).join(",")
        if (window.confirm("선택된 문제를 라이브러리에서 삭제하시겠습니까?")) {
          unfollowQuestion({
            variables: { questionIds }
          })
        } else {
          return
        }
      }
    }
  }
  const onClickRemoveAll = () => {
    if (allLoading) {
      return
    }
    if (window.confirm("라이브러리에 저장된 모든 퀴즈와 문제를 삭제하시겠습니끼?")) {
      unfollowAllQuizQuestion({
        variables: {
          id: user.id
        }
      })
    }
  }
  const onClickMakeNewQuiz = () => {
    history.push("/library/make-quiz")
  }
  return (<Container>
    <Wrapper>
      <Title>선택된 퀴즈<FontAwesomeIcon icon={faHandPointer} /></Title>
      <Box>
        {processLibraryBasket("quiz") && <BasketList>
          {JSON.parse(localStorage.getItem("libraryQuizBasket")).map((item, index) => {
            return <BasketItem key={index}>
              <div>{item.title.length > 10 ? `${item.title.substring(0, 9)}...` : item.title}</div>
              <ItemRemoveBtn
                onClick={() => {
                  removeLibraryBasketItem("quiz", item.id)
                  setPutQuiz(prev => !prev)
                }}
              ><FontAwesomeIcon icon={faMinusCircle} /></ItemRemoveBtn>
            </BasketItem>
          })}
        </BasketList>}
        <BasketBtn>
          <FontAwesomeIcon icon={faTrashAlt}
            onClick={() => onClickUnfollowBtn("quiz")}
          />
          <FontAwesomeIcon icon={faRedo} onClick={() => {
            onClickResetLibraryBasket("quiz")
            setPutQuiz(prev => !prev)
          }} />
        </BasketBtn>
      </Box>
    </Wrapper>
    <Wrapper>
      <Title>선택된 문제<FontAwesomeIcon icon={faHandPointer} /></Title>
      <Box>
        {processLibraryBasket("question") && <BasketList>
          {JSON.parse(localStorage.getItem("libraryQuestionBasket")).map((item, index) => {
            return <BasketItem key={index}>
              <div>{item.title.length > 10 ? `${item.title.substring(0, 9)}...` : item.title}</div>
              <ItemRemoveBtn
                onClick={() => {
                  removeLibraryBasketItem("question", item.id)
                  setPutQuiz(prev => !prev)
                }}
              ><FontAwesomeIcon icon={faMinusCircle} /></ItemRemoveBtn>
            </BasketItem>
          })}
        </BasketList>}
        <BasketBtn>
          <FontAwesomeIcon icon={faTrashAlt}
            onClick={() => onClickUnfollowBtn("question")}
          />
          <FontAwesomeIcon icon={faRedo} onClick={() => {
            onClickResetLibraryBasket("question")
            setPutQuiz(prev => !prev)
          }} />
          {processLibraryBasket("question") && <MakeNewQuiz onClick={onClickMakeNewQuiz}>퀴즈 만들기</MakeNewQuiz>}
        </BasketBtn>
      </Box>
    </Wrapper>
    <RemoveAllBtn onClick={onClickRemoveAll}>전체 삭제 <FontAwesomeIcon icon={faTrashAlt} /></RemoveAllBtn>
  </Container>);
}

export default LibraryLeftContent;