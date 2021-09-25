import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import InputBtn from '../InputBtn';
import EditImageContainer from './EditImageContainer';
import EditInputLayout from './EditInputLayout';
import EditTagInput from './EditTagInput';
import EditObjQuestionAnswer from './EditObjQuestionAnswer';
import EidtTfQuestionAnswer from './EditTfQuestionAnswer';
import { EidtMsg, InputTitle } from './sharedCss';

const SEditForm = styled.form`
  /* border: 1px solid ${props => props.theme.fontColor};
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
  transition: border 1s ease; */

  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  margin-bottom: 40px;
`

const EDIT_QUESTION_MUTATION = gql`
  mutation editQuestion(
    $id: Int!,
    $question: String!, 
    $answer: String!,
    $tags: String!, 
    $updateInfo: String!, 
    $hint: String, 
    $distractor: String, 
    $image: Upload,
    $delImg: Boolean!
    ) {
    editQuestion(
      id: $id, 
      question: $question, 
      answer: $answer, 
      tags: $tags, 
      updateInfo: $updateInfo, 
      hint: $hint, 
      distractor: $distractor, 
      image: $image,
      delImg: $delImg
    ) {
      ok
      error
    }
  }
`

const EditQuestionForm = ({ tags, user: { id: ownerId }, type, image, question, distractor, answer, hint, updateInfo }) => {
  const { id } = useParams()
  const user = useUser()
  const history = useHistory()
  const [editMsg, setEditMsg] = useState(undefined)
  const distractorArr = () => {
    if (distractor) {
      return distractor.split("//!@#")
    } else {
      return
    }
  }
  const [objAnswer, setObjAnswer] = useState(answer.split(",").map((item) => parseInt(item)))
  const [tfAnswer, setTfAnswer] = useState(answer)
  const [questionTags, setQuestionTags] = useState(tags.map((item) => item.name))
  const [newImage, setNewImage] = useState(undefined)
  const [previewImg, setPreviewImg] = useState(image)
  const [delImg, setDelImg] = useState(false)
  useEffect(() => {
    if (user.id !== ownerId) {
      alert("잘못된 접근입니다.")
      history.push("/")
    }
  }, [])
  const { register, formState: { isValid }, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      question,
      hint,
      updateInfo,
      ...(type === "sub" && { answer }),
      ...(type === "obj" && {
        distractor1: distractorArr()[0],
        distractor2: distractorArr()[1],
        distractor3: distractorArr()[2],
        distractor4: distractorArr()[3]
      })
    }
  })
  const update = (cache, result) => {
    const { data: { editQuestion: { ok, error } } } = result
    if (ok) {
      const QuestionId = `Question:${parseInt(id)}`
      cache.modify({
        id: QuestionId,
        fields: {
          question() { return getValues("question") },
          hint() { return getValues("hint") },
          answer() { return getValues("answer") },
          updateInfo() { return getValues("updateInfo") },
          ...(type === "obj" && {
            distractor() {
              return processDistracor(getValues("distractor1"), getValues("distractor2"), getValues("distractor3"), getValues("distractor4"))
            }
          }),
          ...(newImage && { image() { return error } }),
        }
      })
    }
    setEditMsg("문제 정보가 수정 되었습니다.")
  }
  const [editQuestion, { loading }] = useMutation(EDIT_QUESTION_MUTATION, {
    update
  })
  const processDistracor = (distractor1, distractor2, distractor3, distractor4) => {
    if (type === "obj") {
      // const { distractor1, distractor2, distractor3, distractor4 } = data
      return distractor = `${distractor1}//!@#${distractor2}//!@#${distractor3}//!@#${distractor4}`
    } else {
      return
    }
  }
  const processAnswer = (answer) => {
    if (type === "sub") {
      return answer
    } else if (type === "obj") {
      return objAnswer.join(",")
    } else if (type === "tf") {
      return tfAnswer
    }
  }
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { question, updateInfo, hint } = data
    const tags = [...questionTags].join(",")
    editQuestion({
      variables: {
        id: parseInt(id),
        question,
        updateInfo,
        tags,
        answer: processAnswer(data.answer),
        hint,
        ...(type === "obj" && { distractor: processDistracor(data.distractor1, data.distractor2, data.distractor3, data.distractor4) }),
        ...(newImage && { image: newImage }),
        delImg
      }
    })
  }
  return (<SEditForm onSubmit={handleSubmit(onSubmit)}>
    <EditInputLayout>
      <InputTitle>문제 수정하기</InputTitle>
      <textarea
        cols={20}
        rows={5}
        {...register("question", {
          required: true
        })}
      ></textarea>
    </EditInputLayout>
    {type === "sub" &&
      <EditInputLayout>
        <InputTitle>정답 수정하기</InputTitle>
        <input
          {...register("answer", {
            required: true
          })}
          type="text"
          autoComplete="off"
          className="firstInput"
        />
      </EditInputLayout>}
    {type === "obj" &&
      <EditObjQuestionAnswer
        objAnswer={objAnswer}
        setObjAnswer={setObjAnswer}
        register={register}
      />}
    {type === "tf" &&
      <EidtTfQuestionAnswer
        tfAnswer={tfAnswer}
        setTfAnswer={setTfAnswer}
      />}
    <EditInputLayout>
      <InputTitle>태그 수정하기</InputTitle>
      <EditTagInput
        register={register}
        tags={questionTags}
        getValues={getValues}
        setValue={setValue}
        setTags={setQuestionTags}
      />
    </EditInputLayout>
    <EditInputLayout>
      <InputTitle>힌트 수정하기</InputTitle>
      <input
        {...register("hint")}
        type="text"
        autoComplete="off"
        className="firstInput"
      />
    </EditInputLayout>
    <EditInputLayout>
      <InputTitle>이미지 수정하기</InputTitle>
      <EditImageContainer
        setValue={setValue}
        register={register}
        setNewImage={setNewImage}
        nextMode=""
        imageId={Math.random()}
        previewImg={previewImg}
        setPreviewImg={setPreviewImg}
        setDelImg={setDelImg}
        delImg={delImg}
      />
    </EditInputLayout>
    <EditInputLayout>
      <InputTitle>업데이트 내용</InputTitle>
      <textarea
        cols={20}
        rows={5}
        {...register("updateInfo", {
          required: true
        })}
      ></textarea>
    </EditInputLayout>
    {editMsg && <EidtMsg>{editMsg}</EidtMsg>}
    <InputBtn disabled={!isValid} value={loading ? "수정중..." : "수정하기"} />
  </SEditForm >);
}

export default EditQuestionForm;