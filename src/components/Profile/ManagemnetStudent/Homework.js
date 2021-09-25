import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import HomeworkItem from './HomeworkItem';

const Container = styled.div`
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const Msg = styled.div`
  color: tomato;
`

const HomeworkLayout = styled.div`
  display: grid;
`

const HomeworkList = styled.div`
  display: grid;
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 140px 360px 80px 1fr;
  padding: 0px 20px; 
  margin-bottom: 20px;
`

const Date = styled.div``

const Title = styled.div``

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const DeleteAllHomeworkBtn = styled.div`
  margin-top: 20px;
  justify-self: flex-end;
  background-color: tomato;
  padding: 10px 20px;
  border-radius: 5px;
  color: #f4f4f4;
  cursor: pointer;
`

const SEE_HOMEWORK_QUERY = gql`
  query seeHomework($userId: Int!, $type: String!) {
    seeHomework(userId: $userId, type: $type) {
      id
      createdAt
      title
      mode
      order
      quizId
      score
      finish
      targetScore
      teacherId
      user {
        nickname
        quizScore
      }
    }
  }
`

const DELETE_ALL_HOMEWORK_MUTATION = gql`
  mutation deleteAllHomework($teacherId: Int!) {
    deleteAllHomework(teacherId: $teacherId) {
      ok
    }
  }
`

const Homework = ({ id, type, students, setComplete }) => {
  const { data, loading } = useQuery(SEE_HOMEWORK_QUERY, {
    variables: {
      userId: id,
      type
    },
    skip: !type || !id
  })
  const onCompleted = (result) => {
    const { deleteAllHomework: { ok } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [deleteAllHomework, { loading: deleteLoading }] = useMutation(DELETE_ALL_HOMEWORK_MUTATION, {
    onCompleted
  })
  const onClickDeleteAll = () => {
    if (deleteLoading) {
      return
    }
    if (window.confirm("생성된 숙제를 모두 삭제하시겠습니까?\n삭제하게 되면 학생들은 제출한 숙제 결과(정답&오답)를 볼 수 없습니다.")) {
      deleteAllHomework({
        variables: {
          teacherId: parseInt(id)
        }
      })
    }
  }
  return (<Container>
    {loading ? "loading..." : (data?.seeHomework.length === 0 ? <Msg>{type === "teacher" ? "내보낸 숙제가 없습니다." : "숙제가 없습니다."}</Msg> :
      <HomeworkLayout>
        <Wrapper>
          <Date style={{ fontWeight: "600" }}>숙제 시작 일</Date>
          <Title style={{ fontWeight: "600" }}>퀴즈 제목</Title>
          <Title style={{ fontWeight: "600" }}>퀴즈 모드</Title>
          <div style={{ fontWeight: "600", justifySelf: "flex-end" }}>
            {type === "teacher" ? "정보" : "결과"}
          </div>
        </Wrapper>
        <DivisionLine></DivisionLine>
        <HomeworkList>
          {data?.seeHomework.map((item, index) => {
            return <HomeworkItem {...item} key={index} students={students} userType={type} setComplete={setComplete} profileUserId={id} />
          })}
        </HomeworkList>
        {type === "teacher" && <DeleteAllHomeworkBtn onClick={onClickDeleteAll}>전체 삭제</DeleteAllHomeworkBtn>}
      </HomeworkLayout>)
    }
  </Container>);
}

export default Homework;