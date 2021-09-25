import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';

const SHomeworkInfo = styled.div`
  /* border-top: 1px solid rgb(200, 200, 200, 0.8); */
  animation: ${fadeIn} 0.6s ease;
  grid-column: 1 / -1;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const InfoMsg = styled.div`

`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
`

const Title = styled.div`
  font-weight: 600;
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Student = styled.div`
  margin-right: 10px;
  margin-bottom: 5px;
`

const FinishBtn = styled.div`
  background-color: tomato;
  color: #F4F4F4;
  text-align: center;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
`

const Finish = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
`

const FinishMsg = styled.div`
  color: tomato;
  justify-self: center;
`

const DeleteBtn = styled.div`
  background-color: tomato;
  color: #F4F4F4;
  text-align: center;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
`

const FINSIH_HOMEWORK_MUTATION = gql`
  mutation finishHomework($homeworkId: Int!, $totalScore: Int) {
    finishHomework(homeworkId: $homeworkId, totalScore: $totalScore) {
      ok
    }
  }
`

const DELETE_HOMEWORK_MUTATION = gql`
  mutation deleteHomework($homeworkId: Int!) {
    deleteHomework(homeworkId: $homeworkId) {
      ok
    }
  }
`

const HomeworkInfo = ({ score, student, targetScore, order, homeworkId, finish, teacherId }) => {
  const maxScore = JSON.parse(score).map((item) => item.score).reduce((acc, cur) => acc + cur, 0)
  const curScore = () => {
    const scoreArr = student.map((item) => {
      const quizScore = JSON.parse(item.quizScore).filter((quizScoreItem) => quizScoreItem.teacherId === teacherId).filter((item) => item.order === order)[0]
      if (quizScore) {
        return quizScore.score
      } else {
        return 0
      }
    })
    return scoreArr.reduce((acc, cur) => acc + cur, 0)
  }
  const completeStduent = student.filter((item) => {
    const exist = JSON.parse(item.quizScore).filter((quizScoreItem) => quizScoreItem.teacherId === teacherId).filter((quizScoreItem) => {
      return quizScoreItem.order === order
    })
    return Boolean(exist.length === 1)
  })
  const disCompleteStudnet = student.filter((item) => {
    const exist = JSON.parse(item.quizScore).filter((quizScoreItem) => quizScoreItem.teacherId === teacherId).filter((quizScoreItem) => {
      return quizScoreItem.order === order
    })
    return Boolean(exist.length === 0)
  })
  const onCompleted = (result) => {
    const { finishHomework: { ok } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [finishHomework, { loading }] = useMutation(FINSIH_HOMEWORK_MUTATION, {
    onCompleted
  })
  const onClickFinishBtn = () => {
    if (loading) {
      return
    }
    if (window.confirm("숙제를 종료하시겠습니끼? \n종료하게 되면 미 완료한 학생들은 숙제를 제출 할 수 없습니다.")) {
      finishHomework({
        variables: {
          homeworkId,
          totalScore: curScore()
        }
      })
    }
  }
  const [deleteHomework, { loading: deleteLoading }] = useMutation(DELETE_HOMEWORK_MUTATION, {
    onCompleted: (result) => {
      const { deleteHomework: { ok } } = result
      if (ok) {
        window.location.reload()
      }
    }
  })
  const onClickDeleteBtn = () => {
    if (deleteLoading) {
      return
    }
    if (window.confirm("숙제를 삭제하시겠습니끼? \n삭제하게 되면 학생들은 제출한 숙제 결과(정답&오답)를 볼 수 없습니다.")) {
      deleteHomework({
        variables: {
          homeworkId,
        }
      })
    }
  }
  return (<SHomeworkInfo>
    {!finish &&
      <React.Fragment>
        <InfoMsg>퀴즈에서 얻을 수 있는 최대 점수는 <span style={{ color: "tomato", fontSize: "20px" }}>{maxScore}점</span>입니다.</InfoMsg>
        {targetScore &&
          <React.Fragment>
            <InfoMsg>
              협동 모드의 목표 점수는  <span style={{ color: "tomato", fontSize: "20px" }}>{targetScore}점</span>이며,
            학생들이 획득한 점수는 <span style={{ color: "tomato", fontSize: "20px" }}>{curScore()}점</span>입니다.
          </InfoMsg>
            <InfoMsg>
              숙제를 완료하지 못한 학생들은 추가 점수를 획득 할 수 없습니다.
          </InfoMsg>
          </React.Fragment>
        }
        <Wrapper>
          <Title>완료한 학생</Title>
          <List>{completeStduent.map((item, index) => { return <Student key={index}>{item.nickname}</Student> })}</List>
        </Wrapper>
        <Wrapper>
          <Title>미 완료한 학생</Title>
          <List>{disCompleteStudnet.map((item, index) => { return <Student key={index}>{item.nickname}</Student> })}</List>
        </Wrapper>
      </React.Fragment>}
    {finish ?
      <Finish>
        <FinishMsg>종료된 퀴즈 입니다.</FinishMsg>
        <DeleteBtn onClick={onClickDeleteBtn}>삭제하기</DeleteBtn>
      </Finish>
      :
      <FinishBtn onClick={onClickFinishBtn}>종료하기</FinishBtn>}
  </SHomeworkInfo>);
}

export default HomeworkInfo;