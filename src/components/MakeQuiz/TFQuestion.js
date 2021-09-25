import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import InputBtn from '../InputBtn';
import InputLayout from './InputLayout';
import MakeQuestionForm from './MakeQuestionForm';
import NextStep from './NextStep';
import QuestionOption from './QuestionOption';
import QuestionOptionTitle from './QuestionOptionTitle';
import QuestionTextarea from './QuestionTextarea';

const SeletBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`

const TFBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(200, 200, 200, 0.6);
    opacity: ${props => props.selected ? 1 : 0.4};
    font-size: 20px;
    padding: 10px 0px;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 0.2s linear;
`

const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion(      
      $question: String!,
      $answer: String!,
      $type: String!,
      $state: String!
      $hint: String,
      $image: Upload,
      $tags: String,
      $distractor: String,
      $updata: Boolean,
      $quizId: Int
      ) {
      createQuestion(
        question: $question,
        answer: $answer,
        type: $type,
        state: $state,
        hint: $hint,
        image: $image,
        tags: $tags,
        distractor: $distractor,
        updata: $updata,
        quizId: $quizId
      ) {
      ok
      questionId
      error
    }
  }
`

const TFQuestion = ({ quizTags, quizType, setQuestionIdArr, questionIdArr, setNextMode, nextMode, imageId, state, updateQuestion, quizId, nickname, avatarURL }) => {
  const [questionTags, setQuestionTags] = useState([])
  const [image, setImage] = useState(undefined)
  const [option, setOption] = useState(false)
  const [answer, setAnswer] = useState("")
  const [previewImg, setPreviewImg] = useState(undefined)
  const { register, setValue, getValues, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { createQuestion: { questionId, ok } } = result
    if (ok) {
      if (updateQuestion) {
        return
      }
      const newQuestionIdArr = [...questionIdArr, questionId]
      setQuestionIdArr(newQuestionIdArr)
      setNextMode("next")
    }
  }
  const update = (cache, result) => {
    if (!updateQuestion) {
      return
    }
    const { data: { createQuestion: { ok, questionId } } } = result
    if (ok) {
      const question = {
        id: questionId,
        __typename: "Question",
        question: getValues("question"),
        type: quizType,
        isLiked: false,
        likes: 0,
        hits: 0,
        user: {
          nickname: nickname,
          avatarURL: avatarURL
        }
      }
      const QuizId = `Quiz:${quizId}`
      cache.modify({
        id: QuizId,
        fields: {
          questions(prev) {
            const newQuestions = [...prev, question]
            return newQuestions
          }
        }
      })
    }
    setValue("question", "")
    setValue("hint", "")
    setQuestionTags([])
    setAnswer("")
    setImage(undefined)
    setPreviewImg(undefined)
  }
  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION_MUTATION, {
    onCompleted,
    update
  })
  const onClickTFBtn = (answer) => {
    if (nextMode !== "") {
      return
    }
    setAnswer(answer)
  }
  const onSubmit = (data) => {
    const { question, hint } = data
    const type = quizType
    const tags = [...quizTags, ...questionTags].join(",")
    if (loading) {
      return
    }
    createQuestion({
      variables: {
        question,
        answer,
        type,
        state,
        ...(hint && { hint }),
        ...(image && { image }),
        ...(tags && { tags }),
        ...(updateQuestion && { updata: updateQuestion }),
        ...(quizId && { quizId })
      }
    })
  }
  return (<MakeQuestionForm onSubmit={handleSubmit(onSubmit)}>
    <InputLayout updateQuestion={updateQuestion}>
      <span className="inputTitle">문제</span>
      <QuestionTextarea
        register={register}
        nextMode={nextMode} />
    </InputLayout>
    <InputLayout updateQuestion={updateQuestion}>
      <span className="inputTitle">정답</span>
      <SeletBox>
        <TFBtn
          onClick={() => onClickTFBtn("true")}
          selected={answer === "true"}
        >○</TFBtn>
        <TFBtn
          onClick={() => onClickTFBtn("false")}
          selected={answer === "false"}
        >✕</TFBtn>
      </SeletBox>
    </InputLayout>
    <QuestionOptionTitle option={option} setOption={setOption} />
    {option && <QuestionOption
      register={register}
      getValues={getValues}
      setValue={setValue}
      questionTags={questionTags}
      setQuestionTags={setQuestionTags}
      setImage={setImage}
      nextMode={nextMode}
      imageId={imageId}
      previewImg={previewImg}
      setPreviewImg={setPreviewImg}
      updateQuestion={updateQuestion}
    />}
    {nextMode === "" ?
      <InputBtn value={loading ? "문제 만드는 중..." : "문제 만들기"} disabled={!isValid || answer === ""} />
      :
      <NextStep
        setNextMode={setNextMode}
        nextMode={nextMode}
      />
    }
  </MakeQuestionForm>);
}

export default TFQuestion;