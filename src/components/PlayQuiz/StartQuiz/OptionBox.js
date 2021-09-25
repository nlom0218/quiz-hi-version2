import { useReactiveVar } from '@apollo/client';
import { faHandRock, faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faImage, faMagic, faBell, faUserFriends, faSun, faMoon, faRedoAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../../../apollo';
import AnswerAction from './AnswerAction';
import HintAction from './HintAction';
import ImageAction from './ImageAction';
import ResultAction from './ResultAction';
import StudentAction from './StudentAction';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(9, auto) 1fr;
  column-gap: 40px;
  align-items: flex-end;
  font-size: 24px;
  position: relative;
`

const ActionBtn = styled.div`
  svg {
    color: ${props => props.selected ? "rgb(42, 140, 0)" : props.theme.fontColor};
    transition: color 0.6s ease;
    opacity: ${props => props.disabled ? 0.6 : 1};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    :hover {
      color: rgb(42, 140, 0);
    }
  }
`

const Score = styled.div`
  /* color: rgb(255, 165, 0, 0.8); */
  color: rgb(42, 140, 0);
  font-size: 32px;
  justify-self: flex-end;
`

const ConsolationQuestion = styled.div`
  justify-self: flex-end;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
  column-gap: 20px;
`

const Question = styled.div``


const OptionBox = ({ questionNum, setQuestionNum, action, setAction, question, totalNum, student, setStduent, setFontSize, fontSize }) => {
  const history = useHistory()
  const quizMode = localStorage.getItem("selectMode")
  const darkMode = useReactiveVar(darkModeVar)
  const onClickHomeBtn = () => {
    history.push("/")
  }
  const onClickResetBtn = () => {
    if (window.confirm("퀴즈를 다시 시작하시겠습니까?")) {
      localStorage.setItem("questionNum", 1)
      setQuestionNum(1)
      const newStudent = student.map((item) => {
        return { nickname: item.nickname, id: item.id, pass: true, score: 0, order: item.order }
      })
      localStorage.setItem("joinStudent", JSON.stringify(newStudent))
      setStduent(newStudent)
      setAction(null)
    }
  }
  const onClickActionBtn = (type) => {
    if (action === "result") {
      return
    }
    if (type === "hint" && !question.hint) {
      return
    }
    if (type === "image" && !question.image) {
      return
    }
    if (type === "student" && student.length === 0) {
      return
    }
    setAction(type)
  }
  const onCLickDarkMode = () => {
    if (darkMode === true) {
      disableDarkMode()
    } else if (darkMode === false) {
      enableDarkMode()
    }
  }
  const processScore = () => {
    if (quizMode === "score" || quizMode === "cooperation") {
      return true
    }
    return false
  }
  const goldenBellConsolation = () => {
    if (quizMode !== "goldenBell") {
      return false
    }
    if (question.consolation) {
      return true
    } else {
      return false
    }
  }
  const onClickSetFontSizeBtn = (action) => {
    if (action === "plus") {
      setFontSize(prev => prev + 4)
    } else if (action === "minus") {
      if (fontSize === 26) {
        return
      }
      setFontSize(prev => prev - 4)
    }
  }
  return (<Container>
    <ActionBtn><FontAwesomeIcon icon={faHome} onClick={onClickHomeBtn} /></ActionBtn>
    <ActionBtn><FontAwesomeIcon icon={faRedoAlt} onClick={onClickResetBtn} /></ActionBtn>
    <ActionBtn selected={action === "answer"} disabled={action === "result"}>
      <FontAwesomeIcon icon={faBell} onClick={() => onClickActionBtn("answer")} />
    </ActionBtn>
    <ActionBtn selected={action === "hint"} disabled={!question.hint || action === "result"}>
      <FontAwesomeIcon icon={faMagic} onClick={() => onClickActionBtn("hint")} />
    </ActionBtn>
    <ActionBtn selected={action === "image"} disabled={!question.image || action === "result"}>
      <FontAwesomeIcon icon={faImage} onClick={() => onClickActionBtn("image")} />
    </ActionBtn>
    <ActionBtn selected={action === "student"} disabled={student.length === 0 || action === "result"} >
      <FontAwesomeIcon icon={faUserFriends} onClick={() => onClickActionBtn("student")} />
    </ActionBtn>
    <ActionBtn>
      <FontAwesomeIcon
        icon={darkMode ? faSun : faMoon}
        onClick={onCLickDarkMode}
        style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
      />
    </ActionBtn>
    <ActionBtn>
      <FontAwesomeIcon icon={faPlusSquare} onClick={() => onClickSetFontSizeBtn("plus")} />
    </ActionBtn>
    <ActionBtn>
      <FontAwesomeIcon icon={faMinusSquare} onClick={() => onClickSetFontSizeBtn("minus")} />
    </ActionBtn>
    {goldenBellConsolation() && <ConsolationQuestion>
      <Wrapper style={{ color: "tomato" }}>
        <FontAwesomeIcon icon={faHandRock} />
        <Question>패자부활전 문제</Question>
      </Wrapper>
    </ConsolationQuestion>}
    {processScore() && <Score>{question.score}점</Score>}
    {action === "answer" &&
      <AnswerAction
        question={question}
        questionNum={questionNum}
        totalNum={totalNum}
        setQuestionNum={setQuestionNum}
        setAction={setAction}
        student={student}
        setStduent={setStduent}
        fontSize={fontSize}
      />
    }
    {action === "hint" && <HintAction question={question} setAction={setAction} fontSize={fontSize} />}
    {action === "image" && <ImageAction question={question} setAction={setAction} />}
    {action === "student" && <StudentAction question={question} setAction={setAction} student={student} />}
    {action === "result" && <ResultAction question={question} setAction={setAction} student={student} />}
  </Container>);
}

export default OptionBox;