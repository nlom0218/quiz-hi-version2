import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import InputBtn from '../InputBtn';
import InputLayout from './InputLayout';

const SCompletionQuizForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 60px;
  animation: ${fadeIn} 0.8s linear forwards;
`

const SeeTag = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TagBox = styled.div`
  background-color: rgb(201, 102, 255, 0.4);
  font-size: 14px;
  margin-bottom: 10px;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.6s linear forwards;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  .editMsg{
    justify-self: center;
    color: tomato;
  }
`

const MovePageBtn = styled.div`
  animation: ${fadeIn} 0.6s linear forwards;
  margin-top: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  justify-items: center;
  row-gap: 20px;
`

const CompleteMsg = styled.div`
  grid-column: 1 / -1;
  justify-self: flex-start;
`

const SNavBtn = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  width: 160px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.fontColor};
  transition: background-color 0.5s linear, color  0.5s linear;
  :hover {
  background-color: ${props => props.theme.fontColor};   
  color: ${props => props.theme.bgColor};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px;
  color: ${props => props.theme.fontColor};
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`


const CREATE_QUIZ_MUTATION = gql`
  mutation createQuiz(      
      $questions: String!,
      $title: String!,
      $state: String!
      $tags: String,
      $caption: String,
      $order: String,
      ) {
        createQuiz(
        questions: $questions,
        title: $title,
        state: $state
        tags: $tags,
        caption: $caption,
        order: $order
      ) {
      ok
      error
    }
  }
`

const CompletionQuiz = ({ quizTags, quizTitle, state, questionIdArr, quizCaption, orderArr }) => {
  const user = useUser()
  const history = useHistory()
  const num = questionIdArr.length
  const [complete, setComplete] = useState(false)
  const onCompleted = (result) => {
    const { createQuiz: { ok, error } } = result
    if (ok) {
      setComplete(true)
    }
  }
  const update = (cache, result) => {
    const { data: { createQuiz: { ok } } } = result
    if (!ok) {
      return
    }
    if (state === "public") {
      cache.modify({
        id: `User:${user.id}`,
        fields: {
          totalPublicQuiz(prev) { return prev + 1 },
          totalPublicQuestion(prev) { return prev + num },
        }
      })
    }
  }
  const [createQuiz, { loading }] = useMutation(CREATE_QUIZ_MUTATION, {
    onCompleted,
    update
  })
  const { handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const questionString = questionIdArr.join(",")
    const tags = [...quizTags].join(",")
    createQuiz({
      variables: {
        title: quizTitle,
        state,
        tags,
        questions: questionString,
        caption: quizCaption,
        ...(orderArr && { order: JSON.stringify(orderArr) })
      }
    })
  }
  const onClickPageBtn = (page) => {
    history.push(page)
    window.location.reload()
  }
  return (<SCompletionQuizForm onSubmit={handleSubmit(onSubmit)}>
    <InputLayout>
      <span className="inputTitle">퀴즈 제목</span>
      <input
        value={quizTitle}
        type="text"
        readOnly="readOnly"
      />
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">퀴즈 설명</span>
      <Wrapper>
        <Textarea
          cols={20}
          rows={5}
          readOnly="readOnly"
          value={quizCaption}
        ></Textarea >
        <span className="editMsg">퀴즈 제목과 설명은 1단계에서 수정 가능합니다.</span>
      </Wrapper>
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">공유</span>
      <input
        value={state === "private" ? "공유하지 않음" : "공유함"}
        type="text"
        readOnly="readOnly"
      />
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">문제 개수</span>
      <input
        value={`${num}개`}
        type="text"
        readOnly="readOnly"
      />
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">태그</span>
      <SeeTag>
        {quizTags.map((item, index) => {
          return <TagBox key={index}>
            {item}
          </TagBox>
        })}
      </SeeTag>
    </InputLayout>
    {
      complete ?
        <React.Fragment>
          <MovePageBtn>
            <CompleteMsg className="inputTitle">・ 퀴즈가 생성 되었습니다.</CompleteMsg>
            <SNavBtn onClick={() => window.location.reload()}>새로 만들기</SNavBtn>
            <div onClick={() => onClickPageBtn("/feed/quiz/all/recent/1")}>
              <SNavBtn>
                퀴즈 피드
            </SNavBtn>
            </div>
            <div onClick={() => onClickPageBtn(`/profile/${user?.username}/quizQuestion/${state}/quiz/1`)}>
              <SNavBtn>
                프로필
            </SNavBtn>
            </div>
          </MovePageBtn>
        </React.Fragment>
        :
        <InputBtn
          value={loading ? "퀴즈 만드는 중..." : "퀴즈 만들기"}
        />
    }
  </SCompletionQuizForm >);
}

export default CompletionQuiz;