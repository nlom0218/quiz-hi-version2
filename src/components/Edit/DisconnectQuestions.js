import { useMutation } from '@apollo/client';
import { faHeart as faHeartRegular, faCheckSquare, faComment, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import styled from 'styled-components';
import EditInputLayout from './EditInputLayout';
import { InputTitle } from './sharedCss';

const SEditForm = styled.form`
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const ActionBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const DelBtn = styled.input`
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.4s linear;
`

const AllCkeckBtn = styled.div`
  margin-right: 21px;
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`

const QuestionsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`

const QUestionsItem = styled.li`
  padding: 20px;
  padding-bottom: ${props => props.tags && "15px"};
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 10px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  .questionWrapper {
    display: flex;
    flex-direction: column;
  }
  .question {
    font-weight: 600;
  }
  .questionInfo {
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
    div {
      margin-right: 10px;
    }
    svg {
      margin-right: 5px;
    }
  }
  .username {
    display: flex;
    align-items: flex-end;
  }
  .likes {
  }
`

const Likes = styled.div`
  svg {
    color: ${props => props.isLiked ? "tomato" : props.theme.fontColor};
  }
`

const AvatarImage = styled.img`
  margin-right: 5px;  
  width: 18px;
  height: 18px;
  border-radius: 50%;
`

const CheckBtn = styled.div`
  align-self: center;
  cursor: pointer;
`

const DISCONNECT_QUESTIONS_MUTATION = gql`
  mutation disconnectQuestions($questionsId: String!, $quizId: Int!) {
    disconnectQuestions(questionsId: $questionsId, quizId: $quizId) {
      ok
      error
    }
  }
`

const DisconnectQuestions = ({ questions }) => {
  const { id } = useParams()
  const [delQuestions, setDelQuestions] = useState([])
  const { handleSubmit } = useForm()
  const onCompleted = (result) => {
    const { disconnectQuestions: { ok } } = result
    if (ok) {
      // window.location.reload()
    }
  }
  const update = (cache, result) => {
    const { data: { disconnectQuestions: { ok } } } = result
    if (ok) {
      const QuizId = `Quiz:${parseInt(id)}`
      cache.modify({
        id: QuizId,
        fields: {
          questions(prev) {
            const DelCacheQuestion = delQuestions.map((item) => `Question:${item}`)
            const newQuestions = prev.filter((item) => {
              if (DelCacheQuestion.includes(item.__ref)) { return false }
              else { return true }
            })
            return newQuestions
          }
        }
      })
    }
  }
  const [disconnectQuestions, { loading }] = useMutation(DISCONNECT_QUESTIONS_MUTATION, {
    onCompleted,
    update
  })
  const processType = (type) => {
    if (type === "sub") {
      return "주관식"
    } else if (type === "obj") {
      return "객관식"
    } else if (type === "tf") {
      return "○ / ✕"
    }
  }
  const onClickCheckBtn = (id) => {
    if (id === "all") {
      const questionsIdArr = questions.map((item) => item.id)
      if (questionsIdArr.every((item) => delQuestions.includes(item))) {
        setDelQuestions([])
      } else {
        setDelQuestions(questionsIdArr)
      }
      return
    }
    let newDelQuestions = []
    if (delQuestions.includes(id)) {
      newDelQuestions = delQuestions.filter((item) => id !== item)
    } else {
      newDelQuestions = [...delQuestions, id]
    }
    setDelQuestions(newDelQuestions)
  }
  const checkDelQuestions = (id) => {
    if (id === "all") {
      const questionsIdArr = questions.map((item) => item.id)
      if (questionsIdArr.every((item) => delQuestions.includes(item))) {
        return true
      } else {
        return false
      }
    }
    if (delQuestions.includes(id)) {
      return true
    } else {
      return false
    }
  }
  const onSubmit = () => {
    if (loading) {
      return
    }
    disconnectQuestions({
      variables: {
        quizId: parseInt(id),
        questionsId: delQuestions.join(",")
      }
    })
  }
  return (
    <React.Fragment>
      <SEditForm onSubmit={handleSubmit(onSubmit)}>
        <EditInputLayout>
          <InputTitle>퀴즈 문제 삭제하기</InputTitle>
          {questions.length === 0 ? <div>등록된 문제가 없습니다.</div>
            :
            <Wrapper>
              <ActionBtn>
                <DelBtn
                  type="submit"
                  value={loading ? "삭제중..." : "삭제하기"}
                  disabled={delQuestions.length === 0} />
                <AllCkeckBtn>
                  모두 선택하기
                <FontAwesomeIcon
                    icon={checkDelQuestions("all") ? faCheckSquare : faSquare}
                    onClick={() => onClickCheckBtn("all")}
                  />
                </AllCkeckBtn>
              </ActionBtn>
              <QuestionsList>
                {questions.map((item, index) => {
                  return <QUestionsItem key={index}>
                    <div className="questionWrapper">
                      <div className="question">
                        {item.question.length > 40 ? `${item.question.substring(0, 40)}...` : item.question}
                      </div>
                      <div className="questionInfo">
                        <div className="username">
                          {item.user.avatarURL ?
                            <AvatarImage src={item.user.avatarURL} /> :
                            <FontAwesomeIcon icon={faUser} />
                          }
                          <span>{item.user.nickname}</span>
                        </div>
                        <div className="type">{processType(item.type)}</div>
                        <Likes className="likes" isLiked={item.isLiked}>
                          <FontAwesomeIcon icon={item.isLiked ? faHeart : faHeartRegular} />{item.likes}
                        </Likes>
                        <div className="comment"><FontAwesomeIcon icon={faComment} />3</div>
                        <div className="hits">조회수 {item.hits}</div>
                      </div>
                    </div>
                    <CheckBtn>
                      <FontAwesomeIcon
                        icon={checkDelQuestions(item.id) ? faCheckSquare : faSquare}
                        onClick={() => onClickCheckBtn(item.id)}
                      />
                    </CheckBtn>
                  </QUestionsItem>
                })}
              </QuestionsList>
            </Wrapper>
          }
        </EditInputLayout>
      </SEditForm>
    </React.Fragment>
  );
}

export default DisconnectQuestions;