import { useMutation } from '@apollo/client';
import { faCheckCircle, faCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const DistractorBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 20px;
  .distractorWrapper {
    display: grid;
    grid-template-columns: 1fr 12fr 1fr;
    svg {
    justify-self: center;
    align-self: center;
    font-size: 18px;
    cursor: pointer;
    }
  }
  textarea {
    width: 100%;
    resize: none;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px 20px;
    color: ${props => props.theme.fontColor};
    background-color: rgb(200, 200, 200, 0.2);
    transition: box-shadow 0.4s linear, color 1s ease;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
      outline: none;
    }
  }
`

const DistractorNum = styled.div`
  justify-self: center;
  align-self: flex-start;
  margin-top: 10px;
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

const ObjQuestion = ({ quizTags, quizType, setQuestionIdArr, questionIdArr, setNextMode, nextMode, imageId, state, updateQuestion, quizId, nickname, avatarURL }) => {
  const [questionTags, setQuestionTags] = useState([])
  const [answer, setAnswer] = useState([])
  const [image, setImage] = useState(undefined)
  const [option, setOption] = useState(false)
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
    setValue("distractor1", "")
    setValue("distractor2", "")
    setValue("distractor3", "")
    setValue("distractor4", "")
    setQuestionTags([])
    setImage(undefined)
    setAnswer([])
    setPreviewImg(undefined)
  }
  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION_MUTATION, {
    onCompleted,
    update
  })
  const onClickAnswer = (num) => {
    if (nextMode !== "") {
      return
    }
    const ok = answer.includes(num)
    if (ok) {
      const newAnswer = answer.filter((item) => item !== num)
      setAnswer(newAnswer)
    } else {
      const newAnswer = [...answer, num]
      setAnswer(newAnswer)
    }
  }
  const checkAnswer = (num) => {
    const ok = answer.includes(num)
    if (ok) {
      return true
    } else {
      return false
    }
  }
  const onSubmit = (data) => {
    const { question, hint, distractor1, distractor2, distractor3, distractor4 } = data
    const type = quizType
    const tags = [...quizTags, ...questionTags].join(",")
    const answerString = answer.join(",")
    const distractor = `${distractor1}//!@#${distractor2}//!@#${distractor3}//!@#${distractor4}`
    createQuestion({
      variables: {
        question,
        answer: answerString,
        distractor,
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
  const [questionMark, setQuestionMark] = useState(false)
  const onClickQuestionMark = () => {
    setQuestionMark(prev => !prev)
  }
  return (<MakeQuestionForm onSubmit={handleSubmit(onSubmit)}>
    <InputLayout updateQuestion={updateQuestion}>
      <span className="inputTitle">문제</span>
      <QuestionTextarea
        register={register}
        nextMode={nextMode} />
    </InputLayout>
    <InputLayout updateQuestion={updateQuestion}>
      <span className="inputTitle">
        선택지 <FontAwesomeIcon onClick={onClickQuestionMark} icon={faQuestionCircle} />
        {questionMark && <span className="subMsg">문항을 입력하고 정답을 체크해주세요.(중복가능)</span>}
      </span>
      <DistractorBox>
        {[1, 2, 3, 4].map((item) => {
          return <div className="distractorWrapper" key={item}>
            <DistractorNum>{item}번</DistractorNum>
            <textarea
              {...register(`distractor${item}`, {
                required: true
              })}
              cols={20}
              rows={2}
              readOnly={nextMode !== "" && "readOnly"}
            ></textarea>
            <FontAwesomeIcon
              onClick={() => onClickAnswer(item)}
              icon={checkAnswer(item) ? faCheckCircle : faCircle}
            />
          </div>
        })}
      </DistractorBox>
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
      <InputBtn
        value={loading ? "문제 만드는 중..." : "문제 만들기"}
        disabled={!isValid || answer.length === 0} />
      :
      <NextStep
        setNextMode={setNextMode}
        nextMode={nextMode}
      />
    }
  </MakeQuestionForm>);
}

export default ObjQuestion;