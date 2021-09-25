import { useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { homeworkQuizIdVar } from '../../../apollo';
import useUser from '../../../hooks/useUser';
import Homework from '../ManagemnetStudent/Homework';
import ResultHomework from './ResultHomework';
import SolveHomework from './SolveHomework';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const DelQuizMsg = styled.div`
  justify-self: flex-end;
  color: tomato;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  .delAccount {
    color: tomato;
  }
`

const Title = styled.div`
  align-self: flex-start;
  font-weight: 600;
`

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const StudentHomework = ({ students, id, type, username }) => {
  const user = useUser()
  const history = useHistory()
  const homeworkQuizId = useReactiveVar(homeworkQuizIdVar)
  const [noQuiz, setNoQuiz] = useState(false)
  const [complete, setComplete] = useState(false)
  // complete(false) => 퀴즈가 안띄어짐. complete(true) => 퀴즈가 띄어짐
  // quizId를 받은 후 퀴즈 목록들을 localstorage에 저장 한 후 complete(true)로 변경
  // 숙제를 선택하게 될 때 에러를 방지하기 위해 complete(false)로 바꾸기
  // 에러가 나는 이유는 homeworkScore 와 homeworkQuiz가 충돌하게 된다.
  // homeworkscore는 바로 업데이트 되는데 비해 homeworkQuiz는 데이터를 불러오기 때문에 약간의 시간이 필요하다.
  const resultArr = (JSON.parse(localStorage.getItem("homeworkResult"))
    ?
    JSON.parse(localStorage.getItem("homeworkResult")).filter((item) => item !== null)
    :
    null
  )
  useEffect(() => {
    if (user?.type === "student") {
    }
    if (user?.type === "nomal") {
      history.push(`/profile/${username}/info`)
      return
    }
    if (user?.type === "teacher") {
      const studentUsernameArr = user?.students.map((item) => item.username)
      if (studentUsernameArr.includes(username)) {
        return
      } else {
        history.push(`/profile/${username}/info`)
      }
    }
  }, [])
  return (<Container>
    <Wrapper>
      <Title>숙제 목록</Title>
      <Homework students={students} id={id} type={type} setComplete={setComplete} />
    </Wrapper>
    {homeworkQuizId && <React.Fragment>
      <DivisionLine></DivisionLine>
      {!resultArr ?
        <SolveHomework quizId={homeworkQuizId} setComplete={setComplete} complete={complete} setNoQuiz={setNoQuiz} />
        :
        <ResultHomework quizId={homeworkQuizId} setComplete={setComplete} complete={complete} resultArr={resultArr} setNoQuiz={setNoQuiz} />
      }
    </React.Fragment>
    }
    {noQuiz && <DelQuizMsg>작성자에 의해 삭제된 퀴즈입니다.</DelQuizMsg>}
  </Container>);
}

export default StudentHomework;