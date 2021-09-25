import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ObjQuestion from '../MakeQuiz/ObjQuestion';
import SubQuestion from '../MakeQuiz/SubQuestion';
import TFQuestion from '../MakeQuiz/TFQuestion';
import EditInputLayout from './EditInputLayout';
import { InputTitle } from './sharedCss';

const Container = styled.div``

const SMakeQuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 60px;
  .addQuestionMsg {
    justify-self: center;
    color: tomato;
  }
`
const QuestionType = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
`

const Types = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   justify-items: start;
   align-items: center;
   svg {
     margin-right: 10px;
     cursor: pointer;
   }
`

const AddQuestions = ({ state, tags, user: { nickname, avatarURL } }) => {
  const { id } = useParams()
  const [quizType, setQuizType] = useState("sub")
  const onClickType = (type) => {
    setQuizType(type)
  }
  return (<React.Fragment>
    <Container>
      <EditInputLayout>
        <InputTitle>퀴즈 문제 추가하기</InputTitle>
        <SMakeQuestionContainer>
          <QuestionType>
            <span>문제 유형</span>
            <Types>
              <div>
                <FontAwesomeIcon
                  onClick={() => onClickType("sub")}
                  icon={quizType === "sub" ? faCheckCircle : faCircle}
                />주관식</div>
              <div>
                <FontAwesomeIcon
                  onClick={() => onClickType("obj")}
                  icon={quizType === "obj" ? faCheckCircle : faCircle}
                />객관식</div>
              <div>
                <FontAwesomeIcon
                  onClick={() => onClickType("tf")}
                  icon={quizType === "tf" ? faCheckCircle : faCircle}
                />○ / ✕</div>
            </Types>
          </QuestionType>
          {quizType === "sub"
            && <SubQuestion
              quizTags={tags.map((item) => item.name)}
              quizType={quizType}
              nextMode=""
              imageId="newImage"
              state={state}
              updateQuestion={true}
              quizId={parseInt(id)}
              nickname={nickname}
              avatarUR={avatarURL}
            />}
          {quizType === "obj"
            && <ObjQuestion
              quizTags={tags.map((item) => item.name)}
              quizType={quizType}
              nextMode=""
              imageId="newImage"
              state={state}
              updateQuestion={true}
              quizId={parseInt(id)}
              nickname={nickname}
              avatarUR={avatarURL}
            />}
          {quizType === "tf"
            && <TFQuestion
              quizTags={tags.map((item) => item.name)}
              quizType={quizType}
              nextMode=""
              imageId="newImage"
              state={state}
              updateQuestion={true}
              quizId={parseInt(id)}
              nickname={nickname}
              avatarUR={avatarURL}
            />}
          <div className="addQuestionMsg">새롭게 추가된 문제는 퀴즈의 마지막 번호로 추가 됩니다.</div>
        </SMakeQuestionContainer>
      </EditInputLayout>
    </Container>
  </React.Fragment>);
}

export default AddQuestions;