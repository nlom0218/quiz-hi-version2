import { faFile, faHandRock } from '@fortawesome/free-regular-svg-icons';
import { faListOl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import OptionBox from './OptionBox';
import StatusBar from './StatusBar';

const Container = styled.div`
  padding: 40px 40px;
  background-color: ${props => props.theme.boxColor};
  display: grid;
  min-height: 520px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  box-shadow: ${props => props.theme.boxShadow};
  column-gap: 40px;
  row-gap: 40px;
  align-items: flex-start;
  transition: background-color 1s ease;
`

const ConsolationQuestion = styled.div``

const SQuestionBox = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  transition: opacity 0.6s ease;
  opacity: ${props => props.opacity};
`

const Wrapper = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: auto 1fr;
  font-size: ${props => `${props.fontSize}px`};
  font-weight: 600;
  line-height: 120%;
  column-gap: 40px;
`

const Question = styled.div``

const DisTractorList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 26px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-right: 26px;
    align-self: flex-start;
  }
`

const Distractor = styled.div`
  font-weight: 600;
  align-self: flex-start;
  justify-self: flex-start;
`

const Answer = styled.div``

const Author = styled.div`
  align-self: flex-end;
  opacity: ${props => props.opacity};
`


const QuestionBox = ({ setQuestionNum, questionNum, quizList, totalNum, student, setStduent }) => {
  const [action, setAction] = useState(null)
  const [fontSize, setFontSize] = useState(26)
  const quizMode = localStorage.getItem("selectMode")
  const question = quizList.filter((item, index) => index + 1 === questionNum)[0]
  return (
    <React.Fragment>
      <OptionBox
        questionNum={questionNum}
        totalNum={totalNum}
        setQuestionNum={setQuestionNum}
        action={action}
        setAction={setAction}
        question={question}
        student={student}
        setStduent={setStduent}
        setFontSize={setFontSize}
        fontSize={fontSize}
      />
      <Container>
        <StatusBar questionNum={questionNum} totalNum={totalNum} action={action} />
        <SQuestionBox opacity={action === null ? 1 : 0.1}>
          <Wrapper fontSize={fontSize}>
            <FontAwesomeIcon icon={faFile} />
            <Question>{question.question}</Question>
          </Wrapper>
          {question.type === "obj" &&
            <Wrapper fontSize={fontSize}>
              <FontAwesomeIcon icon={faListOl} />
              <DisTractorList>
                {question.distractor.split("//!@#").map((item, index) => {
                  return <DisTractorItem key={index}>
                    <div className="num">{`${index + 1}번`}</div>
                    <Distractor>{item}</Distractor>
                  </DisTractorItem>
                })}
              </DisTractorList>
            </Wrapper>
          }
        </SQuestionBox>
        <Author opacity={action === null ? 1 : 0.2}>만든이: {question.author}</Author>
      </Container>
    </React.Fragment>
  );
}

export default QuestionBox;