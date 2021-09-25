import { useQuery } from '@apollo/client';
import { faBell, faCheckSquare, faFile, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faListOl, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';
import { compare, compareDesc } from '../../../sharedFn';
import InputBtn from '../../InputBtn';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const DivdieLine = styled.div`
  height: 1px;
  background-color: rgb(200, 200, 200, 0.8);
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

const Title = styled.div``

const SetOrder = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 30px;
  .order_msg, .order_reset {
    align-self: flex-end;
  } 
  .order_reset {
    padding: 5px 10px;
    background-color: rgb(255, 165, 0, 0.8);
    border-radius: 5px;
    cursor: pointer;
  }
`

const SetQuestion = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  padding: 20px 20px;
  border: 1px solid rgb(200, 200, 200, 0.8);
`

const Item = styled.div`
  font-weight: 600;
  line-height: 24px;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  line-height: 24px;
`

const CheckBox = styled.div`
  align-self: flex-start;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  svg {
    cursor: pointer;
  }
`

const QuestionOrder = styled.div``

const PreviewList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
  line-height: 24px;
`

const PreviewItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 30px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 30px 20px;
  align-items: flex-start;
  .quizContent {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 30px;
  }
`

const PreviewWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-right: 10px;
    align-self: flex-start;
  }
`

const DistractorContent = styled.div`
  align-self: flex-start;
  justify-self: flex-start;
  line-height: 24px;
  color: ${props => props.answer ? "tomato" : props.theme.fontColor};
`

const SetOrderMsg = styled.div`
  text-align: center;
  color: tomato;
`

const NextBtn = styled.div`
  /* width: 100%; */
  background-color: rgb(200, 200, 200, 0.6);
  opacity: ${props => props.disabled ? 0.4 : 1};
  text-align: center;
  font-weight: 600;
  padding: 10px 0px;
  /* margin-top: 10px; */
  border-radius: 5px;
  transition: opacity 0.6s linear;
  cursor: pointer;
`

const SetQuestionOrder = ({ dataQuestions, makeQuiz, setMakeQuiz, setQuestionIdArr, setOrderArr }) => {
  const [questions, setQuestions] = useState(dataQuestions)
  useEffect(() => {
    const questionIdArr = questions.map((item) => item.id)
    setQuestionIdArr(questionIdArr)
  }, [])
  const onClickOrderCheckBox = (id) => {
    const orderArr = (questions.map((item) => {
      if (item.order) {
        return item.order
      } else {
        return 0
      }
    }))
    const maxOrder = orderArr.reduce((acc, cur) => (acc > cur ? acc : cur), 0)
    const question = questions.filter((item) => item.id === id)[0]
    if (!question.order) {
      const newQuestion = { ...question, order: (maxOrder ? maxOrder : 0) + 1 }
      const existQuestion = questions.filter((item) => item !== question)
      setQuestions([...existQuestion, newQuestion].sort(compareDesc("id")))
    } else {
      const newQuestion = { ...question, order: undefined }
      const existQuestion = questions.filter((item) => item !== question).map((item) => {
        if (item.order > question.order) {
          return { ...item, order: item.order - 1 }
        } else {
          return item
        }
      })
      setQuestions([...existQuestion, newQuestion].sort(compareDesc("id")))
    }
  }
  const onClickResetBtn = () => {
    const newQuestions = questions.map((item) => {
      return { ...item, order: undefined }
    })
    setQuestions(newQuestions)
  }
  const processAnswer = (answer) => {
    if (answer === "true") {
      return "○"
    } else if (answer === "false") {
      return "✕"
    } else {
      return answer
    }
  }
  const disabledNextStep = () => {
    const checkOrder = questions.map((item) => {
      if (!item.order) {
        return undefined
      } else {
        return item
      }
    })
    if (checkOrder.includes(undefined)) {
      return true
    } else {
      return false
    }
  }
  const onClickNextBtn = () => {
    setMakeQuiz(true)
    const questionOrderArr = questions.map((item) => {
      return { id: item.id, order: item.order }
    }).sort(compare("order"))
    const orderArr = questionOrderArr.map((item) => item.id)
    setOrderArr(orderArr)
  }

  return (<Container>
    <Wrapper>
      <Title>순서 정하기</Title>
      <SetOrder>
        <div className="order_msg">문제 순서대로 문제 옆 박스를 클릭해 주세요.</div>
        <div className="order_reset" onClick={onClickResetBtn}><FontAwesomeIcon icon={faRedoAlt} /> 초기화</div>
        {questions.map((item, index) => {
          return <SetQuestion key={index}>
            <Item><FontAwesomeIcon icon={faFile} /> 문제</Item>
            <Content>{item.question}</Content>
            <CheckBox>
              <QuestionOrder>{item.order ? `${item.order}번` : ""}</QuestionOrder>
              <FontAwesomeIcon icon={item.order ? faCheckSquare : faSquare} onClick={() => onClickOrderCheckBox(item.id)} />
            </CheckBox>
          </SetQuestion>
        })}
      </SetOrder>
    </Wrapper>
    <DivdieLine></DivdieLine>
    <Wrapper>
      <Title>문제, 정답 미리보기</Title>
      <PreviewList>
        {questions.filter((item) => item.order).sort(compare("order")).map((item, index) => {
          return <PreviewItem key={index}>
            <div className="quizContent">
              <PreviewWrapper>
                <Title><FontAwesomeIcon icon={faFile} /> 문제 {item.order}</Title>
                <Content>{item.question}</Content>
              </PreviewWrapper>
              {item.distractor && <PreviewWrapper>
                <Title><FontAwesomeIcon icon={faListOl} /> 선택지</Title>
                <Content>
                  {item.distractor.split("//!@#").map((distractor, index) => {
                    return <DisTractorItem key={index}>
                      <div className="num">{`${index + 1}번`}</div>
                      <DistractorContent
                        answer={parseInt(item.answer) === index + 1 ? true : false}
                      >{distractor}</DistractorContent>
                    </DisTractorItem>
                  })}
                </Content>
              </PreviewWrapper>}
              <PreviewWrapper>
                <Title><FontAwesomeIcon icon={faBell} /> 정답</Title>
                <Content>{processAnswer(item.answer)}</Content>
              </PreviewWrapper>
            </div>
          </PreviewItem>
        })}
      </PreviewList>
    </Wrapper>
    <SetOrderMsg>
      {!disabledNextStep() ? "순서 설정이 완료 되었습니다." : "순서 설정이 완료 되지 않았습니다."}
    </SetOrderMsg>
    <NextBtn disabled={disabledNextStep() || makeQuiz} onClick={onClickNextBtn}>3단계 진행하기</NextBtn>
  </Container>);
}

export default SetQuestionOrder;