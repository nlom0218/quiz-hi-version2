import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import SaveBtn from '../Profile/Edit/SaveBtn';
import SelectStudents from './SelectStudents';

const Container = styled.div`
  display: grid;
  row-gap: 30px;
`

const SetType = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
`

const TypeWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  align-items: center;
  svg {
    cursor: pointer;
  }
`

const TypeInfo = styled.div`
  justify-self: flex-start;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: ${props => props.selected ? "rgb(255, 165, 0, 0.4)" : props.theme.boxColor};
  transition: background-color 0.6s ease;
`

const TargetScore = styled.div`
  border-top: rgb(200, 200, 200, 0.6) 1px solid;
  line-height: 24px;
  padding-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  .target_score_msg {
    grid-column: 1 / -1;
  }
`

const TargetScoreSet = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }
`

const ScoreInput = styled.input`
  background-color: rgb(200, 200, 200, 0.4);
  padding: 5px 20px;
  border-radius: 5px;
`

const ScoreSubmitBtn = styled.input`
  justify-self: flex-start;
  background-color: rgb(255, 165, 0, 0.4);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: pointer;
`

const SaveMsg = styled.div`
  align-self: center;
  justify-self: center;
  color: tomato;
`

const CallSendQuiz = ({ setStduents, students, type, setType, quizMode, quizList, setTargetScore, targetScore }) => {
  const [saveMsg, setSaveMsg] = useState("목표 점수를 설정하세요.")
  const onClickTypeBtn = (type) => {
    setStduents([])
    setType(type)
  }
  useEffect(() => {
    setSaveMsg("목표 점수를 설정하세요.")
    setValue("targetScore", "")
  }, [quizMode])
  const processTargetScore = () => {
    if (!quizList) {
      return false
    }
    if (students.length === 0) {
      return false
    }
    if (quizMode !== "cooperation") {
      return false
    }
    if (quizList.map((item) => item.score).includes(undefined)) {
      return false
    }
    return true
  }
  const { register, formState: { isValid }, handleSubmit, setValue } = useForm({
    mode: "onChange",
  })
  const onSubmit = (data) => {
    const targetScore = parseInt(data.targetScore)
    const totalScore = quizList.map((item) => item.score).reduce((acc, cur) => acc + cur) * students.length
    if (Math.sign(targetScore) === -1) {
      setSaveMsg("음수를 목표 점수로 설정할 수 없습니다.")
      setTargetScore(undefined)
      return
    }
    if (targetScore > totalScore) {
      setSaveMsg(`${totalScore}점 보다 낮은 점수로 설정하세요.`)
      setTargetScore(undefined)
      return
    }
    setSaveMsg(`목표 점수가 설정 되었습니다.`)
    setTargetScore(targetScore)
  }
  return (<Container>
    <SetType>
      <TypeWrapper>
        <FontAwesomeIcon icon={type === "nomal" ? faCheckCircle : faCircle} onClick={() => onClickTypeBtn("nomal")} />
        <TypeInfo selected={type === "nomal"}>설정없이 퀴즈 진행하기</TypeInfo>
      </TypeWrapper>
      <TypeWrapper>
        <FontAwesomeIcon icon={type === "call" ? faCheckCircle : faCircle} onClick={() => onClickTypeBtn("call")} />
        <TypeInfo selected={type === "call"}>학생들과 함께 퀴즈 진행하기: 학생을 선택하여 퀴즈를 진행합니다.</TypeInfo>
      </TypeWrapper>
      {quizMode !== "goldenBell" && <TypeWrapper>
        <FontAwesomeIcon icon={type === "send" ? faCheckCircle : faCircle} onClick={() => onClickTypeBtn("send")} />
        <TypeInfo selected={type === "send"}>학생들에게 퀴즈 보내기: 학생 계정으로 퀴즈를 보냅니다.</TypeInfo>
      </TypeWrapper>}
    </SetType>
    {type === "call" && <SelectStudents msg="퀴즈에 참여하는 학생을 선택해 주세요." students={students} setStduents={setStduents} />}
    {type === "send" && <SelectStudents msg="퀴즈를 보낼 학생을 선택해 주세요." students={students} setStduents={setStduents} />}
    {processTargetScore() && <TargetScore>
      <div className="target_score_msg" >
        협동 모드에서는 목표 점수 설정이 필요합니다.
        목표 점수는 {quizList.map((item) => item.score).reduce((acc, cur) => acc + cur) * students.length}점을 넘을 수 없습니다.
      </div>
      <TargetScoreSet>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScoreInput
            {...register("targetScore", { required: true })}
            type="number"
          />
          <ScoreSubmitBtn type="submit" value="설정" disabled={!isValid} />
        </form>
      </TargetScoreSet>
      <SaveMsg>{saveMsg}</SaveMsg>
    </TargetScore>}
  </Container>);
}

export default CallSendQuiz;